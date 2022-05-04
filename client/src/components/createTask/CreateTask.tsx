import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { Button } from "primereact/button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorComponent from '../error/ErrorComponent';
import { valuesProgress, valuesTaskType, valuesLinks } from '../../enumerators';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

type PropsFormValues = {
    taskType: string;
    taskName: string;
    taskProgress: string;
    initiatedByUserId: string;
};

interface PropsCurrentUser {
    id?: number;
    role?: string;
    userName?: string;
}

const CreateTaskGroup = () => {

    const { register, handleSubmit } = useForm<PropsFormValues>();
    const [selectValues, setSelectValues] = useState(undefined);
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();

    const user: PropsCurrentUser = CurrentLoggedUser()!;
    const nameValues = Object.keys(valuesTaskType);


    const taskTypeArray = [
        { name: nameValues.shift(), value: valuesTaskType.Project },
        { name: nameValues[nameValues.length - 1], value: valuesTaskType.Meeting }
    ];

    const onTypeSelectorChange = (e: any) => {
        try {
            setSelectValues(e.value);
        } catch (error) {
            setHasError(true);
        }
    };

    const onSubmit: SubmitHandler<PropsFormValues> = async data => {

        const url = SERVER_URL + valuesLinks.CreateTask;
        const query = {
            taskType: selectValues,
            taskName: data.taskName,
            taskProgress: valuesProgress.shift(),
            initiatedByUserId: user.id
        };

        const result = await axios.post(url, query);

        if (result.status === 201) {
            navigate(valuesLinks.Tasks);
        }

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
                        </Col>
                    </Row>
                </Container>
            </form>
        );
    } else {
        return <ErrorComponent />
    }
}

export default CreateTaskGroup;
