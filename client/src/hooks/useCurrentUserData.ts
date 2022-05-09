import axios from 'axios';
import { useEffect, useState } from 'react';
import { valuesLinks } from '../enumerators';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const useCurrentUserCardData = (id: string | undefined) => {

    const [currentUserCardData, setCurrentUserCardData] = useState({});

    const getUser = () => {

        const urlUser = SERVER_URL + valuesLinks.Users;
        const queryData = { id: id };
        const headersData = { 'Content-Type': 'application/json' };

        axios.post(urlUser, queryData, { headers: headersData })
            .then(result => {
                setCurrentUserCardData(result.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getUser();
    }, []);

    return currentUserCardData;
}

export default useCurrentUserCardData;
