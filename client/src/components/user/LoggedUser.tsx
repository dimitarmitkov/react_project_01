import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';

const ShowUsersList = () => {

    const [user, setUser] = useState(Object)

    function getEvents() {
        axios.get("http://localhost:62000/api/v1/users/3")
            .then(response => setUser(response.data))
            .catch(err => {
                console.log('Error from ShowTasksList');
            });
    }

    useEffect(() => {
        getEvents()
    }, []);

        if (user.deletedAt) {
            return <Button icon="pi pi-user" className="p-button-rounded p-button-info" disabled />
        } else {
            return <Button icon="pi pi-user" className="p-button-rounded p-button-info" />
        }
}

export default ShowUsersList;
