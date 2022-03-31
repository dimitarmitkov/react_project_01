import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import './editUser.css';


type FormValues = {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    picture: string;
};

const DeleteUserGroup = (props: any) => {

    const { register, watch, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [passwordValue, setPasswordValue] = useState('');
    const [checked, setChecked] = useState(false);

    const onSubmit = () => {

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
    };


    return (
        <>
            <h2>Delete User</h2>

            <Container className="mt-3">
                <Row className="mt-3 justify-content-md-center">
                    <Col>
                        <Button label="Submit" className="p-button-danger" disabled={false} onClick={onSubmit} />
                    </Col>
                </Row>
            </Container>
        </>

    );
}

const DeleteUserApp = (props: any) => {
    const [showElement, setShowElement] = useState(false);

    return (
        <>
            <Button className="p-button-warning" onClick={() => setShowElement(true)}>
                Delete User {props.id}
            </Button>

            {showElement ? <DeleteUserGroup data={props} /> : null}
        </>
    );
}

export default DeleteUserApp;
