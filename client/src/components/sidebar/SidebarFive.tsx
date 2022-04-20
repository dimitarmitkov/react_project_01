import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { Link } from 'react-router-dom';
import './sidebarFive.css';
import WebsocketData from '../ws/websocket';

const SidebarFive = () => {

    const [user, setUser] = useState(Object);

    CurrentLoggedUser(setUser);

    return (
        <>
            <Container className='sidebar-container'>
                {user.role === 'admin' ?
                    <>
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
                    </>
                    : null}

                <Row className='sidebar-row'>
                    
                    <Col className='sidebar-column'>
                        <Link to={`/usertasks`} className="active">User Tasks</Link>
                    </Col>
                </Row>

                <Row className='sidebar-row'>

                    <Col className='sidebar-column'>
                        <Link to={`/helloMitko`} className="active">Mitko Link</Link>
                    </Col>
                </Row>

                <Row className='sidebar-row'>

                    <Col className='sidebar-column'>
                        <Link to={`/websocket`} className="active">Websocket Link</Link>
                    </Col>
                </Row>

                <Row className='sidebar-row'>

                    <Col className='sidebar-column'>
                        < WebsocketData />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SidebarFive;
