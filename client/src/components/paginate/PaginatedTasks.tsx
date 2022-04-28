import axios from 'axios';
import capitalizeFirstLetter from '../functions/capitalizeFirstLetter';
import { Button } from 'primereact/button';
import { Card, Col, Row } from 'react-bootstrap';
import { Dropdown } from 'primereact/dropdown';
import { JsxElement } from 'typescript';
import ReactPaginate from 'react-paginate';
import { Checkbox } from 'primereact/checkbox';
import TasksCard from '../tasks/TasksCard';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './DropdownButton.css';
import './paginate.css';
import 'primereact/resources/themes/my-buttons/theme.css';

let meeting = false;
let project = false;
let selectedPage = 0;
let rowsNumber = 0;

const PaginatedTasks = () => {

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

    const valuesArray = ['2', '5', '7', 'All'];
    const progressArray: string[] = ["initial", "selected", "progress", "review", "done"];

    const getData = async (offset: number, perPage: number) => {

        const url = "http://localhost:62000/api/v1/tasksPage";
        const selectedQuery = {
            offsetData: startValue,
            limitData: endValue,
            whereSelector: project ? "project" : "meeting"
        };

        const commonQuery = {
            offsetData: startValue,
            limitData: endValue
        };

        let res = meeting || project ? 
        await axios.patch(url, selectedQuery) 
        : await axios.post(url, commonQuery);
       
        const slice = res.data.responseData;

        rowsNumber = +(res.data.count)[0].max;
        
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

        setData(postData);
        setPageCount(Math.ceil(rowsNumber / perPage));
    }

    const handlePageClick = (e: any) => {
        selectedPage = e.selected;
        setOffset(1 + selectedPage*perPage);
        setEndValue(perPage+selectedPage*perPage);
        setStartValue(1 + selectedPage*perPage);
    };

    const onValuesChange = (e: any) => {
        setSelectValues(e.value);
        const incomingValue = e.value === 'All' ? rowsNumber : parseInt(e.value);
        setPerPage(incomingValue);
        setEndValue(incomingValue);
    }

    useEffect(() => {
        getData(offset, perPage);
    }, [offset, endValue, meeting, project, rowsNumber]);

    const navigate = useNavigate();
    const redirectToCreateTask = () =>{
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
                } disabled={checkedMeeting}/>
                </div>
            </Col>

            <Col sm={2}>

                <div className="field-checkbox-label">
                    <label htmlFor="meetingsShow">Show meetings</label>
                </div>

                <div className="field-checkbox">
                    <Checkbox inputId="meetingsShow" checked={meeting} onChange={(e) =>{ 
                        meeting = e.checked;
                        setCheckedMeeting(e.checked);
                        getData(offset, perPage);
                        }
                        } disabled={checkedProject}/>
                </div>
            </Col>

            <Col sm={4}>

            <Button icon="pi pi-plus" label="Create Task" className="p-button-outlined p-button-secondary paginate-p-button" onClick={redirectToCreateTask}/>
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

    return nextElement
}

export default PaginatedTasks;
