import axios from 'axios';
import { useEffect, useState } from 'react';

const CurrentLoggedUser = () => {

    const [user, setUser] = useState();
    
    const url = "http://localhost:62000/api/v1/currentLoggedUser";
    
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
    