import React from 'react';
import { Container, Row, Col, Navbar, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './sidebarFive.css';

export default function SidebarFive() {

    return (
        <>
            <Container className='sidebar-container'>
                <Row className='sidebar-row'>
                    <Col className='sidebar-column'>
                    <Link to={`/tasks`} className="active">Tasks Link</Link>
                    </Col>
                </Row>
                <Row className='sidebar-row'>
                    <Col className='sidebar-column'>
                    <Link to={`/users`} className="active">Users Link</Link>
                    </Col>
                </Row>
                <Row className='sidebar-row'>
                    <Col className='sidebar-column'>
                        <Link to={`/helloMitko`} className="active">Mitko Link</Link>
                    </Col>
                </Row>
                <Row className='sidebar-row'>
                    <Col className='sidebar-column'>
                        <Link to={'/createTask'}>Create Task</Link>
                    </Col>
                </Row>
                <Row>
                <NavDropdown title="Select Action" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/users"><Link to={`/createTask`} className="active-task-link">Tasks Link</Link></NavDropdown.Item>
                                        <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#"><Link to={`/users`} className="active-task-link">Users Link</Link></NavDropdown.Item>
                                    </NavDropdown>
                </Row>
            </Container>
        </>
    )
}


