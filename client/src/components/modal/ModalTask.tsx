import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, DropdownButton, Dropdown, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import useCurrentLoggedUser from '../functions/currentLoggedUser';
import './modalTask.css';
import DeleteTaskModalApp from './ModalDeleteTask';
import { Link } from 'react-router-dom';
import MultiSelector from './MultiSelector';
import ErrorComponent from '../error/ErrorComponent';
import configData from '../../config.json';
import { valuesProjectProgress, valuesMeetingProgress, valuesLinks, valuesTaskType, valuesUsersTypes } from '../../enumerators';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ws = new WebSocket(configData.WEBSOCKET_URL);

interface ShowUsersProps {
    type: JSX.Element;
};

interface ActionDataObjProps {
    [propName: string]: {}
};

interface CurrentUserProps {
    id?: number;
    role?: string;
    userName?: string;
};

interface VerticallyCenteredModalProps {
    data: {
        userId: number;
        taskId: number;
        id: number;
        taskType: string;
        taskName: string;
        taskProgress: string;
        createdAt: string;
        firstName: string;
    };

    onHide: () => void;
    show: boolean;
};

interface NameOfNameListProps {
    id: number;
    firstName: string;
    lastName: string;
};

interface UserOfAllowedUsersListProps {
    id: number;
};

interface ModalAppProps {
    userId: number;
    taskId: number;
    id: number;
    taskType: string;
    taskName: string;
    taskProgress: string;
    createdAt: string;
    firstName: string;
};

const VerticallyCenteredModal = (props: VerticallyCenteredModalProps) => {
    const [showUsers, setShowUsers] = useState<ShowUsersProps>();
    const [allowedUsers, setAllowedUsers] = useState([]);
    const [hasError, setHasError] = useState(false);

    const user: CurrentUserProps = useCurrentLoggedUser()!;
    const currentDate = new Date(Date.now()).toISOString();

    let queryData = {};

    const actionDataObject: ActionDataObjProps = user ? {
        initial: { initiatedAt: currentDate, initiatedByUserId: props.data.userId ? props.data.userId : user.id },
        selected: { selectedAt: currentDate, selectedByUserId: props.data.userId ? props.data.userId : user.id },
        progress: { progressAt: currentDate, progressByUserId: props.data.userId ? props.data.userId : user.id },
        review: { reviewAt: currentDate, reviewByUserId: props.data.userId ? props.data.userId : user.id },
        done: { doneAt: currentDate, doneByUserId: props.data.userId ? props.data.userId : user.id }
    } : {};

    const getData = async (checkValue: string) => {

        if (Object.keys(queryData).length > 0) {

            const url = SERVER_URL + valuesLinks.Tasks;
            const userGeneratedProcess = { userGeneratorName: user.userName, userGeneratorId: user.id, userGeneratorRole: user.role };
            const wsText = JSON.stringify({ main: props.data, action: checkValue, allowedList: allowedUsers, generator: userGeneratedProcess });

            const result = await axios.post(url, queryData);

            if (result.status === 200) {
                ws.send(wsText);
            } else {
                setHasError(true);
            }
        }
    };

    const getUsers = (props: number) => {

        const url = SERVER_URL + valuesLinks.UserTasks;
        const usersQuery = { idData: props };

        axios.patch(url, usersQuery)
            .then(result => {

                const currentData = result.data;

                const NamesList = () => (
                    <div>
                        <ul>{currentData.map((name: NameOfNameListProps) =>
                            <li key={name.id}>
                                {user && user.role === valuesUsersTypes.Admin ? <Link to={`${valuesLinks.Users}/${name.id}`}>{name.firstName} {name.lastName} </Link> :
                                    <div>{name.firstName} {name.lastName} </div>}
                            </li>)}
                        </ul>
                    </div>
                );

                setShowUsers(NamesList);
                setAllowedUsers(currentData.map((user: UserOfAllowedUsersListProps) => user.id));
            })
            .catch(err => setHasError(true));
    }

    const changeTaskStatus = (e: React.MouseEvent) => {

        const checkValue = e.target as HTMLElement;;
        if (checkValue && (valuesProjectProgress.includes(checkValue.innerText) || valuesMeetingProgress.includes(checkValue.innerText))) {

            queryData = {
                changeData: actionDataObject[checkValue.innerText],
                idData: props.data.taskId ? props.data.taskId : props.data.id,
                taskProgress: checkValue
            };

            try {
                getData(checkValue.innerText);
            } catch (error) {
                setHasError(true);
            }
        }
    };

    const showRelatedUsers = (props: number) => {

        try {
            getUsers(props);
        } catch (error) {
            setHasError(true);
        }

        return showUsers;
    }

    const dropdownButtonsArray = props.data.taskType === valuesTaskType.Project ? valuesProjectProgress.map((element: string, k: number) => {
        return <Dropdown.Item as="button" key={'bbd' + k}>{element}</Dropdown.Item>
    }) :
        valuesMeetingProgress.map((element: string, k: number) => {
            return <Dropdown.Item as="button" key={'bbd' + k}>{element}</Dropdown.Item>
        });

    if (!hasError) {

        return (
            <Modal
                id="myModalId"
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onShow={() => showRelatedUsers(props.data.taskId ? props.data.taskId : props.data.id)}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.data.taskName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{props.data.taskProgress}</h4>
                    <p>
                        {props.data.taskType}
                    </p>
                    <div>
                        <p>Users related to this {props.data.taskType}:</p>
                        {showUsers}
                    </div>

                    <Container>
                        <Row>
                            <Col sm={9} className="mt-3">
                                <Form>
                                    <DropdownButton id="dropdown-item-button" title="Select status" variant="secondary" onClick={(e: React.MouseEvent) => { changeTaskStatus(e) }}>
                                        {dropdownButtonsArray}
                                    </DropdownButton>
                                </Form>
                            </Col>

                            <Col sm="auto" className=" mt-3 delete-button-group">
                                {user && user.role === valuesUsersTypes.Admin ? <DeleteTaskModalApp {...props.data} /> : null}
                            </Col>

                        </Row>
                        <MultiSelector {...props.data} />
                    </Container>
                </Modal.Body>

                <Modal.Footer>
                    <Container fluid>
                        <Row className="mb-3">
                            <Col sm={9} className="close-button-group">

                            </Col>
                            <Col sm="auto" className="close-button-group">
                                <Button onClick={props.onHide}>Close</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal >
        );
    } else {
        return <ErrorComponent />
    }
}

const ModalApp = (props: ModalAppProps) => {
    const [modalShow, setModalShow] = useState(false);


    return (
        <Row>
            <Col className="edit-task-button">
                <Button variant="danger" onClick={() => setModalShow(prevCheck => !prevCheck)}>
                    Edit task
                </Button>

                <VerticallyCenteredModal
                    show={modalShow}
                    onHide={() => { setModalShow(prevCheck => !prevCheck) }}
                    data={props}
                />
            </Col>
        </Row>
    );
}

export default ModalApp;
