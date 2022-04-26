import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './navbarData.css';
import CurrentLoggedUser from '../functions/currentLoggedUser';

const NavbarMenu: React.FunctionComponent = (props: any) => {

    const [user, setUser] = useState(Object);

    CurrentLoggedUser(setUser);


    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">

                <Container>

                    <Navbar.Brand >Tasks Nav-bar</Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="me-auto">
                            {user.role === 'admin' ?
                                <div className='navbar-link-group'>
                                    <Link to={`/tasks`} className="active-task-link"> <Button label="Tasks Link" className="p-button-secondary" /></Link>
                                    <Link to={`/users`} className="active-task-link"> <Button label="Users Link" className="p-button-secondary" /> </Link>
                                </div>
                                : null}
                        </Nav>

                        <Nav className="me-auto right-group">
                            <Link to={user.userName ? `/logout` : `/login`} >{user.userName ? <Button label="LogOut" /> : <Button label="Login" />}</Link>

                            <Nav className='mt-2 logged-user'>
                                {user ? <>{user.userName} {user.role}</> : ''}
                            </Nav>

                            {Object.keys(user).length > 0 ?
                                <Link to={`/currentuser/${user.id}`} className="user-button">
                                    <Button icon="pi pi-user" className="p-button-rounded" disabled={user.userName ? false : true} />
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
