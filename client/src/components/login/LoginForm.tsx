import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from "axios";
import { Link } from "react-router-dom";
import Hello from '../test_components/HelloWorld';
import './loginForm.css';
import { Row, Col, Card, Container } from 'react-bootstrap';





type FormValues = {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
};

const InputGroupDemo = () => {

    const { register, watch, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [filled, setFilled] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = data => {

        const user = { insertEmail: 'connect@con.com', insertPassword: '123456' };

        axios.post("http://localhost:62000/api/v1/userLogin",
            {
                insertEmail: data.email,
                insertPassword: data.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res);
                if (res.status === 200) {
                    console.log(res.data.userLogged);
                    <Hello />
                    window.location.href = '/helloMitko';
                }

            })
            .catch(err => {
                console.log(err);

            });
    };

    // const onStateChange = () => {
    //     setFilled(true);
    //     console.log(register);

    // }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
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
                            <InputText type={'password'} placeholder="Password" {...register("password", {required: true, minLength: {value: 6, message: "password must contain at least 6 symbols"}})} />
                        </div>
                        {errors.password && <span className="error-message" role="alert">{errors.password.message}</span>}
                    </Col>
                </Row>
                <Row className="mt-3 justify-content-md-center">
                    <Col sm={3}>
                        <Button label="Submit" className="p-button-danger" disabled={false} />
                        <div className="mt-2">If you don't have an account please <Link to={`/signup`} className="active-task-link">SingUp</Link></div>
                    </Col>
                </Row>
            </Container>

            {/* <div>
                <div className="grid">

                    <div className="row mb-3">
                        <div className="col-3"></div>
                        <div className="col-3">
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
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3"></div>
                        <div className="col-3">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-shield"></i>
                                </span>
                                <InputText type={'password'} placeholder="Password" {...register("password")} />
                            </div>
                        </div>
                    </div>
                </div>


            </div> */}
            {/* <div className="row mb-3">
                <div className="col-3"></div>
                <div className="col-3">
                    <input className="btn btn-danger" type="submit" />

                    <Button label="Submit" className="p-button-danger" disabled={false} />
                    <div className="mt-2">If you don't have an account please <Link to={`/signup`} className="active-task-link">SingUp</Link></div>

                </div>
            </div> */}

        </form>
    );
}

export default InputGroupDemo;
