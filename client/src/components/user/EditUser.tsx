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
import { userInfo } from "os";


type FormValues = {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    picture: string;
};

const EditUserGroup = (props: any) => {

    const { register, watch, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [passwordValue, setPasswordValue] = useState('');
    const [checked, setChecked] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = data => {

        axios.post("http://localhost:62000/api/v1/usersEdit",
            {
                email: data.email ? data.email : props.data.email,
                insertPassword: passwordValue ? passwordValue : null,
                firstName: data.firstName ? data.firstName : props.data.firstName,
                lastName: data.lastName ? data.lastName : props.data.lastName,
                role: checked ? 'user' : 'admin',
                picture: data.picture ? data.picture : "",
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


    const [changePasswordSelected, setChangePasswordSelected] = useState(false);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h5 className="mt-3">Edit User {props.data.firstName} {props.data.lastName}</h5>

            <Container className="mt-3 form-container">
                <Row className="mt-3 justify-content-md-center">
                    <Col>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user-edit"></i>
                            </span>
                            <InputText defaultValue={props.data.firstName} {...register("firstName", { required: true, minLength: { value: 3, message: "name must contain at least 3 symbols" } })} contentEditable />
                        </div>
                        {errors.firstName && <span className="error-message" role="alert">{errors.firstName.message}</span>}
                    </Col>
                </Row>

                <Row className="mt-3 justify-content-md-center">
                    <Col>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user-edit"></i>
                            </span>
                            <InputText defaultValue={props.data.lastName} {...register("lastName", { required: true, minLength: { value: 3, message: "name must contain at least 3 symbols" } })} />
                        </div>
                        {errors.lastName && <span className="error-message" role="alert">{errors.lastName.message}</span>}
                    </Col>
                </Row>

                <Row className="mt-3 justify-content-md-center">
                    <Col>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-envelope"></i>
                            </span>
                            <InputText defaultValue={props.data.email} {...register("email", {
                                required: true, pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Entered value does not match email format"
                                }
                            })} />
                        </div>
                        {errors.email && <span className="error-message" role="alert">{errors.email.message}</span>}
                    </Col>
                </Row>

                <Row className="mt-3 justify-content-md-center">
                    <Col>
                        <div className="p-inputgroup">
                            <div className="field-checkbox">
                            <Checkbox inputId="passwordChecker" checked={changePasswordSelected} onChange={e => setChangePasswordSelected(e.checked)} />
                         </div>
                        <div className="field-checkbox-label">
                            <label htmlFor="passwordChecker">{changePasswordSelected ? 'Change password selected' : 'Change password?'}</label>

                        </div>
                    </div>
                </Col>
            </Row>
            {changePasswordSelected ? <Row className="mt-3 justify-content-md-center" >
                <Col>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-shield"></i>
                        </span>
                        <Password defaultValue={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} toggleMask />
                    </div>
                    {errors.password && <span className="error-message" role="alert">{errors.password.message}</span>}
                </Col>
            </Row>
                : ''}
            <Row className="mt-3 justify-content-md-center">
                <Col>

                    <div className="p-inputgroup">
                        <div className="field-checkbox">
                            <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} disabled={false} />
                        </div>
                        <div className="field-checkbox-label">
                            <label htmlFor="binary">{checked ? 'User role selected' : 'Please check for User role'}</label>

                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="mt-3 mb-3 justify-content-md-center">
                <Col>
                    <Button label="Submit" className="p-button-primary" disabled={false} />
                </Col>
            </Row>
        </Container>
    </form >
);
}

const EditUserApp = (props: any) => {
    const [showElement, setShowElement] = useState(false);

    return (
        <>
            <Button className="p-button-danger" onClick={() => setShowElement(prevCheck => !prevCheck)}>
                Edit User {props.id}
            </Button>

            {showElement ? <EditUserGroup data={props} /> : null}
        </>
    );
}

export default EditUserApp;
