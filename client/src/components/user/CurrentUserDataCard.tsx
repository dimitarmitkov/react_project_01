import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentLoggedUser from '../functions/currentLoggedUser';
import CurrentUserCardData from './currentUserData';
import UserElement from './UserCardDataMain';
import axiosFunction from '../functions/axiosFunctions';

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

    const editUserRoute = () => {

        let path = `/users`;
        navigate(path);
    }

    if (Object.keys(user).length > 0) {

        const allowPasswordChange = id == currentUser.id ? true : false;

        const onSubmit: SubmitHandler<FormValues> = data => {

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

                axiosFunction(urlPassword, queryDataPassword,'post','windowReload');
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

                axiosFunction(urlPicture, queryDataPicture,'post','windowReload');
            }
        };

        return (
            <>
            {UserElement(user, handleSubmit, onSubmit, onImageChange, allowPasswordChange, changePasswordSelected, setChangePasswordSelected, passwordValue,
            setPasswordValue, errors, currentUserPicture, editUserRoute)}
            </>
        )
    } else {
        return null
    }
}

export default CurrentUserCard;
