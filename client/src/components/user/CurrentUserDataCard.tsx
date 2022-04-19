import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentLoggedUser from '../functions/currentLoggedUser';
import CurrentUserCardData from './currentUserData';
import UserElement from './UserCardDataMain';
import axiosFunction from '../functions/axiosFunctions';
import axios from "axios";
import './userCard.css';

interface MyObj {
    [propName: string]: string;
};

type FormValues = {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    picture: string;
};

const CurrentUserCard = () => {
    const [currentUser, setCurrentUser] = useState(Object);
    const [changePasswordSelected, setChangePasswordSelected] = useState(false);
    const { register, watch, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [passwordValue, setPasswordValue] = useState('');
    const [currentUserPicture, setCurrentUserPicture] = useState('');
    const [srcPicture, setSrcPicture] = useState<any | null>(null);
    const [pictureName, setPictureName] = useState<any | null>(null);
    const [pictureType, setPictureType] = useState<any | null>(null);
    const navigate = useNavigate();

    CurrentLoggedUser(setCurrentUser);

    let { id } = useParams();
    let user: MyObj = CurrentUserCardData(id);

    const onImageChange = (props: any) => {

        let reader = new FileReader();
        reader.readAsDataURL(props);
        reader.onload = () => {

            setSrcPicture(reader.result);
            setPictureName(props.name);
            setPictureType(props.type);
        };

        setCurrentUserPicture(props.name);
    }

    useEffect(()=>{
        let element = document.getElementById('user-picture') as HTMLImageElement;
         element.src=`${srcPicture}`;
    },[srcPicture]);
    

    const editUserRoute = () => {

        let path = `/users`;
        navigate(path);
    }

        const allowPasswordChange = id == currentUser.id ? true : false;
        const onSubmit: SubmitHandler<FormValues> = () => {

           

            if (changePasswordSelected) {

                const urlPassword = "http://localhost:62000/api/v1/usersEdit";
                const queryDataPassword = {
                    email: user.email,
                    insertPassword: passwordValue ? passwordValue : null,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    picture: user.picture,
                    id: user.id,
                };

                axios.post(urlPassword, queryDataPassword)
                    .then(response => {
                        if (response.status === 200) {
                            const button = document.getElementById('submit-changes-button') as HTMLElement;
                            const checkElement = document.getElementById('password-checkbox') as HTMLElement;
                            const passwordField = document.getElementById('password-input-field') as HTMLElement;

                            button.className = 'p-button-primary-hidden';
                            checkElement.classList.add('d-none');
                            passwordField.classList.add('d-none');

                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

            if (currentUserPicture.length > 0) {

                const urlPicture = "http://localhost:62000/api/v1/photos/upload";
                const queryDataPicture = {
                    userId: user.id,
                    userName: user.firstName,
                    picture: srcPicture,
                    picName: pictureName,
                    picType: pictureType
                };

                    axios.post(urlPicture, queryDataPicture)
                    .then(response => {
                        if (response.status === 201) {
                            const button = document.getElementById('submit-changes-button') as HTMLElement;

                            button.className = 'p-button-primary-hidden';
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        };

        return (
            <>
                {UserElement(user, handleSubmit, onSubmit, onImageChange, allowPasswordChange, changePasswordSelected, setChangePasswordSelected, passwordValue,
                    setPasswordValue, errors, currentUserPicture, editUserRoute)}
            </>
        )
}

export default CurrentUserCard;
