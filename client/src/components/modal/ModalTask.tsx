import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import axios from 'axios';
import CurrentLoggedUser from '../functions/currentLoggedUser';

const MyVerticallyCenteredModal = (props: any) => {

    const [user, setUser] = useState(Object);

  CurrentLoggedUser(setUser);

    interface MyObj {
        [propName: string]: {}
    }

    const projectArray: string[] = ["initial", "selected", "progress", "review", "done"];
    const meetingArray: string[] = ["initial", "selected", "progress", "done"];
    const currentDate = new Date(Date.now()).toISOString();

    const actionDataObject: MyObj = {
        initial: { initiatedAt: currentDate, initiatedByUserId: props.data.userId ? props.data.userId : user.id },
        selected: { selectedAt: currentDate, selectedByUserId: props.data.userId ? props.data.userId : user.id},
        progress: { progressAt: currentDate, progressByUserId: props.data.userId ? props.data.userId : user.id},
        review: { reviewAt: currentDate, reviewByUserId: props.data.userId ? props.data.userId : user.id},
        done: { doneAt: currentDate, doneByUserId: props.data.userId ? props.data.userId : user.id}
    }

    const changeTaskStatus = (e: any) => {
        // e.preventDefault();
        // debugger;
        const checkValue = e.target.innerText;
        if (projectArray.includes(checkValue) || meetingArray.includes(checkValue)) {
            let url = "http://localhost:62000/api/v1/tasks";

            axios.post(url, {changeData: actionDataObject[checkValue], idData : props.data.taskId ? props.data.taskId : props.data.id, taskProgress:checkValue})
                .then(result => {
                    
                    if(result.status === 200){
                        window.location.reload();
                    }
                })
                    .catch(err => console.log(err));
        }
    }

    let dropdownButtonsArray = props.taskType === 'project' ? projectArray.map((element: string, k: number) => {
        return <Dropdown.Item as="button" key={'bbd' + k}>{element}</Dropdown.Item>
    }) : 
    meetingArray.map((element: string, k: number) => {
        return <Dropdown.Item as="button" key={'bbd' + k}>{element}</Dropdown.Item>
    });

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.data.taskName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.data.taskProgress}</h4>
                <p>
                    {props.data.taskType}
                </p>

                <Form>
                    <DropdownButton id="dropdown-item-button" title="Select status" onClick={e => changeTaskStatus(e)}>
                        {dropdownButtonsArray}
                    </DropdownButton>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ModalApp = (props: any[]) => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="danger" onClick={() => setModalShow(true)}>
                Edit Task
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={props}
            />
        </>
    );
}

export default ModalApp;
