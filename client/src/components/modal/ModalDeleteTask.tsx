import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonBs from 'react-bootstrap/Button';
import { Button } from 'primereact/button';
import axios from 'axios';

const DeleteTaskModal = (props: any) => {
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(true);

  console.log(props);
  
  const getData = () => axios.post("http://localhost:62000/api/v1/tasksDelete",
    {
      idData: props.data.id
    })
    .then(res => {
      if (res.status === 200) {
        window.location.reload();
      }
    })
    .catch(err => {
      console.log(err);
    });

  const HandleDiscardDeleteTask = () => setShowDeleteTaskModal(false);
  const HandleDeleteTask = () => {

    getData();

    setShowDeleteTaskModal(false);

    // useEffect(()=>{
    //     getData();
    // },[props])
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

//   console.log(props);
  

  return (
    <>
      <ButtonBs variant="danger" onClick={() => setDeleteTaskModalShow(prevCheck => !prevCheck)}>
        Delete Task
      </ButtonBs>

      {deleteTaskModalShow ? <DeleteTaskModal
        data={props}
        // onHide={}
      /> : null}
    </>
  );
}

export default DeleteTaskModalApp;
