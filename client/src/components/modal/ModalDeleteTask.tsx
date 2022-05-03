import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonBs from 'react-bootstrap/Button';
import axiosFunction from '../functions/axiosFunctions';
import './modalDelete.css';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import ErrorComponent from '../error/ErrorComponent';
import axios from 'axios';

interface PropsCurrentUser {
  id?: number;
  role?: string;
  userName?: string;
}

const DeleteTaskModal = (props: any) => {
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(true);
  const [hasError, setHasError] = useState(false);
  const currentTaskId = props.data.taskId ? props.data.taskId : props.data.id;

  const user: PropsCurrentUser = CurrentLoggedUser()!;

  const getData = (currentAllowedUsersList: never[]) => {

    const queryGetData = { idData: currentTaskId };
    const userGeneratedProcess = { userGeneratorName: user.userName, userGeneratorId: user.id, userGeneratorRole: user.role };
    const jsonStringGetData = JSON.stringify({ main: props.data, action: 'delete', allowedList: currentAllowedUsersList, generator: userGeneratedProcess });

    try {
      axiosFunction('modalDeleteTask', queryGetData, 'post', 200, jsonStringGetData)
    } catch (error) {
      setHasError(true);
    }
  }

  const HandleDiscardDeleteTask = () => {

    try {
      setShowDeleteTaskModal(false);
    } catch (error) {
      setHasError(true);
    }
  }

  const HandleDeleteTask = async () => {

    const usersQuery = { idData: currentTaskId };
    const url = "http://localhost:62000/api/v1/usertasks";
    const result = await axios.patch(url, usersQuery);
    const currentData = result.data;
    const allowedUsers = currentData.map((name: any) => name.id);

    try {
      getData(allowedUsers);
      setShowDeleteTaskModal(false);
    } catch (error) {
      setHasError(true);
    }
  }

  if (!hasError) {

    return (
      <>
        <Modal {...props} show={showDeleteTaskModal}>

          <Modal.Header closeButton onClick={HandleDiscardDeleteTask}>
            <Modal.Title>Delete Task {props.data.firstName}</Modal.Title>
          </Modal.Header>

          <Modal.Body>You're about to delete this Task. Are you sure?</Modal.Body>

          <Modal.Footer>

            {/* <ButtonBs variant="secondary" onClick={()=>{
              HandleDiscardDeleteTask();
              props.onHide();
            }}>
              Discard
            </ButtonBs> */}
            <ButtonBs variant="secondary" onClick={() => {
              props.onHide();
            }}>
              Discard
            </ButtonBs>

            <ButtonBs variant="danger" onClick={HandleDeleteTask}>
              Delete
            </ButtonBs>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return <ErrorComponent />
  }
}

const DeleteTaskModalApp = (props: any[]) => {
  const [deleteTaskModalShow, setDeleteTaskModalShow] = useState(false);


  return (
    <>
      <ButtonBs id="delete-task-button" variant="danger" onClick={() => {
        setDeleteTaskModalShow(prevCheck => !prevCheck);
      }}>
        Delete task
      </ButtonBs>

      {deleteTaskModalShow ? <DeleteTaskModal
        onHide={() => { setDeleteTaskModalShow(prevCheck => !prevCheck) }}
        //  onHide={() => { setDeleteTaskModalShow(false) }}
        data={props}
      /> : null}
    </>
  );
}

export default DeleteTaskModalApp;
