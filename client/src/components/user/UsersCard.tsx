import { Link } from 'react-router-dom';
import './userCard.css';
import { Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import EditUserApp from './EditUser';
import DeleteUserModalApp from '../modal/ModalDeleteUser';
import CurrentLoggedUser from '../functions/currentLoggedUser';


const UsersCard = (props: any) => {
    const user = props.user;
    const [userLogged, setUserLogged] = useState(Object);

    CurrentLoggedUser(setUserLogged);

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
                    <span id="userRole">User role: <span className="user-role-id">{user.role}</span></span>
                    <span id="userId">User Id: <span className="user-role-id">{user.id}</span></span>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
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
