import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import axios from "axios";
import { Link } from "react-router-dom";


type FormValues = {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
};

//  const SimpleInputForm = () => {
//   const { register, handleSubmit } = useForm<FormValues>();
//   const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("firstName")} />
//       <input {...register("lastName")} />
//       <input type="email" {...register("email")} />

//       <input type="submit" />
//     </form>
//   );
// }

const InputGroupDemo = () => {
    // const [checked1, setChecked1] = useState<boolean>(false);
    // const [checked2, setChecked2] = useState<boolean>(false);
    // const [radioValue1, setRadioValue1] = useState<string>('');
    // const [radioValue2, setRadioValue2] = useState<string>('');

    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = data => {

        console.log(data.email);
        console.log(data.password);


        const user = { insertEmail: 'connect@con.com', insertPassword: '123456' };


        // axios.post("http://localhost:62000/api/v1/userLogin", null, {
        //     params: {
        //         insertEmail: data.email,
        //         insertPassword: data.password
        //     }
        // })
        axios.post("http://localhost:62000/api/v1/userLogin",
            {
                insertEmail: data.email,
                insertPassword: data.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
              })
            .catch(err => {
                console.log(err);

            });

        // axios.get("http://localhost:62000/api/v1/authorization")
        // .then(res => {
        //     console.log(res);
        // })
        // .catch(err => {
        //     console.log(err);

        // });


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
                                <InputText placeholder="Email" {...register("email")} />
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
                    <div className="mt-2">If you don't have an account please <Link to={`/signup`} className="active-task-link">SingUp</Link></div>

                </div>
            </div>

        </form>
    );
}

export default InputGroupDemo;
