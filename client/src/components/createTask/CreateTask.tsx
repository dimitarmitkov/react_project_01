import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from "axios";
import CurrentLoggedUser from '../functions/currentLoggedUser';
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

    CurrentLoggedUser(setUser);
    const navigate = useNavigate();

    const taskTypeArray = [{ name: 'Project', value: 'project' }, { name: 'Meeting', value: 'meeting' }];

    const onTypeSelectorChange = (e: any) => {
        setSelectValues(e.value);
    };

    const onSubmit: SubmitHandler<FormValues> = data => {

        axios.post("http://localhost:62000/api/v1/createTask",
            {
                taskType: selectValues,
                taskName: data.taskName,
                taskProgress: 'initial',
                initiatedByUserId: user.id
            })
            .then(result => {
                if (result.status === 201) {
                    navigate('/tasks');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className="grid">

                    <div className="row mb-3">
                        <div className="col-3"></div>
                        <div className="col-3">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-envelope"></i>
                                </span>
                                <Dropdown id={'dropDownButton'} value={selectValues} options={taskTypeArray} onChange={onTypeSelectorChange} optionLabel="name" placeholder="Select Type" editable />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-3"></div>
                        <div className="col-3">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-envelope"></i>
                                </span>
                                <InputText placeholder="Task Name" {...register("taskName")} />
                                {/* <InputText placeholder="User current" {...register("initiatedByUserId")} type="hidden" value={user.id}/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-3"></div>
                <div className="col-3">
                    <input className="btn btn-danger" type="submit" value="Create Task" />
                </div>
            </div>
        </form>
    );
}

export default CreateTaskGroup;
