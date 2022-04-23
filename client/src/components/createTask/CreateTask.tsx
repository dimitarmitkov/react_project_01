import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import AxiosSpecialFunction from '../functions/axiosSpecialFunctions';

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

    CurrentLoggedUser(setUser);

    const taskTypeArray = [{ name: 'Project', value: 'project' }, { name: 'Meeting', value: 'meeting' }];

    const onTypeSelectorChange = (e: any) => {
        setSelectValues(e.value);
    };

    const onSubmit: SubmitHandler<FormValues> = data => {

        const query = {
            taskType: selectValues,
            taskName: data.taskName,
            taskProgress: 'initial',
            initiatedByUserId: user.id
        };

        AxiosSpecialFunction('createTaskPostAxios', query, 'post', undefined, undefined, '/tasks')
    };

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
                        <input className="btn btn-danger" type="submit" value="Create Task" />
                    </Col>
                </Row>
            </Container>
        </form>
    );
}

export default CreateTaskGroup;
