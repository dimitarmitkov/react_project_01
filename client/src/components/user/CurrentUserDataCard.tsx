import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Image, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Checkbox } from 'primereact/checkbox';
import { useNavigate } from "react-router-dom";
import CurrentLoggedUser from '../functions/currentLoggedUser';

interface MyObj {
    [propName: string]: string;
};

interface Setter {
    type: string;
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

const CurrentUserCardData = () => {
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

                setUser(result.data);
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getUser();
    }, []);

    return user;
}

const CurrentUserCard = () => {
    const [currentUser, setCurrentUser] = useState(Object);

    CurrentLoggedUser(setCurrentUser);

    const [changePasswordSelected, setChangePasswordSelected] = useState(false);
    const { register, watch, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [passwordValue, setPasswordValue] = useState('');
    const [currentUserPicture, setCurrentUserPicture] = useState('');
    // const [srcPicture, setSrcPicture] = useState<Setter>();
    const [srcPicture, setSrcPicture] = useState<any | null >(null);
    const navigate = useNavigate();
    let { id } = useParams();
    let user: MyObj = CurrentUserCardData();

    const onImageChange = (props: any) => {

        let reader = new FileReader();
        reader.readAsDataURL(props);
        reader.onload = () => {

            reader ? setSrcPicture(reader.result) : setSrcPicture(user.picture);
            console.log(reader.result);

        };
        
        setCurrentUserPicture(props.name);
    }

    const editUserRoute = () => {

        let path = `/users`;
        navigate(path);
    }

    if (Object.keys(user).length > 0) {



        const allowPasswordChange = id == currentUser.id ? true : false;
        let userPicture = user.picture;

        const onSubmit: SubmitHandler<FormValues> = data => {

            // axios.post("http://localhost:62000/api/v1/photos/upload",
            axios.post("http://localhost:62000/api/v1/usersEdit",
                {
                    email: user.email,
                    insertPassword: passwordValue ? passwordValue : null,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    picture: currentUserPicture,
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
                <Container >
                    <Row className="mt-3">
                        <Row>
                            <Col sm={2} className="border rounded">
                                <Image fluid src={require(`../../public/images/${userPicture}`)} alt="pic" />
                                {/* <Image id='profilePicture' fluid src={srcPicture} alt="pic" /> */}
                                {/* <Image id='profilePicture' fluid src={currentUserPicture} alt="pic" /> */}
                            </Col>
                            <Col sm={3} className="ml-3">
                                <Row>
                                    <h3>{user.firstName ? user.firstName : null} {user.lastName ? user.lastName : null}</h3>
                                </Row>
                                <Row>
                                    <h5>role: {user.role}</h5>
                                </Row>
                                <Row>
                                    <h5>email: {user.email}</h5>
                                </Row>
                            </Col>
                            <Col sm={3} className="text-end">
                            </Col>
                        </Row>

                        <Row className="mt-3">

                            <Col sm={12}>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <Row>
                                        <Col sm={5}>
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
                                                <Form.Control type="file" name="avatar" accept="image/png, image/jpeg" onChange={(e: React.ChangeEvent) => {
                                                    const targetEl = e.target as HTMLInputElement;
                                                    let file: any = targetEl.files![0];
                                                    console.log(file.name);
                                                    // console.log(file);
                                                    // console.log(file.mozFullPath);
                                                    onImageChange(file);

                                                    let reader = new FileReader();


                                                    reader.readAsDataURL(file);
                                                    reader.onload = () => {
                                                        // this.setState({
                                                        //     imgUpload: reader.result
                                                        // })

                                                        console.log(reader);

                                                    };

                                                    // reader.addEventListener("load", function () {
                                                    //     // convert image file to base64 string
                                                    //     console.log(reader.result);
                                                    //   }, false);

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
                                        <Row className="mt-3" >
                                            <Col sm={5}>
                                                <div className="p-inputgroup">
                                                    <span className="p-inputgroup-addon">
                                                        <i className="pi pi-shield"></i>
                                                    </span>
                                                    <Password defaultValue={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} toggleMask />
                                                </div>
                                                {errors.password && <span className="error-message" role="alert">{errors.password.message}</span>}
                                            </Col>
                                        </Row>
                                        : ''}

                                    <Row className="mt-3 mb-3 justify-content-md-center">
                                        <Col>
                                            {changePasswordSelected || currentUserPicture.length > 0 ?
                                                <Button label={changePasswordSelected && currentUserPicture.length > 0 ? "Submit changes" : changePasswordSelected ? "Change password" : "Change picture"}
                                                    className="p-button-primary" disabled={false} /> : null}
                                        </Col>
                                    </Row>
                                </form >
                                <Row className="mt-3 mb-3 justify-content-md-center">
                                    <Col>
                                        <Button label="Back to users" className="p-button-primary" disabled={false} onClick={editUserRoute} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                </Container>
            </>
        )
    } else {
        return null
    }
}

export default CurrentUserCard;