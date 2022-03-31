import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ButtonBs from 'react-bootstrap/Button';
import { Button } from 'primereact/button';
import axios from 'axios';

const DeleteUserModal = (props: any) => {
     const [show, setShow] = useState(true);
  
    const handleDiscard = () => setShow(false);
    const handleDelete = () =>{

        console.log('delete this user ', props.data.firstName);

        axios.post("http://localhost:62000/api/v1/usersDelete",
        {
            id: props.data.id
        })
        .then(res => {


            if (res.status === 200) {
                window.location.reload();
            }
        })
        .catch(err => {
            console.log(err);
        });

        setShow(false);
    } 
  
    return (
      <>
        <Modal {...props} show={show}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User {props.data.firstName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>You're about to delete this User. Are you sure?</Modal.Body>
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
            {/* <Button variant="danger" onClick={() => setModalShow(prevCheck => !prevCheck)}> */}
            <Button className="p-button-warning" onClick={() => setModalShow(prevCheck => !prevCheck)}>
            {/* <Button variant="danger" onClick={() => setModalShow(true)}> */}
                Delete User
            </Button>

            {modalShow ? <DeleteUserModal
                // onHide={() => setModalShow(false)}
                data={props}
            /> : null }
        </>
    );
}

export default DeleteUserModalApp;
  