import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { Button } from "primereact/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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

    // @change-request custom hooks should be named like a hook (useCurrentLoggedUser), also file name
    // also its good to set all other hooks in the custom hook, check here https://www.w3schools.com/react/react_customhooks.asp
    CurrentLoggedUser(setUser);
    const navigate = useNavigate();


    const taskTypeArray = [{ name: 'Project', value: 'project' }, { name: 'Meeting', value: 'meeting' }];

    // @change-request try not to use any
    const onTypeSelectorChange = (e: any) => {
        setSelectValues(e.value);
    };

    const onSubmit: SubmitHandler<FormValues> = data => {
        // @change-request move base url path for backend to .env/config file
        // @change-request move request to separate file 
        const url= "http://localhost:62000/api/v1/createTask";
        const query = {
            taskType: selectValues,
            taskName: data.taskName,
            taskProgress: 'initial',
            initiatedByUserId: user.id
        };

        
        axios.post(url, query)
            .then(result => {
                if (result.status === 201) {
                    // @change-request make enum/const with all routes
                    navigate('/tasks');
                }
            })
            .catch(err => {
                console.log(err);
            });
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
                    <Button label="Submit" className="p-button-danger" disabled={false} />
                        {/* <input className="btn btn-danger" type="submit" value="Create Task" /> */}
                    </Col>
                </Row>
            </Container>
        </form>
    );
}

export default CreateTaskGroup;
