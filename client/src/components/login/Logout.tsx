// import axios from "axios";
import { Button } from 'primereact/button';
import { useForm, SubmitHandler } from "react-hook-form";
import { Row, Col, Container } from 'react-bootstrap';
import './loginForm.css';
import axiosFunction from '../functions/axiosFunctions';

// @change-request empty type ??
type FormValues = {
};

const LogoutGroup = () => {

    const { handleSubmit } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = data => {

        const query = { withCredentials: true };

        axiosFunction('logoutForm', query, 'get', 200, undefined, '/login')
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <Container>

                <Row className="mt-3 justify-content-md-center">
                    <Col sm={3}>
                        <h5>You're about to log out</h5>
                    </Col>
                </Row>

                <Row className="mt-3 justify-content-md-center">
                    <Col sm={3}>
                        <h6>Please confirm</h6>
                    </Col>
                </Row>

                <Row className="mt-3 justify-content-md-center">
                    <Col sm={3}>
                        <label></label>
                        <Button label="Log Out" className="p-button-danger" disabled={false} />
                    </Col>
                </Row>
            </Container>
        </form>
    );
}

export default LogoutGroup;
