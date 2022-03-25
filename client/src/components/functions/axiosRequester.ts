import React, { useEffect } from 'react';
import axios from 'axios';
import capitalizeFirstLetter from './capitalizeFirstLetter';
import { urlToHttpOptions } from 'url';

const AxiosRequester = (getImportedValue: never[], setImportedValue: React.Dispatch<React.SetStateAction<never[]>>, url: string) => {
    function axiosFunction() {
        // debugger;
        axios.get(url, {withCredentials: true})
            .then(response => setImportedValue(response.data))
            .catch(err => {
                console.log('Error from Show List: ', err);
            });

        // const headers = { 'Content-Type': 'application/json' };

        // fetch(url, { headers })
        //     .then(res => res.json())
        //     .then(response => 
        //         // console.log(response)
        //         // setImportedValue(response.data)
        //         setImportedValue(response)
        //     )
        //     .catch(err => {
        //         console.log(err);
        //     });

    }

    return useEffect(() => {
        axiosFunction()
    }, []);

}

export default AxiosRequester;