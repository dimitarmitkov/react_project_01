import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonBs from 'react-bootstrap/Button';
import axiosFunction from '../functions/axiosFunctions';
import AxiosSpecialFunction from '../functions/axiosSpecialFunctions';
import './modalDelete.css';
import CurrentLoggedUser from '../functions/currentLoggedUser';

const GetUsers = (currentTaskId: number) => {

  const [allowedUsers, setAllowedUsers] = useState([]);
  const usersQuery = { idData: currentTaskId };

  AxiosSpecialFunction('modalDeletePatchAxios', usersQuery ,'patch', setAllowedUsers);

  return allowedUsers;
}

const DeleteTaskModal = (props: any) => {
  const [user, setUser] = useState(Object);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(true);
  const currentTaskId = props.data.taskId ? props.data.taskId : props.data.id;
  const currentAllowedUsersList = GetUsers(currentTaskId);

  CurrentLoggedUser(setUser);

  const getData = async () => {

    const queryGetData = { idData: currentTaskId };
    const userGeneratedProcess = { userGeneratorName: user.userName, userGeneratorId: user.id, userGeneratorRole: user.role };
    const jsonStringGetData = JSON.stringify({ main: props.data, action: 'delete', allowedList: currentAllowedUsersList, generator: userGeneratedProcess });

    axiosFunction('modalDeleteTask', queryGetData, 'post', 200, jsonStringGetData)
  }

  const HandleDiscardDeleteTask = () => setShowDeleteTaskModal(false);
  
  const HandleDeleteTask = () => {

    getData();
    setShowDeleteTaskModal(false);
  }

  return (
    <>
      <Modal {...props} show={showDeleteTaskModal}>

        <Modal.Header closeButton onClick={HandleDiscardDeleteTask}>
          <Modal.Title>Delete Task {props.data.firstName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>You're about to delete this Task. Are you sure?</Modal.Body>

        <Modal.Footer>

          <ButtonBs variant="secondary" onClick={HandleDiscardDeleteTask}>
            Discard
          </ButtonBs>

          <ButtonBs variant="danger" onClick={HandleDeleteTask}>
            Delete
          </ButtonBs>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const DeleteTaskModalApp = (props: any[]) => {
  const [deleteTaskModalShow, setDeleteTaskModalShow] = useState(false);

  const modalElement = document.getElementsByClassName('fade modal show')[0] as HTMLElement;
   
  return (
    <>
      <ButtonBs id="delete-task-button" variant="danger" onClick={() => {
        setDeleteTaskModalShow(prevCheck => !prevCheck);
        modalElement.style.display = 'none';
        }}>
        Delete task
      </ButtonBs>

      {deleteTaskModalShow ? <DeleteTaskModal
        data={props}
      /> : null}
    </>
  );
}

export default DeleteTaskModalApp;
