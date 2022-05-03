import React, { useEffect } from 'react';
import axios from 'axios';
// @change-request is this used anywhere ?
const AxiosRequester = (setImportedValue: React.Dispatch<React.SetStateAction<never[]>>, url: string) => {
    function axiosFunction() {
        
        axios.get(url, {withCredentials: true})
            .then(response => setImportedValue(response.data))
            .catch(err => {
                console.log('Error from Show List: ', err);
            });
    }

    return useEffect(() => {
        axiosFunction()
    }, []);

}

export default AxiosRequester;