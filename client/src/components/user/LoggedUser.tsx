import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import axios from 'axios';

const LoggedUser = () => {

    const [user, setUser] = useState(Object)

        const url = "http://localhost:62000/api/v1/currentLoggedUser";

        function axiosFunction() {
            axios.get(url, {withCredentials: true})
                .then(response => setUser(response.data))
                .catch(err => {
                    console.log('Error from Show List: ', err);
                });
        }
    
        useEffect(() => {
            axiosFunction()
        }, []);


        if (user.deletedAt) {
            return <Button icon="pi pi-user" className="p-button-rounded p-button-info" disabled />
        } else {
            return (<div>
                <Button icon="pi pi-user" className="p-button-rounded p-button-info" /> 
                <div>{user.userName}</div>
                </div> 
                
                )
        }
}

export default LoggedUser;
