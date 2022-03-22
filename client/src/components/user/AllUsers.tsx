import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import UsersCard from '../UsersCard';


export default class AllUsers extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:62000/api/v1/users')
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

        let UsersArray: any[];
        const usersArrayFromDatabase = this.props.users;

        UsersArray = usersArrayFromDatabase.map((user: any, k: number) =>
            <UsersCard user={user} key={k} />
        );

        return <div>{UsersArray}</div>
    }
}
