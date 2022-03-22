import React from 'react';
import { Button } from 'primereact/button';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import LoggedUser from '../user/LoggedUser';


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
                            <Nav.Link href="/users">Users</Nav.Link>
                            <Nav.Link href="/tasks">Tasks</Nav.Link>
                            <NavDropdown title="Select Action" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </Nav.Link>
                            <LoggedUser/>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavbarMenu;
