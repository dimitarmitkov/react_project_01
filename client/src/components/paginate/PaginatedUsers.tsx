import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react'
import UsersCard from '../user/UsersCard';
import { useNavigate } from "react-router-dom";
import './paginate.css';
import './DropdownButton.css';

function PaginatedUsers() {

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [selectValues, setSelectValues] = useState(null);
    const [rowsNumber, setRowsNumber] = useState(0);

    const valuesArray2 = ['5', '10', 'All'];

    const getData = async (offset: number, perPage: number) => {

        const url = "http://localhost:62000/api/v1/usersPage";
        const query = { offsetData: offset, limitData: perPage }
        const res = await axios.post(url, query);
        const data = res.data;
        const slice = data.rows;
        setRowsNumber(data.count);

        const postData = slice.map((pd: any, pdk: number) => {

            return <div id={'user_' + pd.id} className="ShowUsersList" key={pdk + 101 + 'pdKey'}>
                <UsersCard user={pd} key={pdk + 100 + 'pdKey'} />
            </div>

        })

        setData(postData)
        setPageCount(Math.ceil(data.count / perPage))
    }

    const handlePageClick = (e: any) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage)
    };

    const onPageNumbersChange = (e: any) => {
        setSelectValues(e.value);
        const incomingValue = e.value === 'All' ? rowsNumber : parseInt(e.value);
        setPerPage(incomingValue);
    }

    useEffect(() => {
        getData(offset, perPage);
    }, [offset, perPage]);

    const navigate = useNavigate();
    const redirectToCreateUser = () => {
        navigate('/signup');
    }

    return (
        <div className="App">

            <Row className='selector' key={"selectorTop1"}>
                <Col sm={4}></Col>

                <Col sm={4} className="create-user"><Button icon="pi pi-plus" label="Create User" className="p-button-outlined p-button-secondary" onClick={redirectToCreateUser} /></Col>

                <Col sm={4} className="dropdown-demo" key={'paginateDropDown'}>
                    <Dropdown id={'dropDownButton'} value={selectValues} options={valuesArray2} onChange={onPageNumbersChange} placeholder="5" editable />
                </Col>
            </Row>

            <Row className="paginated-users" key={"selectorTop2"}>

                <Col key={"selectorTopCol2"}>
                    
                    {/* <div key={"selectorTopColDiv2"}> */}
                        {data}
                    {/* </div> */}

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
    );
}

export default PaginatedUsers;
