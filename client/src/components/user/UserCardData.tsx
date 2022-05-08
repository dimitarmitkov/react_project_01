import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useCurrentLoggedUser from '../functions/currentLoggedUser';
import { useNavigate } from 'react-router-dom';
import useCurrentUserCardData from './currentUserData';
import UserElement from './UserCardDataMain';
import axiosFunction from '../functions/axiosFunctions';
import ErrorComponent from '../error/ErrorComponent';
import { valuesLinks } from '../../enumerators';

interface PropsUser {
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

interface PropsCurrentUser {
    id?: string;
    role?: string;
    userName?: string;
};

interface OnImageChangeProps extends Blob {
    name:string;
}; 

const UserCard = () => {

    const [changePasswordSelected, setChangePasswordSelected] = useState(false);
    const { register, watch, formState: { errors }, handleSubmit } = useForm<FormValues>();
    const [passwordValue, setPasswordValue] = useState('');
    const [currentUserPicture, setCurrentUserPicture] = useState('');
    const [srcPicture, setSrcPicture] = useState<string | ArrayBuffer | null>(null);
    const [pictureName, setPictureName] = useState<string | null>(null);
    const [pictureType, setPictureType] = useState<string | null>(null);
    const navigate = useNavigate();
    const [hasError, setHasError] = useState(false);
    const { id } = useParams();
    const user: PropsUser = useCurrentUserCardData(id);

    const currentUser : PropsCurrentUser = useCurrentLoggedUser()!;


    const onImageChange = (props: OnImageChangeProps) => {

        let reader = new FileReader();
        reader.readAsDataURL(props);
        reader.onload = () => {

            try {
                setSrcPicture(reader.result);
                setPictureName(props.name);
                setPictureType(props.type);
            } catch (error) {
                setHasError(true);
            }
        };

        try {
            setCurrentUserPicture(props.name);
        } catch (error) {
            setHasError(true);
        }
    }

    useEffect(() => {
        const element = document.getElementById('user-picture') as HTMLImageElement;
        element.src = `${srcPicture}`;
    }, [srcPicture]);

    const editUserRoute = () => {

        navigate(valuesLinks.Users);
    }

    const currentUserId = currentUser ? currentUser.id : '';

    const allowPasswordChange = id == currentUserId ? true : false;

    const onSubmit: SubmitHandler<FormValues> = async data => {

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

            await axiosFunction(valuesLinks.UsersEdit, queryDataPassword, 'post', 200);
        }

        if (currentUserPicture.length > 0) {

            const queryDataPicture = {
                userId: user.id,
                userName: user.firstName,
                picture: srcPicture,
                picName: pictureName,
                picType: pictureType
            };

            await axiosFunction(valuesLinks.PhotosUpload, queryDataPicture, 'post', 201);
        }
    };

    if (!hasError) {

        return (
            <>
                {UserElement(user, handleSubmit, onSubmit, onImageChange, allowPasswordChange, changePasswordSelected, setChangePasswordSelected, passwordValue,
                    setPasswordValue, errors, currentUserPicture, editUserRoute)}
            </>
        );
    } else {
       return <ErrorComponent />
    }
}

export default UserCard;
