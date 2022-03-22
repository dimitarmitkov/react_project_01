import React, { useEffect } from 'react';
import axios from 'axios';
import capitalizeFirstLetter from './capitalizeFirstLetter';

const AxiosRequester = (getImportedValue: never[], setImportedValue: React.Dispatch<React.SetStateAction<never[]>>, url: string) => {

    function axiosFunction() {
        axios.get(url)
            .then(response => setImportedValue(response.data))
            .catch(err => {
                console.log('Error from Show' + capitalizeFirstLetter(getImportedValue.toString()) + 'List');
            });
    }

    return useEffect(() => {
axiosFunction()
    }, []);

}

export default AxiosRequester;