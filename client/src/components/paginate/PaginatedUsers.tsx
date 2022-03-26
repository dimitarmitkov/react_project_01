import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './paginate.css';
import UsersCard from '../UsersCard';
import { Card, Col, Row } from 'react-bootstrap';
import DropDownSelector from '../buttons/DrpoDownSelector';
import { Dropdown } from 'primereact/dropdown';
import '../buttons/DropdownButton.css';

function App() {

    const [lazyItems, setLazyItems] = useState([]);
    const [selectedCity2, setSelectedCity2] = useState(null);
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(1);
    const [pageCount, setPageCount] = useState(0)


    const valuesArray = [{ name: '5' }, { name: '10' }, { name: 'All' }];

    const onCityChange2 = (e: any) => {
        setSelectedCity2(e.value);
        setPerPage(parseInt(e.value.name))
        

    }
    // let parsedData = selectedCity2 ? parseInt(selectedCity2.name): 0;

    // const [offset, setOffset] = useState(0);
    // const [data, setData] = useState([]);
    // const [perPage] = useState(parsedData || 5);
    // const [pageCount, setPageCount] = useState(0)

    

    useEffect(() => {
        setLazyItems([]);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    
    


    const getData = async () => {
        const res = await axios.get("http://localhost:62000/api/v1/users")
        const data = res.data;

        const slice = data.slice(offset, offset + perPage);
        const postData = slice.map((pd: any, pdk: number) => {

            return <div className="ShowUsersList">
                <UsersCard user={pd} key={pdk + 100 + 'pdKey'} />
            </div>

        })


        setData(postData)
        setPageCount(Math.ceil(data.length / perPage))



    }
    const handlePageClick = (e: any) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
        console.log(selectedPage);

    };

    useEffect(() => {
        getData()
    }, [offset])

    return (
        <div className="App">
            <Row className='selector' key={"selectorTop1"}>
                <Col key={"selectorTopCol1"}>
                    <div className="dropdown-demo" key={'paginateDropDown'}>
                        <Dropdown id={'dropDownButton'} value={selectedCity2} options={valuesArray} onChange={onCityChange2} optionLabel="name" placeholder="Numbers per page" editable />
                    </div>
                </Col>
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
                        // subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </Col>

            </Row>
        </div>
    );
}

export default App;