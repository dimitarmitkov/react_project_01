import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import axios from "axios";
import { Link } from "react-router-dom";
import Hello from '../test_components/HelloWorld';
import './loginForm.css';
import { Row, Col, Container } from 'react-bootstrap';
import { useState } from "react";

type FormValues = {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
};

const InputGroupDemo = () => {

    const { register, watch, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [passwordValue, setPasswordValue] = useState('');

    const onSubmit: SubmitHandler<FormValues> = data => {

        // TODO just for information delete it later on
        // const user = { insertEmail: 'connect@con.com', insertPassword: '123456' };

        axios.post("http://localhost:62000/api/v1/userLogin",
            {
                insertEmail: data.email,
                insertPassword: passwordValue
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
                            {/* <InputText type={'password'} placeholder="Password" {...register("password", {required: true, minLength: {value: 6, message: "password must contain at least 6 symbols"}})} />*/}
                            <Password value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} toggleMask /> 
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
        </form>
    );
}

export default InputGroupDemo;
