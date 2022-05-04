import axios from 'axios';
import { useEffect, useState } from 'react';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const CurrentLoggedUser = () => {

    const [user, setUser] = useState();
    
    const url = SERVER_URL+"/currentLoggedUser";
    
    function axiosFunction() {

        axios.get(url, {withCredentials: true})
            .then(response => {

                setUser(response.data)})
            .catch(err => {
                console.log('No user logged');
            });
    }

    useEffect(() => {
        axiosFunction()
    }, []);

    return user;
}

export default CurrentLoggedUser;
    