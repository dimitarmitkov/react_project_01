import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentLoggedUser from '../functions/currentLoggedUser';
import CurrentUserCardData from './currentUserData';
import UserElement from './UserCardDataMain';
import './userCard.css';
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

    const { id } = useParams();
    const user: MyObj = CurrentUserCardData(id);

    const onImageChange = (props: any) => {

        const reader = new FileReader();
        reader.readAsDataURL(props);
        reader.onload = () => {

            setSrcPicture(reader.result);
            setPictureName(props.name);
            setPictureType(props.type);
        };

        setCurrentUserPicture(props.name);
    }

    useEffect(() => {
        const element = document.getElementById('user-picture') as HTMLImageElement;
        element.src = `${srcPicture}`;
    }, [srcPicture]);


    const editUserRoute = () => {

        const path = `/users`;
        navigate(path);
    }

    const allowPasswordChange = id == currentUser.id ? true : false;

    const onSubmit: SubmitHandler<FormValues> = async () => {

        if (changePasswordSelected) {

            const queryDataPassword = {
                email: user.email,
                insertPassword: passwordValue ? passwordValue : null,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                picture: user.picture,
                id: user.id,
            };

            await axiosFunction('currentUserCurrentPassword', queryDataPassword);
        }

        if (currentUserPicture.length > 0) {
            
            const queryDataPicture = {
                userId: user.id,
                userName: user.firstName,
                picture: srcPicture,
                picName: pictureName,
                picType: pictureType
            };

            await axiosFunction('currentUserCurrentPicture', queryDataPicture);
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
