import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { Button } from "primereact/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorComponent from '../error/ErrorComponent';



type FormValues = {
    taskType: string;
    taskName: string;
    taskProgress: string;
    initiatedByUserId: string;
};

const CreateTaskGroup = () => {

    const [user, setUser] = useState(Object);
    const { register, handleSubmit } = useForm<FormValues>();
    const [selectValues, setSelectValues] = useState(undefined);
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();

    try {
        CurrentLoggedUser(setUser);
    } catch (error) {
        setHasError(true);
    }


    const taskTypeArray = [{ name: 'Project', value: 'project' }, { name: 'Meeting', value: 'meeting' }];

    const onTypeSelectorChange = (e: any) => {
        try {
            setSelectValues(e.value);
        } catch (error) {
            setHasError(true);
        }
    };

    const onSubmit: SubmitHandler<FormValues> = data => {

        const url = "http://localhost:62000/api/v1/createTask";
        const query = {
            taskType: selectValues,
            taskName: data.taskName,
            taskProgress: 'initial',
            initiatedByUserId: user.id
        };

        axios.post(url, query)
            .then(result => {
                if (result.status === 201) {
                    navigate('/tasks');
                }
            })
            .catch(err => {
                setHasError(true);
            });
    };
    if (!hasError) {

        return (
            <form onSubmit={handleSubmit(onSubmit)}>

                <Container>

                    <Row className="mb-3 justify-content-md-center">
                        <Col sm={3}>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-envelope"></i>
                                </span>
                                <Dropdown id={'dropDownButton'} value={selectValues} options={taskTypeArray} onChange={onTypeSelectorChange} optionLabel="name" placeholder="Select Type" editable />
                            </div>
                        </Col>
                    </Row>

                    <Row className="mb-3 justify-content-md-center">
                        <Col sm={3}>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-envelope"></i>
                                </span>
                                <InputText placeholder="Task Name" {...register("taskName")} />
                            </div>
                        </Col>
                    </Row>

                    <Row className="mb-3 justify-content-md-center">
                        <Col sm={3}>
                            <Button label="Submit" className="p-button-danger" disabled={false} />
                            {/* <input className="btn btn-danger" type="submit" value="Create Task" /> */}
                        </Col>
                    </Row>
                </Container>
            </form>
        );
    } else {
        return <ErrorComponent/>
    }
}

export default CreateTaskGroup;
