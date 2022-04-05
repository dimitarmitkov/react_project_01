import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Container, Image, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Checkbox } from 'primereact/checkbox';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { readFile } from "fs";

interface MyObj {
    [propName: string]: string;
};

interface HTMLProps<T> {
    webkitdirectory?:string;
}    

interface SelectProtected {
    readonly inputElement: HTMLInputElement;
}

type FormValues = {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    picture: string;
};

const UserCardData = () => {
    let { id } = useParams();
    const [user, setUser] = useState({});

    const getUser = () => {
        axios.post("http://localhost:62000/api/v1/users",
            {
                id: id
            }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                // console.log(result.data);

                setUser(result.data);
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getUser();
    }, []);

    return user;
}


const UserCard = () => {

    const [currentUser, setCurrentUser] = useState(Object);

    CurrentLoggedUser(setCurrentUser);

    const [changePasswordSelected, setChangePasswordSelected] = useState(false);
    const { register, watch, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [passwordValue, setPasswordValue] = useState('');
    let { id } = useParams();
    let user: MyObj = UserCardData();


    const onImageChange = (props: any) => {
        console.log(props);

    }

    if (Object.keys(user).length > 0) {

        const allowPasswordChange = id == currentUser.id ? true : false;
        const userPicture = user.picture;

        const onSubmit: SubmitHandler<FormValues> = data => {

            axios.post("http://localhost:62000/api/v1/usersEdit",
                {
                    email: user.email,
                    insertPassword: passwordValue ? passwordValue : null,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    picture: user.picture,
                    id: user.id
                })
                .then(res => {
                    if (res.status === 200) {
                        window.location.reload();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        };

        return (
            <>
                <Container>
                    <Row className="mt-3 justify-content-md-center">
                        <Col sm={6}>
                            <h3>{user.firstName ? user.firstName : null} {user.lastName ? user.lastName : null}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <Image fluid src={require(`../../public/images/${userPicture}`)} alt="pic" />
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col sm={12}>
                            <Row className="mt-3">
                                <Col sm={3}>
                                    <h5>role: {user.role}</h5>
                                </Col>
                                <Col sm={3} className="text-end">
                                    <h5>email: {user.email}</h5>
                                </Col>
                            </Row>

                        </Col>
                        <Col sm={3}>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <Row>
                                    <Col sm={6}>
                                        {/* <input
                                            type="file"
                                            name="myImage"
                                            onChange={(event) => {
                                                  console.log(event.target.files[0]);
                                                  setSelectedImage(event.target.files[0]);
                                            }}
                                        /> */}

                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Please select picture file</Form.Label>
                                            {/* <Form.Control type="file" accept="image/png, image/jpeg" onChange={(e: React.ChangeEvent) => {
                                                const target= e.target as HTMLInputElement;
                                                let file : any = target.files[0]; 
                                                    console.log(file.name);
                                                    
                                            }} /> */}
                                            <Form.Control type="file" accept="image/png, image/jpeg" onChange={(e: React.ChangeEvent) => {
                                                const targetEl = e.target as HTMLInputElement;
                                                let file: any = targetEl.files![0]; 
                                                    console.log(file.name);
                                                    console.log(file);
                                                    
                                            }} />
                                            {/* <input type="file" id="filepicker" name="fileList" webkitdirectory multiple /> */}
                                        </Form.Group>

                                    </Col>
                                </Row>

                                <Row className="mt-3 justify-content-md-center">
                                    {allowPasswordChange ?
                                        <Col>
                                            <div className="p-inputgroup">
                                                <div className="field-checkbox">
                                                    <Checkbox inputId="passwordChecker" checked={changePasswordSelected} onChange={e => setChangePasswordSelected(e.checked)} />
                                                </div>
                                                <div className="field-checkbox-label">
                                                    <label htmlFor="passwordChecker">{changePasswordSelected ? 'Change password selected' : 'Change password?'}</label>

                                                </div>
                                            </div>
                                        </Col>
                                        : null}
                                </Row>
                                {changePasswordSelected ?
                                    <>
                                        <Row className="mt-3 justify-content-md-center" >
                                            <Col>
                                                <div className="p-inputgroup">
                                                    <span className="p-inputgroup-addon">
                                                        <i className="pi pi-shield"></i>
                                                    </span>
                                                    <Password defaultValue={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} toggleMask />
                                                </div>
                                                {errors.password && <span className="error-message" role="alert">{errors.password.message}</span>}
                                            </Col>
                                        </Row>

                                        <Row className="mt-3 mb-3 justify-content-md-center">
                                            <Col>
                                                <Button label="Change password" className="p-button-primary" disabled={false} />
                                            </Col>
                                        </Row>
                                    </>
                                    : ''}
                            </form >
                        </Col>

                    </Row>
                </Container>
            </>
        )
    } else {
        return null
    }
}

export default UserCard;