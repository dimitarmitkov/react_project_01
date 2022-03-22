import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersCard from './UsersCard';
import { JsxElement } from 'typescript';



const ShowUsersList = () => {

    const [users, setUsers] = useState([])

    function getEvents() {
        axios.get("http://localhost:62000/api/v1/users")
            .then(response => setUsers(response.data))
            .catch(err => {
                console.log('Error from ShowTasksList');
            });
    }

    useEffect(() => {
        getEvents()
    }, []);

    let usersList = () => {
        if (!users) {
            return "there is no user record!";
        }
        return users.map((user: JsxElement, k: number) =>
            <UsersCard user={user} key={k} />);
    }

    return (
        <div className="ShowUsersList">
            <div className="list">
                {usersList()}
            </div>
        </div>
    );
}

export default ShowUsersList;
