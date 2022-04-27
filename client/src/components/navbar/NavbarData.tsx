import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import './navbarData.css';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { useNavigate } from "react-router-dom";

const NavbarMenu: React.FunctionComponent = (props: any) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(Object);

    CurrentLoggedUser(setUser);

    const clickHandler = (data: string) => {
        data === 'tasks' ? navigate('/tasks') : navigate(`/users`);
    }



    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">

                <Container fluid>

                    <Navbar.Brand >Current logged: {user.userName ? user.userName : ''}</Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="me-auto">
                        {user.role === 'admin' ?
                            <Row className='mb-3 navbar-link-group'>
                                <Col sm="auto" className="active-task-link"> <Button label="Tasks Link" className="p-button-secondary" onClick={() => clickHandler('tasks')} /></Col>
                                <Col sm="auto" className="active-task-link"> <Button label="Users Link" className="p-button-secondary" onClick={() => clickHandler('users')} /></Col>
                            </Row>
                            : null}
                    </Nav>

                    {/* <Nav className="me-auto right-group"> */}
                    <Nav className="right-group">
                        <Row>
                            <Col sm="auto" className="right-group-buttons mt-2">
                            <Link to={user.userName ? `/logout` : `/login`} >{user.userName ? <Button label="LogOut" /> : <Button label="Login" />}</Link>
                            </Col>
                            {/* <Col sm="auto" className="right-group-buttons mt-2">
                            <Nav className='mt-2 logged-user'>
                                {user.userName ? <>{user.userName} {user.role}</> : ''}
                            </Nav>
                            </Col> */}
                            <Col sm="auto" className="mt-2">
                            {Object.keys(user).length > 0 ?
                                <Link to={`/currentuser/${user.id}`} className="user-button">
                                    <Button icon="pi pi-user" className="p-button-rounded" disabled={user.userName ? false : true} />
                                </Link>
                                : null}
                            </Col>


                        </Row>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarMenu;
