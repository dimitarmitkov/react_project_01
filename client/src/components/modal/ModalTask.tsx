import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, DropdownButton, Dropdown, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import './modalTask.css';
import DeleteTaskModalApp from './ModalDeleteTask';
import { Link } from 'react-router-dom';


interface Provider {
    type: JSX.Element;
}
const MyVerticallyCenteredModal = (props: any) => {
    const [user, setUser] = useState(Object);
    const [showUsers, setShowUsers] = useState<Provider>();

    CurrentLoggedUser(setUser);

    interface MyObj {
        [propName: string]: {}
    };

    const projectArray: string[] = ["initial", "selected", "progress", "review", "done"];
    const meetingArray: string[] = ["initial", "selected", "progress", "done"];
    const currentDate = new Date(Date.now()).toISOString();

    let queryData = {};

    const actionDataObject: MyObj = {
        initial: { initiatedAt: currentDate, initiatedByUserId: props.data.userId ? props.data.userId : user.id },
        selected: { selectedAt: currentDate, selectedByUserId: props.data.userId ? props.data.userId : user.id },
        progress: { progressAt: currentDate, progressByUserId: props.data.userId ? props.data.userId : user.id },
        review: { reviewAt: currentDate, reviewByUserId: props.data.userId ? props.data.userId : user.id },
        done: { doneAt: currentDate, doneByUserId: props.data.userId ? props.data.userId : user.id }
    };

    const changeTaskStatus = (e: any) => {

        const checkValue = e.target.innerText;
        if (projectArray.includes(checkValue) || meetingArray.includes(checkValue)) {
            queryData = {
                changeData: actionDataObject[checkValue],
                idData: props.data.taskId ? props.data.taskId : props.data.id,
                taskProgress: checkValue
            };
            getData();
        }
    };

    const getData = () => {

        if (Object.keys(queryData).length > 0) {
            axios.post("http://localhost:62000/api/v1/tasks", queryData)
                .then(result => {

                })
                .catch(err => console.log(err));
        }
    };

    const getUsers = (props: number) =>{
        let usersQuery = { idData: props};
        axios.patch("http://localhost:62000/api/v1/usertasks", usersQuery)
                .then(result => {

                    const currentData = result.data;

                    const NamesList = () => (
                        <div>
                          <ul>{currentData.map((name:any) => <li key={name.firstName}> 
                          <Link to={`/users/${name.id}`}>{name.firstName} {name.lastName} </Link>
                          </li>)}</ul>
                        </div>
                      );

                    setShowUsers(NamesList);
                })
                .catch(err => console.log(err));
    }
    
    const showRelatedUsers = (props: number) => {
        getUsers(props);

        return showUsers;
        
    }

    let dropdownButtonsArray = props.data.taskType === 'project' ? projectArray.map((element: string, k: number) => {
        return <Dropdown.Item as="button" key={'bbd' + k}>{element}</Dropdown.Item>
    }) :
        meetingArray.map((element: string, k: number) => {
            return <Dropdown.Item as="button" key={'bbd' + k}>{element}</Dropdown.Item>
        });

    useEffect(() => {
        getData();
    }, [queryData]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onShow={()=> showRelatedUsers(props.data.taskId ? props.data.taskId : props.data.id)}
            
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
                    <p>Users related to this {props.data.taskType}</p>
                    {showUsers}
                </div>

                <Container>
                    <Row>
                        <Col sm={8}>
                            <Form>
                                <DropdownButton id="dropdown-item-button" title="Select status" onClick={e => { changeTaskStatus(e); }}>
                                    {dropdownButtonsArray}
                                </DropdownButton>
                            </Form>
                        </Col>
                        {user && user.role === 'admin' ? <Col sm={4} className="delete-button-group">
                            <DeleteTaskModalApp {...props.data} />
                        </Col> : null}
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal >
    );
}

const ModalApp = (props: any[]) => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="danger" onClick={() => setModalShow(prevCheck => !prevCheck)}>
                Edit Task
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => {setModalShow(prevCheck => !prevCheck)}}
                data={props}
            />
        </>
    );
}

export default ModalApp;
