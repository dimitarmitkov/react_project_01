import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Link } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import { useState } from "react";
import { valuesLinks } from '../../enumerators';
import axiosFunction from '../../utils/axiosFunctions';
import ErrorComponent from '../error/ErrorComponent';
import './loginForm.css';

type FormValuesProps = {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
};

const LoginGroup = () => {

    const { register, formState: { errors }, handleSubmit } = useForm<FormValuesProps>();
    const [passwordValue, setPasswordValue] = useState('');
    const [hasError, setHasError] = useState(false);

    const onSubmit: SubmitHandler<FormValuesProps> = data => {

        const query = {
            insertEmail: data.email,
            insertPassword: passwordValue
        };
        
        try {
            axiosFunction(valuesLinks.UserLogin, query, 'post', 200);
        } catch (error) {
            setHasError(true);
        }
    };

    if (!hasError) {

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
                                <Password value={passwordValue} onChange={(e) => {
                                    try {
                                        setPasswordValue(e.target.value);
                                    } catch (error) {
                                        setHasError(true);
                                    }
                                }} toggleMask feedback={false} />
                            </div>
                            {errors.password && <span className="error-message" role="alert">{errors.password.message}</span>}
                        </Col>
                    </Row>

                    <Row className="mt-3 justify-content-md-center">
                        <Col sm={3}>
                            <Button label="Submit" className="p-button-danger" disabled={false} />
                            <div className="mt-2">If you don't have an account please <Link to={valuesLinks.SignUp} className="active-task-link">SingUp</Link></div>
                        </Col>
                    </Row>
                </Container>
            </form>
        );
    } else {
        return <ErrorComponent />
    }
}

export default LoginGroup;
