import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonBs from 'react-bootstrap/Button';
import { Button } from 'primereact/button';
import axiosFunction from '../functions/axiosFunctions';
import ErrorComponent from '../error/ErrorComponent';
import { valuesLinks } from '../../enumerators';

interface Props{
  data:{
    id: number;
    firstName: string;
    lastName: string;
  }
};

interface DeleteUserModalAppProps {
  firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    picture: string;
    id: number;
};

const DeleteUserModal = (props: Props) => {
  const [show, setShow] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getData = async () => {

    const query = { idData: props.data.id }

    try {
      await axiosFunction(valuesLinks.UsersDelete, query, 'post', 200);
    } catch (error) {
      setHasError(true);
    }
  }

  const handleDiscard = () => {

    try {
      setShow(false);
    } catch (error) {
      setHasError(true);
    }
  }

  const handleDelete = () => {

    try {
      getData();
      setShow(false);
    } catch (error) {
      setHasError(true);
    }
  }

  if (!hasError) {

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
  } else {
    return <ErrorComponent />
  }
}



const DeleteUserModalApp = (props: DeleteUserModalAppProps) => {
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
