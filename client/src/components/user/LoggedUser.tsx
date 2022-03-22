import React, { useState } from 'react';
import AxiosRequester from '../functions/axiosRequester';
import { Button } from 'primereact/button';

const ShowUsersList = () => {

    const [user, setUser] = useState(Object)

    AxiosRequester(user, setUser, "http://localhost:62000/api/v1/users/3");

        if (user.deletedAt) {
            return <Button icon="pi pi-user" className="p-button-rounded p-button-info" disabled />
        } else {
            return <Button icon="pi pi-user" className="p-button-rounded p-button-info" />
        }
}

export default ShowUsersList;
