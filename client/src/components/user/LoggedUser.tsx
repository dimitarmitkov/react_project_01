import React, { useState } from 'react';
import { Button } from 'primereact/button';
import CurrentLoggedUser from '../functions/currentLoggedUser';

const LoggedUser = () => {

    const [user, setUser] = useState(Object);

    CurrentLoggedUser(setUser);

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
