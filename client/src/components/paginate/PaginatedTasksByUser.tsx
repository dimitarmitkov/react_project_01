import axios from 'axios';
import capitalizeFirstLetter from '../functions/capitalizeFirstLetter';
import { Button } from 'primereact/button';
import { Card, Col, Row } from 'react-bootstrap';
import { Dropdown } from 'primereact/dropdown';
import ReactPaginate from 'react-paginate';
import TasksCard from '../tasks/TasksCard';
import { Checkbox } from 'primereact/checkbox';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DropdownButton.css';
import './paginate.css';
import 'primereact/resources/themes/my-buttons/theme.css';
import ErrorComponent from '../error/ErrorComponent';
import { valuesLinks, valuesPages, valuesProgress, valuesTaskType, valuesUsersTypes } from '../../enumerators';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

let meeting = false;
let project = false;
let selectedPage = 0;
let rowsNumber = 0;

interface Provider {
    type: JSX.Element[];
}

interface FilteredObjectProps {
    taskProgress: string;
};

interface OnValuesChangeProps {
    target: {
        value: React.SetStateAction<null>;
    };
};

interface HandlePageClickParams {
    selected: number;
};

interface PaginateTasksByUserProps {
    data: {
        role: string;
        id: number;
    }
};

interface TaskCardProp {
    taskType: string;
    taskProgress: string;
    id: number;
    taskId: number;
    taskName: string;
    userId: number;
    createdAt: string;
    firstName: string;
}

const PaginatedTasksByUser = (props: PaginateTasksByUserProps) => {

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState<Provider[]>([]);
    const [perPage, setPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [selectValues, setSelectValues] = useState(null);
    const [endValue, setEndValue] = useState(10);
    const [startValue, setStartValue] = useState(0);
    const [checkedProject, setCheckedProject] = useState(false);
    const [checkedMeeting, setCheckedMeeting] = useState(false);
    const [hasError, setHasError] = useState(false);
    const dataId = props.data ? props.data.id : null;
    const isAdmin = props.data && props.data.role === valuesUsersTypes.Admin;

    const navigate = useNavigate();


    const getData = (offset: number, perPage: number) => {

        let url = meeting || project ? SERVER_URL + valuesLinks.UsersTasksMop : SERVER_URL + valuesLinks.UserTasks;

        let callData = meeting || project ?
            {
                offsetData: startValue,
                limitData: endValue,
                userId: dataId,
                whereSelector: project ? valuesTaskType.Project : valuesTaskType.Meeting
            } :
            {
                offsetData: startValue,
                limitData: endValue,
                userId: dataId
            };

        axios.post(url, callData)
            .then(res => {
                
                const slice = res.data.responseData ? res.data.responseData : [];

                rowsNumber = res.data.count ? +(res.data.count)[0].max : 0;

                function tasksFunction(value: string) {
                    return slice.filter(function (obj: FilteredObjectProps) {
                        return obj.taskProgress === value;
                    }).map((task: TaskCardProp, k: number) =>
                        <TasksCard {...task} key={k} />
                    );
                }

                const postData = valuesProgress.map((element: string, elKey: number) =>
                    <Col sm={2} className="padding-0 mt-3" key={element + elKey + 1}>

                        <Card
                            bg={""}
                            key={element + elKey + 2}
                            text={"dark"}
                            style={{ height: "100%" }}
                            className="padding-0"
                        >
                            <Card.Header key={element + elKey + 3}>{capitalizeFirstLetter(element)}</Card.Header>

                            <Card.Body key={element + elKey + 4}>
                                {tasksFunction(element)}
                            </Card.Body>
                        </Card>
                    </Col>
                )
                try {
                    setData(postData);
                    setPageCount(Math.ceil(rowsNumber / perPage));
                } catch (error) {
                    setHasError(true);
                }
            }).catch(error => setHasError(true));
    }

    const handlePageClick = (e: HandlePageClickParams) => {
        selectedPage = e.selected;
        setOffset(1 + selectedPage * perPage);
        setEndValue(perPage + selectedPage * perPage);
        setStartValue(1 + selectedPage * perPage);
    };

    const onValuesChange = (e: OnValuesChangeProps) => {

        const currentEventValue = e.target.value?.toString();

        if (currentEventValue) {
            setSelectValues(e.target.value);
            const incomingValue = currentEventValue === valuesPages[valuesPages.length - 1] ? rowsNumber : parseInt(currentEventValue!);
            setPerPage(incomingValue);
            setEndValue(incomingValue);
        }
    }

    useEffect(() => {
        getData(offset, perPage)
    }, [offset, endValue, dataId, meeting, project]);

    const redirectToCreateTask = () => {
        navigate(valuesLinks.CreateTask);
    }

    const nextElement = <div className="App">

        <Row className="selector" key={"selectorTop1"}>

            <Col sm={2}>

                <div className="field-checkbox-label">
                    <label htmlFor="projectsShow">Show projects</label>
                </div>

                <div className="field-checkbox">
                    <Checkbox inputId="projectsShow" checked={project} onChange={(e) => {
                        project = e.checked;
                        setCheckedProject(e.checked);
                        getData(offset, perPage);
                    }
                    } disabled={checkedMeeting} />
                </div>
            </Col>

            <Col sm={2}>

                <div className="field-checkbox-label">
                    <label htmlFor="meetingsShow">Show meetings</label>
                </div>

                <div className="field-checkbox">
                    <Checkbox inputId="meetingsShow" checked={meeting} onChange={(e) => {
                        meeting = e.checked;
                        setCheckedMeeting(e.checked);
                        getData(offset, perPage);
                    }
                    } disabled={checkedProject} />
                </div>
            </Col>

            <Col sm={4}>
                {isAdmin ?
                    <Button icon="pi pi-plus" label="Create Task" className="p-button-outlined p-button-secondary paginate-p-button" onClick={redirectToCreateTask} />
                    : null}
            </Col>

            <Col sm={4} className="dropdown-demo" key={"paginateDropDown"}>
                <Dropdown id={"dropDownButton"} value={selectValues} options={valuesPages} onChange={onValuesChange} placeholder={valuesPages[valuesPages.length - 1]} editable />
            </Col>
        </Row>

        <Row className="paginated-tasks" key={"selectorTop2"}>
            {data}
        </Row>

        <Row>
            <Col>
                <ReactPaginate
                    key={"reactPaginateKey1"}
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"} />
            </Col>
        </Row>
    </div>

    if (!hasError) {
        return nextElement
    } else {
        return <ErrorComponent />
    }
}

export default PaginatedTasksByUser;
