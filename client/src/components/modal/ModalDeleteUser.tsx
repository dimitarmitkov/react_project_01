import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonBs from 'react-bootstrap/Button';
import { Button } from 'primereact/button';
import axiosFunction from '../functions/axiosFunctions';

const DeleteUserModal = (props: any) => {
  const [show, setShow] = useState(true);

  const getData = async () => {

    const query = { idData: props.data.id }

    await axiosFunction('modalDeleteUser', query, 'post', 200);
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
