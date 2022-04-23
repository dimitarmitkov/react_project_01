import axios from 'axios';
import { useEffect } from 'react';

const CurrentLoggedUser = (setImportedValue: React.Dispatch<React.SetStateAction<never[]>>) => {
    
    const url = "http://localhost:62000/api/v1/currentLoggedUser";
    
    function axiosFunction() {

        axios.get(url, {withCredentials: true})
            .then(response => {

                setImportedValue(response.data)})
            .catch(err => {
                console.log('Error from Show List: ', err);
            });
    }

    return useEffect(() => {
        axiosFunction()
    }, []);
}

export default CurrentLoggedUser;
    