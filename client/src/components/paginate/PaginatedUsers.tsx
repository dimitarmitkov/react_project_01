import { Col, Row } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { valuesLinks, valuesPages } from '../../enumerators';
import axios from 'axios';
import ErrorComponent from '../error/ErrorComponent';
import ReactPaginate from 'react-paginate';
import UsersCard from '../user/UsersCard';
import './DropdownButton.css';
import './paginate.css';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

interface PostDataProps {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    picture: string;
    id: number;
};

interface OnPageNumbersChangeProps {
    target: {
        value: React.SetStateAction<null>;
    };
};

interface HandlePageClickProps {
    selected: number;
};

function PaginatedUsers() {

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [selectValues, setSelectValues] = useState(null);
    const [rowsNumber, setRowsNumber] = useState(0);
    const [hasError, setHasError] = useState(false);

    const getData = async (offset: number, perPage: number) => {

        const url = SERVER_URL + valuesLinks.UsersPage;
        const query = { offsetData: offset, limitData: perPage }
        const res = await axios.post(url, query);
        const data = res.data;
        const slice = data.rows;
        setRowsNumber(data.count);

        const postData = slice.map((pd: PostDataProps, pdk: number) => {

            return <div id={'user_' + pd.id} className="ShowUsersList" key={pdk + 101 + 'pdKey'}>
                <UsersCard user={pd} key={pdk + 100 + 'pdKey'} />
            </div>

        })
        try {
            setData(postData);
            setPageCount(Math.ceil(data.count / perPage))
        } catch (error) {
            setHasError(true);
        }
    }

    const handlePageClick = (e: HandlePageClickProps) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage)
    };

    const onPageNumbersChange = (e: OnPageNumbersChangeProps) => {

        const currentEventValue = e.target.value?.toString();

        if (currentEventValue) {
            setSelectValues(e.target.value);
            const incomingValue = currentEventValue === valuesPages[valuesPages.length - 1] ? rowsNumber : parseInt(currentEventValue);
            setPerPage(incomingValue);
        }
    }

    useEffect(() => {
        getData(offset, perPage);
    }, [offset, perPage]);

    const navigate = useNavigate();
    const redirectToCreateUser = () => {
        navigate(valuesLinks.SignUp);
    }

    if (!hasError) {

        return (
            <div className="App">

                <Row className='selector' key={"selectorTop1"}>
                    <Col sm={4}></Col>

                    <Col sm={4} className="create-user"><Button icon="pi pi-plus" label="Create User" className="p-button-outlined p-button-secondary paginate-p-button" onClick={redirectToCreateUser} /></Col>

                    <Col sm={4} className="dropdown-demo" key={'paginateDropDown'}>
                        <Dropdown id={'dropDownButton'} value={selectValues} options={valuesPages} onChange={onPageNumbersChange} placeholder="5" editable />
                    </Col>
                </Row>

                <Row className="paginated-users" key={"selectorTop2"}>

                    <Col key={"selectorTopCol2"}>

                        {data}

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
    } else {
        return <ErrorComponent />
    }
}

export default PaginatedUsers;
