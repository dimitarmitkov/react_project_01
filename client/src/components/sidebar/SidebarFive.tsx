import React from 'react';
import { Container, Row } from 'react-bootstrap';
import useCurrentLoggedUser from '../../hooks/setCurrentLoggedUser';
import WebsocketData from '../ws/websocket';
import { useNavigate } from 'react-router-dom';
import { valuesLinks, valuesUsersTypes } from '../../enumerators';
import './sidebarFive.css';

interface CurrentUserProps {
    id?: number;
    role?: string;
    userName?: string;
}

const SidebarFive = () => {

    const navigate = useNavigate();

    const user: CurrentUserProps = useCurrentLoggedUser()!;

    const clickHandler = (data: string) => {

        navigate(data);
    }

    const TaskUsersElement = () => {
        if (user && user.role === valuesUsersTypes.Admin) {
            return (
                <>
                    <Row className="sidebar-row sidebar-messages sidebar-pointer">

                        <div onClick={() => clickHandler(valuesLinks.Tasks)}><i className="pi pi-folder"></i>&nbsp; Tasks</div>
                    </Row>

                    <Row className="sidebar-row sidebar-messages sidebar-pointer">

                        <div onClick={() => clickHandler(valuesLinks.Users)}><i className="pi pi-users"></i>&nbsp; Users</div>
                    </Row>
                </>
            );
        } else {
            return null;
        }
    }

    return (
        <>
            <Container className="sidebar-container">

                <TaskUsersElement />

                <Row className="sidebar-row sidebar-messages sidebar-pointer">

                    <div onClick={() => clickHandler(valuesLinks.UserTasks)}><i className="pi pi-folder-open"></i>&nbsp; User tasks</div>
                </Row>

                <Row className="sidebar-row sidebar-messages sidebar-pointer">

                    <div onClick={() => clickHandler(valuesLinks.DashBoard)}><i className="pi pi-home"></i>&nbsp; Dashboard</div>
                </Row>

                <Row className="sidebar-row sidebar-messages">

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
