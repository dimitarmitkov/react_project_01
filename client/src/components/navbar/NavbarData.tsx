import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbarData.css';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { useNavigate } from "react-router-dom";
import UserCard from '../user/UserCardData';


const NavbarMenu: React.FunctionComponent = (props: any) => {

    const [user, setUser] = useState(Object);

    CurrentLoggedUser(setUser);


    return (
        <>

            {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"> */}
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>

                    <Navbar.Brand href="#home">Tasks Nav-bar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="me-auto">

                            <Link to={`/tasks`} className="active-task-link">Tasks Link</Link>
                            <Link to={`/users`} className="active-task-link">Users Link</Link>

                            <NavDropdown title="Select Action" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/users"><Link to={`/createTask`} className="active-task-link">Tasks Link</Link></NavDropdown.Item>
                                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#"><Link to={`/users`} className="active-task-link">Users Link</Link></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Nav>
                            <Link to={user.userName ? `/logout` : `/login`} className="button active-task-link">{user.userName ? 'LogOut' : 'Login'}</Link>
                            <Nav.Link href="#">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#">
                                {user ? user.userName : ''}
                            </Nav.Link>
                            {Object.keys(user).length>0 ?
                                <Link to={`/helloMitko`}>
                                <Button icon="pi pi-user" className="p-button-rounded p-button-info" disabled={user.userName ? false : true} />
                                </Link>
                                : null}


                        </Nav>
                    </Navbar.Collapse>


                </Container>
            </Navbar>
        </>
    )
}
export default NavbarMenu;
