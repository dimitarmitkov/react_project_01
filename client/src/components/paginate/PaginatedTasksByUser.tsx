import axios from 'axios';
import capitalizeFirstLetter from '../functions/capitalizeFirstLetter';
import { Button } from 'primereact/button';
import { Card, Col, Row } from 'react-bootstrap';
import { Dropdown } from 'primereact/dropdown';
import { JsxElement } from 'typescript';
import ReactPaginate from 'react-paginate';
import TasksCard from '../tasks/TasksCard';
import { Checkbox } from 'primereact/checkbox';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './DropdownButton.css';
import './paginate.css';
import 'primereact/resources/themes/my-buttons/theme.css';
import ErrorComponent from '../error/ErrorComponent';

let meeting = false;
let project = false;
let selectedPage = 0;
let rowsNumber = 0;

const PaginatedTasksByUser = (props: any) => {

    interface Provider {
        type: JSX.Element[];
    }

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

    const valuesArray = ['2', '5', '7', 'All'];
    const progressArray: string[] = ["initial", "selected", "progress", "review", "done"];
    const navigate = useNavigate();


    const getData = (offset: number, perPage: number) => {

        let url = meeting || project ? "http://localhost:62000/api/v1/usertasksmop" :
            "http://localhost:62000/api/v1/usertasks";

        let callData = meeting || project ?
            {
                offsetData: startValue,
                limitData: endValue,
                userId: props.data.id,
                whereSelector: project ? "project" : "meeting"
            } :
            {
                offsetData: startValue,
                limitData: endValue,
                userId: props.data.id
            };

        axios.post(url, callData)
            .then(res => {

                const slice = res.data.responseData ? res.data.responseData : [];

                rowsNumber = res.data.count ? +(res.data.count)[0].max : 0;

                function tasksFunction(value: string) {
                    return slice.filter(function (obj: any) {
                        return obj.taskProgress === value;
                    }).map((task: JsxElement, k: number) =>
                        <TasksCard task={task} key={k} />
                    );
                }

                const postData = progressArray.map((element: string, elKey: number) =>
                    <Col sm={2} className="padding-0 mt-3" key={element + elKey + 1}>

                        <Card
                            bg={''}
                            key={element + elKey + 2}
                            text={'dark'}
                            style={{ height: '100%' }}
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
            }).catch(error=> setHasError(true));
    }

    const handlePageClick = (e: any) => {
        selectedPage = e.selected;
        setOffset(1 + selectedPage * perPage);
        setEndValue(perPage + selectedPage * perPage);
        setStartValue(1 + selectedPage * perPage);
    };

    const onValuesChange = (e: any) => {
        setSelectValues(e.value);
        const incomingValue = e.value === 'All' ? rowsNumber : parseInt(e.value);
        setPerPage(incomingValue);
        setEndValue(incomingValue);
    }

    useEffect(() => {
        getData(offset, perPage)
    }, [offset, endValue, props.data.id, meeting, project]);

    const redirectToCreateTask = () => {
        navigate('/createTask');
    }

    const nextElement = <div className="App">

        <Row className='selector' key={"selectorTop1"}>

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
                {props.data.role === 'admin' ?
                    <Button icon="pi pi-plus" label="Create Task" className="p-button-outlined p-button-secondary paginate-p-button" onClick={redirectToCreateTask} />
                    : null}
            </Col>

            <Col sm={4} className="dropdown-demo" key={'paginateDropDown'}>
                <Dropdown id={'dropDownButton'} value={selectValues} options={valuesArray} onChange={onValuesChange} placeholder="All" editable />
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
