import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonBs from 'react-bootstrap/Button';
import axiosFunction from '../../utils/axiosFunctions';
import './modalDelete.css';
import useCurrentLoggedUser from '../../hooks/setCurrentLoggedUser';
import ErrorComponent from '../error/ErrorComponent';
import axios from 'axios';
import { valuesLinks } from '../../enumerators';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

interface CurrentUserProps {
  id?: number;
  role?: string;
  userName?: string;
}

interface DeleteTaskModalProps {
  data: {
    taskId: number;
    id: number;
    firstName: string;
  };
  onHide: () => void;
};

interface UserOfAllowedUsersProps {
  id: number;
};

interface DeleteTaskModalAppProps {
  userId: number;
  taskId: number;
  id: number;
  taskType: string;
  taskName: string;
  taskProgress: string;
  createdAt: string;
  firstName: string;
};

const DeleteTaskModal = (props: DeleteTaskModalProps) => {
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(true);
  const [hasError, setHasError] = useState(false);
  const currentTaskId = props.data.taskId ? props.data.taskId : props.data.id;

  const user: CurrentUserProps = useCurrentLoggedUser()!;

  const getData = (currentAllowedUsersList: never[]) => {

    const queryGetData = { idData: currentTaskId };
    const userGeneratedProcess = { userGeneratorName: user.userName, userGeneratorId: user.id, userGeneratorRole: user.role };
    const jsonStringGetData = JSON.stringify({ main: props.data, action: 'delete', allowedList: currentAllowedUsersList, generator: userGeneratedProcess });

    try {
      axiosFunction(valuesLinks.TasksDelete, queryGetData, 'post', 200, jsonStringGetData);
    } catch (error) {
      setHasError(true);
    }
  }

  const handleDiscardDeleteTask = () => {

    try {
      setShowDeleteTaskModal(false);
    } catch (error) {
      setHasError(true);
    }
  }



  const handleDeleteTask = async () => {

    const usersQuery = { idData: currentTaskId };
    const url = SERVER_URL + valuesLinks.UserTasks;
    const result = await axios.patch(url, usersQuery);
    const currentData = result.data;
    const allowedUsers = currentData.map((user: UserOfAllowedUsersProps) => user.id);

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

          <Modal.Header closeButton onClick={handleDiscardDeleteTask}>
            <Modal.Title>Delete Task {props.data.firstName}</Modal.Title>
          </Modal.Header>

          <Modal.Body>You're about to delete this Task. Are you sure?</Modal.Body>

          <Modal.Footer>

            <ButtonBs variant="secondary" onClick={() => {
              props.onHide();
            }}>
              Discard
            </ButtonBs>

            <ButtonBs variant="danger" onClick={handleDeleteTask}>
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

const DeleteTaskModalApp = (props: DeleteTaskModalAppProps) => {
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
        data={props}
      /> : null}
    </>
  );
}

export default DeleteTaskModalApp;
