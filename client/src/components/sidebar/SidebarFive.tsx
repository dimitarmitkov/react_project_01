import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
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
                        {/* <Link hrefLang='/tasks' to={'/tasks'}>Tasks</Link> */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}


