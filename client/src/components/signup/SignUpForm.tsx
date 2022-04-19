import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import './signUpForm.css';
import axiosFunction from '../functions/axiosFunctions';


type FormValues = {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    picture: string;
};

const SignUpGroup = () => {

    const { register, watch, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [passwordValue, setPasswordValue] = useState('');
    const [checked, setChecked] = useState(false);
    
    const onSubmit: SubmitHandler<FormValues> = data => {

        const url = "http://localhost:62000/api/v1/createUser";
        const queryData = {
            email: data.email,
            insertPassword: passwordValue,
            firstName: data.firstName,
            lastName: data.lastName,
            role: checked? 'user': 'admin',
            picture: data.picture ? data.picture : ""
        };

        axiosFunction(url, queryData, 'post', 'windowHref','/login', 201);

        // axios.post(url, queryData)
        //     .then(res => {
        //         console.log(res);
        //         if (res.status === 201) {
                    
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err);

        //     });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Container className="mt-3">

                <Row className="mt-3 justify-content-md-center">
                    <Col sm={3}>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user-edit"></i>
                            </span>
                            <InputText placeholder="First Name" {...register("firstName", { required: true, minLength: { value: 3, message: "name must contain at least 3 symbols" } })} />
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
                            <InputText placeholder="Last Name" {...register("lastName", { required: true, minLength: { value: 3, message: "name must contain at least 3 symbols" } })} />
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
                            <InputText placeholder="Email" {...register("email", {
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
                                <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} disabled={false}/>
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
                        <div className="mt-2">If you already have an account please <Link to={`/login`} className="active-task-link">SignIn</Link></div>
                    </Col>
                </Row>
            </Container>
        </form>
    );
}

export default SignUpGroup;
