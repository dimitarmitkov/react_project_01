import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import axios from "axios";
import { Link } from "react-router-dom";


type FormValues = {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    picture: string;
};

const LoginGroup = () => {

    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = data => {

        console.log(data.email);
        console.log(data.password);

        axios.post("http://localhost:62000/api/v1/createUser",
            {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role ? data.role : "user",
                picture: data.picture ? data.picture : ""
            })
            .then(res => {
                console.log(res);
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
                                <InputText placeholder="First Name" {...register("firstName")} />
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
                                <InputText placeholder="Last Name" {...register("lastName")} />
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
                                <InputText placeholder="Email" {...register("email")} />
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
                                <InputText placeholder="Role" {...register("role")} />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-3"></div>

                        <div className="col-3">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-shield"></i>
                                </span>
                                <InputText type={'password'} placeholder="Password" {...register("password")} />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="row mb-3">

                <div className="col-3"></div>
                <div className="col-3">
                    <input className="btn btn-danger" type="submit" />
                    <div className="mt-2">If you don't have an account please <Link to={`/input`} className="active-task-link">SignIn</Link></div>

                </div>
            </div>

        </form>
    );
}

export default LoginGroup;
