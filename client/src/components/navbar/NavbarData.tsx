import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import './navbarData.css';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee, faBarcode } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faCoffee, faBarcode)

const NavbarMenu: React.FunctionComponent = (props: any) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(Object);

    CurrentLoggedUser(setUser);
    
    // @change-request make enum/const with all routes
    const clickHandler = (data: string) => {
        data === 'tasks' ? navigate('/tasks') : navigate(`/users`);
        switch (data) {
            case 'tasks': navigate('/tasks');
                break;
            case 'users': navigate('/users');
                break;
            case 'login': navigate('/login');
                break;
            case 'logout': navigate('/logout');
                break;
            case 'currentuser': navigate(`/currentuser/${user.id}`);
                break;

            default: navigate('/helloMitko');
                break;
        }
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">

                <Container fluid>
                    <Col sm={2}>
                        <Navbar.Brand ><FontAwesomeIcon icon={["fas", "barcode"]} /> Tasks nav-bar</Navbar.Brand>
                    </Col>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Col sm={12}>

                            <Row>

                                <Col sm={6} >
                                    {user.role === 'admin' ?
                                        <Row >
                                            <Col sm="auto" className='navbar-link-group'>
                                                <Button label="Tasks Link" className="p-button-secondary" onClick={() => clickHandler('tasks')} />
                                            </Col>

                                            <Col sm="auto" className='navbar-link-group'>
                                                <Button label="Users Link" className="p-button-secondary" onClick={() => clickHandler('users')} />
                                            </Col>
                                        </Row>
                                        : null}
                                </Col>

                                <Col sm={3} className="parent-logged-user">
                                    <Col sm={6} className="logged-user">
                                        {user.userName ? <div>{user.userName},&nbsp;&nbsp;{user.role}</div> : ''}
                                    </Col>
                                </Col>

                                <Col sm={3}>
                                    <Row className='navbar-link-group'>
                                        <Col sm="auto">
                                            {user.userName ? <Button label="LogOut" onClick={() => clickHandler('logout')} /> : <Button label="Login" onClick={() => clickHandler('login')} />}
                                        </Col>

                                        <Col sm="auto" className='navbar-link-group'>
                                            {Object.keys(user).length > 0 ?
                                                <Button icon="pi pi-user" className="p-button-rounded" disabled={user.userName ? false : true} onClick={() => clickHandler('currentuser')} />
                                                : null}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarMenu;
