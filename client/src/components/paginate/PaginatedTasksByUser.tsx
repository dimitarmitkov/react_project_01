import axios from 'axios';
import capitalizeFirstLetter from '../functions/capitalizeFirstLetter';
import { Button } from 'primereact/button';
import { Card, Col, Row } from 'react-bootstrap';
import { Dropdown } from 'primereact/dropdown';
import { JsxElement } from 'typescript';
import ReactPaginate from 'react-paginate';
import TasksCard from '../TasksCard';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../buttons/DropdownButton.css';
import './paginate.css';

function PaginatedTasksByUser(props: any) {

    interface Provider {
        type: JSX.Element[];
    }

    let [offset, setOffset] = useState(0);
    const [data, setData] = useState<Provider[]>([]);
    const [perPage, setPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [selectValues, setSelectValues] = useState(null);
    let [rowsNumber, setRowsNumber] = useState(0);
    let [endValue, setEndValue] = useState(10);
    let [startValue, setStartValue] = useState(0);
    
    const valuesArray = ['2', '5', '7', 'All'];
    const progressArray: string[] = ["initial", "selected", "progress", "review", "done"];
    const navigate = useNavigate();
    
    const getData = (offset: number, perPage: number) => {

            if (!props.data.id) {
                navigate("/helloMitko");
            }

            axios.post("http://localhost:62000/api/v1/usertasks",
                {
                    offsetData: startValue,
                    limitData: endValue,
                    userId: props.data.id
                }
            ).then(res=>{

            const data = res.data;
            const slice = res.data;

            data.forEach((d: any) => {

                if (d.r > rowsNumber) {
                    setRowsNumber(rowsNumber = d.r);
                }
            })

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
        }).catch();
        }

        const handlePageClick = (e: any) => {
            const selectedPage = e.selected;
            setOffset(offset = (1 + selectedPage * perPage));
            setEndValue(endValue = (perPage + selectedPage * perPage));
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
        }, [offset, endValue]);

        const redirectToCreateTask = () => {
            navigate('/createTask');
        }

        return <div className="App">
            <Row className='selector' key={"selectorTop1"}>
                <Col>
                    <Button icon="pi pi-plus" label="Create Task" className="p-button-outlined p-button-secondary" onClick={redirectToCreateTask} />
                </Col>
                <Col className="dropdown-demo" key={'paginateDropDown'}>
                    <Dropdown id={'dropDownButton'} value={selectValues} options={valuesArray} onChange={onValuesChange} placeholder="All" editable />
                </Col>
            </Row>
            <Row key={"selectorTop2"}>
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
}

export default PaginatedTasksByUser;
