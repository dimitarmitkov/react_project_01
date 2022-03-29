import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from "axios";


type FormValues = {
    taskType: string;
    taskName: string;
    taskProgress: string;
};

const CreateTaskGroup = () => {

    const { register, handleSubmit } = useForm<FormValues>();
    const [selectValues, setSelectValues] = useState(undefined);

    const taskTypeArray = [{ name: 'Project', value: 'project' }, { name: 'Meeting', value: 'meeting' }];

    const onTypeSelectorChange = (e: any) => {
        setSelectValues(e.value);
    }

    const onSubmit: SubmitHandler<FormValues> = data => {

        console.log(selectValues);
        console.log(data.taskName);

        axios.post("http://localhost:62000/api/v1/createTask",
            {
                taskType: selectValues,
                taskName: data.taskName,
                taskProgress: 'initial'
            })
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    window.location.href = '/';
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
