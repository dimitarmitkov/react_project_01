import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonBs from 'react-bootstrap/Button';
import { Button } from 'primereact/button';
import axios from 'axios';

const DeleteUserModal = (props: any) => {
  const [show, setShow] = useState(true);

  const getData = () => axios.post("http://localhost:62000/api/v1/usersDelete",
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

  const handleDiscard = () => setShow(false);
  const handleDelete = () => {

    getData();

    setShow(false);
  }

  useEffect(()=>{
    
  },[])

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

      {modalShow ? <DeleteUserModal
        data={props}
      /> : null}
    </>
  );
}

export default DeleteUserModalApp;
