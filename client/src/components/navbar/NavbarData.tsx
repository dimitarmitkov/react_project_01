import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Container} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
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
                                <>
                                    <Link to={`/tasks`} className="active-task-link">Tasks Link</Link>
                                    <Link to={`/users`} className="active-task-link">Users Link</Link>
                                </>
                                : null}
                        </Nav>

                        <Nav>
                            <Link to={user.userName ? `/logout` : `/login`} className="button active-task-link">{user.userName ? 'LogOut' : 'Login'}</Link>

                            <Nav className='mt-2'>
                                {user ? <>{user.userName} {user.role}</> : ''}
                            </Nav>

                            {Object.keys(user).length > 0 ?
                                <Link to={`/currentuser/${user.id}`} className="ml-3">
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
