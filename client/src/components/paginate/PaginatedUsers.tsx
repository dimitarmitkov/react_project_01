import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import UsersCard from '../UsersCard';
import { Col, Row } from 'react-bootstrap';
import { Dropdown } from 'primereact/dropdown';
import './paginate.css';
import '../buttons/DropdownButton.css';

function PaginatedUsers() {

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [selectValues, setSelectValues] = useState(null);
    const [rowsNumber, setRowsNumber] = useState(0);

    const valuesArray2 = ['5', '10', 'All'];




    const getData = async (offset: number, perPage: number) => {
        const res = await axios.post("http://localhost:62000/api/v1/usersPage",
            {
                offsetData: offset,
                limitData: perPage
            }
        );
        const data = res.data;
        const slice = data.rows;
        setRowsNumber(data.count);

        const postData = slice.map((pd: any, pdk: number) => {

            return <div className="ShowUsersList" key={pdk + 101 + 'pdKey'}>
                <UsersCard user={pd} key={pdk + 100 + 'pdKey'} />
            </div>

        })

        setData(postData)
        setPageCount(Math.ceil(data.count / perPage))
    }


    const handlePageClick = (e: any) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
        console.log(selectedPage);
    };

    const onCityChange2 = (e: any) => {
        setSelectValues(e.value);
        const incomingValue = e.value === 'All' ? rowsNumber : parseInt(e.value);
        setPerPage(incomingValue);
    }

    useEffect(() => {
        getData(offset, perPage)
    }, [offset, perPage])

    return (
        <div className="App">
            <Row className='selector' key={"selectorTop1"}>
                <div className="dropdown-demo" key={'paginateDropDown'}>
                    <Dropdown id={'dropDownButton'} value={selectValues} options={valuesArray2} onChange={onCityChange2} placeholder="5" editable />
                </div>
            </Row>
            <Row key={"selectorTop2"}>
                <Col key={"selectorTopCol2"}>
                    <div key={"selectorTopColDiv2"}>
                        {data}
                    </div>

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