import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonBs from 'react-bootstrap/Button';
import { Button } from 'primereact/button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DeleteUserModal = (props: any) => {
  const [show, setShow] = useState(true);

  const getData = async () => {

    const url = "http://localhost:62000/api/v1/usersDelete";
    const queryData = { idData: props.data.id }
    const result = await axios.post(url, queryData);

    toast.configure();

    result.status === 200 ? window.location.reload() : toast('Something went wrong, you are not allowed.');
  }

  const handleDiscard = () => setShow(false);
  const handleDelete = () => {
    getData();
    setShow(false);
  }

  return (
    <>
      <Modal {...props} show={show}>

        <Modal.Header closeButton onClick={handleDiscard}>
          <Modal.Title>Delete User {props.data.firstName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>You're about to delete user <span>{props.data.firstName} {props.data.lastName}</span>. Are you sure?</Modal.Body>

        <Modal.Footer>

          <ButtonBs variant="secondary" onClick={handleDiscard}>
            Discard
          </ButtonBs>

          <ButtonBs variant="danger" onClick={handleDelete}>
            Delete
          </ButtonBs>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const DeleteUserModalApp = (props: any[]) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button className="p-button-warning" onClick={() => setModalShow(prevCheck => !prevCheck)}>
        Delete User
      </Button>

      {modalShow ? <DeleteUserModal data={props} /> : null}
    </>
  );
}

export default DeleteUserModalApp;
