import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersCard from './UsersCard';
import { JsxElement } from 'typescript';
import AxiosRequester from './functions/axiosRequester';


const ShowUsersList = () => {

    const [users, setUsers] = useState([]);

    AxiosRequester(users, setUsers, "http://localhost:62000/api/v1/users");

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
