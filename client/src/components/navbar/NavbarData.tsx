import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LoggedUser from '../user/LoggedUser';
import './navbarData.css'


const NavbarMenu: React.FunctionComponent = () => {
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

                                    {/* <Nav.Link href="/users">Users</Nav.Link> */}
                                    {/* <Nav.Link href="/tasks">Tasks</Nav.Link> */}
                                    <NavDropdown title="Select Action" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="#">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>

                                <Nav>
                                    <Nav.Link href="#">More deets</Nav.Link>
                                    <Nav.Link eventKey={2} href="#">
                                        Dank memes
                                    </Nav.Link>
                                    <LoggedUser />

                                </Nav>
                            </Navbar.Collapse>


                </Container>
            </Navbar>
        </>
    )
}
export default NavbarMenu;
