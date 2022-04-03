import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import './user/userCard.css';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditUserApp from './user/EditUser';
import DeleteUserApp from './user/DeleteUser';
import DeleteUserModalApp from './modal/ModalDelete';


const UsersCard = (props: any) => {
    const user = props.user;

    const navigate = useNavigate();
    const editUserRoute = () => {
        let path = `/edituser/${user.id}`;
        navigate(path);
    }
   
    const deleteUserRoute = () => {
        let path = `/edituser/${user.id}`;
        navigate(path);
    }

    const [userLogged, setUserLogged] = useState(Object)


    const url = "http://localhost:62000/api/v1/currentLoggedUser";


    function axiosFunction() {
        axios.get(url, { withCredentials: true })
            .then(response => setUserLogged(response.data))
            .catch(err => {
                console.log('Error from Show List: ', err);
            });
    }

    useEffect(() => {
        axiosFunction()
    }, []);

    return (
        <Container className="card-container" key={user.id + 5 + 'userId'}>
            <Row className="desc mt-3">
                <Col sm={3}>
                    <h2>
                        <Link to={`/users/${user.id}`}>
                            {user.firstName}
                        </Link>
                    </h2>
                    <h5>{user.email}</h5>
                    <span>User role: {user.role}</span>
                    <span>User Id: {user.id}</span>
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                        <EditUserApp {...user} />
                        {userLogged.role === 'admin' ? <DeleteUserModalApp {...user}/> : null}
                </Col>
                <Col sm={2}>
                </Col>
            </Row>
            <Row className="mt-1">
                <hr />

            </Row>
        </Container>
    )
};

export default UsersCard;