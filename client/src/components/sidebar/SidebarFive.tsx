import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import './sidebarFive.css';
import WebsocketData from '../ws/websocket';
import { useNavigate } from "react-router-dom";
import ErrorComponent from '../error/ErrorComponent';

interface PropsCurrentUser {
    id?: number;
    role?: string;
    userName?: string;
}

const SidebarFive = () => {

    const navigate = useNavigate();

    const user: PropsCurrentUser = CurrentLoggedUser()!;

    const clickHandler = (data: string) => {

        switch (data) {
            case 'tasks': navigate('/tasks');
                break;
            case 'users': navigate('/users');
                break;
            case 'usertasks': navigate('/usertasks');
                break;
            case 'helloMitko': navigate('/helloMitko');
                break;

            default: navigate('/helloMitko');
                break;
        }
    }

    const TaskUsersElement = () => {
        if (user && user.role === 'admin') {
            return (
                <>
                    <Row className='sidebar-row sidebar-messages sidebar-pointer'>

                        <div onClick={() => clickHandler('tasks')}><i className="pi pi-folder"></i>&nbsp; Tasks</div>
                    </Row>

                    <Row className='sidebar-row sidebar-messages sidebar-pointer'>

                        <div onClick={() => clickHandler('users')}><i className="pi pi-users"></i>&nbsp; Users</div>
                    </Row>
                </>
            );
        } else {
            return null;
        }
    }

    return (
        <>
            <Container className='sidebar-container'>

                <TaskUsersElement />

                {/* {user.role && user.role === 'admin' ?
                            
                            : null} */}

                <Row className='sidebar-row sidebar-messages sidebar-pointer'>

                    <div onClick={() => clickHandler('usertasks')}><i className="pi pi-folder-open"></i>&nbsp; User tasks</div>
                </Row>

                <Row className='sidebar-row sidebar-messages sidebar-pointer'>

                    <div onClick={() => clickHandler('helloMitko')}><i className="pi pi-home"></i>&nbsp; Dashboard</div>
                </Row>

                <Row className='sidebar-row sidebar-messages'>

                    <div><i className="pi pi-comments"></i>&nbsp; Messages</div>
                </Row>

                <Row className="websocket-messages">

                    < WebsocketData />
                </Row>

            </Container>
        </>
    );
}

export default SidebarFive;
