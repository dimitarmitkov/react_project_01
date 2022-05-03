import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, DropdownButton, Dropdown, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import './modalTask.css';
import DeleteTaskModalApp from './ModalDeleteTask';
import { Link } from 'react-router-dom';
import MultiSelector from './MultiSelector';
import ErrorComponent from '../error/ErrorComponent';

const ws = new WebSocket('ws://127.0.0.1:8000/ws');

interface Provider {
    type: JSX.Element;
}

interface Props {
    [propName: string]: {}
};

const VerticallyCenteredModal = (props: any) => {
    const [user, setUser] = useState(Object);
    const [showUsers, setShowUsers] = useState<Provider>();
    const [allowedUsers, setAllowedUsers] = useState([]);
    const [hasError, setHasError] = useState(false);

    try {
        CurrentLoggedUser(setUser);
    } catch (error) {
        setHasError(true);
    }

    const projectArray: string[] = ["selected", "progress", "review", "done"];
    const meetingArray: string[] = ["selected", "progress", "done"];
    const currentDate = new Date(Date.now()).toISOString();

    let queryData = {};

    const actionDataObject: Props = {
        initial: { initiatedAt: currentDate, initiatedByUserId: props.data.userId ? props.data.userId : user.id },
        selected: { selectedAt: currentDate, selectedByUserId: props.data.userId ? props.data.userId : user.id },
        progress: { progressAt: currentDate, progressByUserId: props.data.userId ? props.data.userId : user.id },
        review: { reviewAt: currentDate, reviewByUserId: props.data.userId ? props.data.userId : user.id },
        done: { doneAt: currentDate, doneByUserId: props.data.userId ? props.data.userId : user.id }
    };

    const getData = async (checkValue: any) => {

        if (Object.keys(queryData).length > 0) {

            const url = "http://localhost:62000/api/v1/tasks";
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

        const url = "http://localhost:62000/api/v1/usertasks";
        const usersQuery = { idData: props };

        axios.patch(url, usersQuery)
            .then(result => {

                const currentData = result.data;

                const NamesList = () => (
                    <div>
                        <ul>{currentData.map((name: any) =>
                            <li key={name.id}>
                                {user && user.role === 'admin' ? <Link to={`/users/${name.id}`}>{name.firstName} {name.lastName} </Link> :
                                    <div>{name.firstName} {name.lastName} </div>}
                            </li>)}
                        </ul>
                    </div>
                );

                const allowedUsersList = () => (
                    currentData.map((name: any) => name.id)
                );

                setShowUsers(NamesList);
                setAllowedUsers(allowedUsersList);
            })
            .catch(err => setHasError(true));
    }

    const changeTaskStatus = (e: any) => {

        const checkValue = e.target.innerText;
        if (projectArray.includes(checkValue) || meetingArray.includes(checkValue)) {

            queryData = {
                changeData: actionDataObject[checkValue],
                idData: props.data.taskId ? props.data.taskId : props.data.id,
                taskProgress: checkValue
            };

            try {
                getData(checkValue);
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

    let dropdownButtonsArray = props.data.taskType === 'project' ? projectArray.map((element: string, k: number) => {
        return <Dropdown.Item as="button" key={'bbd' + k}>{element}</Dropdown.Item>
    }) :
        meetingArray.map((element: string, k: number) => {
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
                                    <DropdownButton id="dropdown-item-button" title="Select status" variant="secondary" onClick={e => { changeTaskStatus(e) }}>
                                        {dropdownButtonsArray}
                                    </DropdownButton>
                                </Form>
                            </Col>

                            <Col sm="auto" className=" mt-3 delete-button-group">
                                {user && user.role === 'admin' ? <DeleteTaskModalApp {...props.data} /> : null}
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

const ModalApp = (props: any[]) => {
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
