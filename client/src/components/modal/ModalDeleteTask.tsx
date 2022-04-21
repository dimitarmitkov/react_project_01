import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonBs from 'react-bootstrap/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ws = new WebSocket('ws://127.0.0.1:8000/ws');

const GetUsers = (currentTaskId: number) => {

  const [allowedUsers, setAllowedUsers] = useState([]);
  const url = "http://localhost:62000/api/v1/usertasks";
  const usersQuery = { idData: currentTaskId };

  axios.patch(url, usersQuery)
    .then(result => {

      const currentData = result.data;

      const allowedUsersList = () => (
        currentData.map((name: any) => name.id)
      );

      setAllowedUsers(allowedUsersList);
    })
    .catch(err => console.log(err));

  return allowedUsers;
}

const DeleteTaskModal = (props: any) => {

  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(true);
  const currentTaskId = props.data.taskId ? props.data.taskId : props.data.id;
  const currentAllowedUsersList = GetUsers(currentTaskId);
  const url = "http://localhost:62000/api/v1/tasksDelete";
  const query = { idData: currentTaskId };

  const getData = async() => {
    
    const result = await axios.post(url, query);

      if (result.status === 200) {
        
        ws.send(JSON.stringify({ main: props.data, action: 'delete', allowedList: currentAllowedUsersList }));
        window.location.reload();
      } else {

        toast.configure();
        toast('Something went wrong, you are not allowed.');
      }
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

  return (
    <>
      <ButtonBs variant="danger" onClick={() => setDeleteTaskModalShow(prevCheck => !prevCheck)}>
        Delete Task
      </ButtonBs>

      {deleteTaskModalShow ? <DeleteTaskModal
        data={props}
      /> : null}
    </>
  );
}

export default DeleteTaskModalApp;
