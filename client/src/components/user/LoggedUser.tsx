import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';




export default class LoggedUser extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:62000/api/v1/users/3')
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
            .catch(err => {
                console.log('Error from ShowTasksList');
            })
    };


    render() {

        const loggedUser = this.state.users;

        if (loggedUser.deletedAt) {
            return <Button icon="pi pi-user" className="p-button-rounded p-button-info" disabled />
        } else {
            return <Button icon="pi pi-user" className="p-button-rounded p-button-info" />
        }
    }
}
