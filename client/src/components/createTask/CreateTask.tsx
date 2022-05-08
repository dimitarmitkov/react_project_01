import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { Button } from "primereact/button";
import ErrorComponent from '../error/ErrorComponent';
import { valuesProgress, valuesTaskType, valuesLinks } from '../../enumerators';
import axiosFunction from '../functions/axiosFunctions';

type FormValuesProps = {
    taskType: string;
    taskName: string;
    taskProgress: string;
    initiatedByUserId: string;
};

interface CurrentUserProps {
    id?: number;
    role?: string;
    userName?: string;
};

interface OnValuesChangeProps {
    target: {
        value: React.SetStateAction<undefined>;
    };
};

const CreateTaskGroup = () => {

    const { register, handleSubmit } = useForm<FormValuesProps>();
    const [selectValues, setSelectValues] = useState(undefined);
    const [hasError, setHasError] = useState(false);

    const user: CurrentUserProps = CurrentLoggedUser()!;
    const nameValues = Object.keys(valuesTaskType);


    const taskTypeArray = [
        { name: nameValues.shift(), value: valuesTaskType.Project },
        { name: nameValues[nameValues.length - 1], value: valuesTaskType.Meeting }
    ];

    const onTypeSelectorChange = (e: OnValuesChangeProps) => {

        const currentEventValue = e.target.value;

        try {
            setSelectValues(currentEventValue);
        } catch (error) {
            setHasError(true);
        }
    };

    const onSubmit: SubmitHandler<FormValuesProps> = async data => {

        const query = {
            taskType: selectValues,
            taskName: data.taskName,
            taskProgress: valuesProgress.shift(),
            initiatedByUserId: user.id
        };

        axiosFunction(valuesLinks.CreateTask, query, 'post', 201);
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
