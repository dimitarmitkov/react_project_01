import useCurrentLoggedUser from '../../hooks/useCurrentLoggedUser';
import useCurrentUserCardData from '../../hooks/useCurrentUserData';
import UserElement from './UserCardDataMain';
import axiosFunction from '../../utils/axiosFunctions';
import ErrorComponent from '../error/ErrorComponent';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { valuesLinks } from '../../enumerators';
import './userCard.css';

interface UserProps {
    [propName: string]: string;
};

interface CurrentUserProps {
    id?: number;
    role?: string;
    userName?: string;
};

type FormValuesProps = {
    firstName: string;
    userName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    picture: string;
};

const CurrentUserCard = () => {

    const [changePasswordSelected, setChangePasswordSelected] = useState(false);
    const { register, watch, formState: { errors }, handleSubmit } = useForm<FormValuesProps>();
    const [passwordValue, setPasswordValue] = useState('');
    const [currentUserPicture, setCurrentUserPicture] = useState('');
    const [srcPicture, setSrcPicture] = useState<string | ArrayBuffer | null>(null);
    const [pictureName, setPictureName] = useState<string | null>(null);
    const [pictureType, setPictureType] = useState<string | null>(null);
    const navigate = useNavigate();
    const [hasError, setHasError] = useState(false);
    const { id } = useParams();
    const user: UserProps = useCurrentUserCardData(id);

    const currentUser: CurrentUserProps = useCurrentLoggedUser()!;

    interface OnImageChangeProps extends Blob {
        name: string;
    };

    const onImageChange = (props: OnImageChangeProps) => {

        const reader = new FileReader();
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

    const onSubmit: SubmitHandler<FormValuesProps> = async () => {

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
        )
    } else {
        return <ErrorComponent />
    }
}

export default CurrentUserCard;
