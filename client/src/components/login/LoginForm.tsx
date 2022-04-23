import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Link } from "react-router-dom";
import './loginForm.css';
import { Row, Col, Container } from 'react-bootstrap';
import { useState } from "react";
import axiosFunction from '../functions/axiosFunctions';

type FormValues = {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
};

const LoginGroup = () => {

    const { register, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [passwordValue, setPasswordValue] = useState('');

    const onSubmit: SubmitHandler<FormValues> = data => {

        const query = {
            insertEmail: data.email,
            insertPassword: passwordValue
        };

        axiosFunction('loginForm', query, 'post', 200, undefined, '/helloMitko')
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
                            <Password value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} toggleMask feedback={false} />
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

export default LoginGroup;
