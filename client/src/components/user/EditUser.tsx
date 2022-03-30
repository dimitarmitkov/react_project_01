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

const EditUserGroup = (props: any) => {

    const { register, watch, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [passwordValue, setPasswordValue] = useState('');
    const [checked, setChecked] = useState(false);
    let [userFirstName, setUserFirstName] = useState('');
    let [userLastName, setUserLastName] = useState('');
    let [userEmail, setUserEmail] = useState('');
    let [userPassword, setUserPassword] = useState('');

    const { id } = useParams();

    console.log(id);

    axios.post("http://localhost:62000/api/v1/users", 
    { id: id }
    )
    .then(res => {
        console.log(res);
        onPostRequest(res.data)
    })
    .catch(err => console.log(err));

    const onPostRequest = (data: any) =>{
        setUserFirstName(data.firstName);
        setUserLastName(data.lastName);
        setUserEmail(data.email);
        setUserPassword(data.password);
    }


    const onSubmit: SubmitHandler<FormValues> = data => {


        axios.post("http://localhost:62000/api/v1/usersEdit",
            {
                email: data.email? data.email : userEmail,
                insertPassword: passwordValue? passwordValue: null,
                firstName: data.firstName? data.firstName : userFirstName,
                lastName: data.lastName? data.lastName : userLastName,
                role: checked ? 'user' : 'admin',
                picture: data.picture ? data.picture : "",
                id: id
            })
            .then(res => {
                if (res.status === 200) {
                    window.location.href = '/users';
                }
            })
            .catch(err => {
                console.log(err);

            });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <h2>Edit User</h2>

            <Container className="mt-3">
                <Row className="mt-3 justify-content-md-center">
                    <Col sm={3}>


                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user-edit"></i>
                            </span>
                            <InputText placeholder={userFirstName} {...register("firstName", { required: true, minLength: { value: 3, message: "name must contain at least 3 symbols" } })} />
                        </div>
                        {errors.firstName && <span className="error-message" role="alert">{errors.firstName.message}</span>}
                    </Col>
                </Row>

                <Row className="mt-3 justify-content-md-center">
                    <Col sm={3}>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user-edit"></i>
                            </span>
                            <InputText placeholder={userLastName} {...register("lastName", { required: true, minLength: { value: 3, message: "name must contain at least 3 symbols" } })} />
                        </div>
                        {errors.lastName && <span className="error-message" role="alert">{errors.lastName.message}</span>}
                    </Col>
                </Row>

                <Row className="mt-3 justify-content-md-center">
                    <Col sm={3}>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-envelope"></i>
                            </span>
                            <InputText placeholder={userEmail} {...register("email", {
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
                    <Col sm={3}>

                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-shield"></i>
                            </span>
                            <Password value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} toggleMask />
                        </div>
                        {errors.password && <span className="error-message" role="alert">{errors.password.message}</span>}
                    </Col>
                </Row>

                <Row className="mt-3 justify-content-md-center">
                    <Col sm={3}>

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
                <Row className="mt-3 justify-content-md-center">
                    <Col sm={3}>
                        <Button label="Submit" className="p-button-danger" disabled={false} />
                    </Col>
                </Row>
            </Container>
        </form>
    );
}

export default EditUserGroup;
