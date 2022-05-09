import axios from 'axios';
import { useEffect, useState } from 'react';
import { valuesLinks } from '../enumerators';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

interface CurrentUserProps {
    id?: number;
    role?: string;
    userName?: string;
};

const useCurrentLoggedUser = () => {

    const [user, setUser] = useState<CurrentUserProps>();
    const [hasError, setHasError] = useState<boolean>();

    const url = SERVER_URL + valuesLinks.CurrentLoggedUser;

    function axiosFunction() {

        axios.get(url, { withCredentials: true })
            .then(response => {

                setUser(response.data);
                setHasError(false);
            })
            .catch(err => {
                console.log('No user logged');
                setHasError(true);
            });
    }

    useEffect(() => {
        axiosFunction();
    }, [hasError]);

    if (!user && window.location.pathname !== '/login') {
        axiosFunction();
      }

    return user!;
}

export default useCurrentLoggedUser;
