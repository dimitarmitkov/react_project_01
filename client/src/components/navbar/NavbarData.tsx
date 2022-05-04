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

library.add(faCheckSquare, faCoffee, faBarcode);

interface PropsCurrentUser {
    id?: number;
    role?: string;
    userName?: string;
}

const NavbarMenu: React.FunctionComponent = (props: any) => {

    const navigate = useNavigate();

    const user: PropsCurrentUser = CurrentLoggedUser()!;

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


    const TaskUsersElement = () => {

        if (user && user.role === 'admin') {
            return (
                <Row >
                    <Col sm="auto" className='navbar-link-group'>
                        <Button label="Tasks Link" className="p-button-secondary" onClick={() => clickHandler('tasks')} />
                    </Col>

                    <Col sm="auto" className='navbar-link-group'>
                        <Button label="Users Link" className="p-button-secondary" onClick={() => clickHandler('users')} />
                    </Col>
                </Row>
            )
        } else {
            return (null)
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
                                    < TaskUsersElement />
                                </Col>

                                <Col sm={3} className="parent-logged-user">
                                    <Col sm={6} className="logged-user">
                                        {user ? <div>{user.userName},&nbsp;&nbsp;{user.role}</div> : ''}
                                    </Col>
                                </Col>

                                <Col sm={3}>
                                    <Row className='navbar-link-group'>
                                        <Col sm="auto">
                                            {user ? <Button label="LogOut" onClick={() => clickHandler('logout')} /> : <Button label="Login" onClick={() => clickHandler('login')} />}
                                        </Col>

                                        <Col sm="auto" className='navbar-link-group'>
                                            {user ?
                                                <Button icon="pi pi-user" className="p-button-rounded" disabled={user ? false : true} onClick={() => clickHandler('currentuser')} />
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
