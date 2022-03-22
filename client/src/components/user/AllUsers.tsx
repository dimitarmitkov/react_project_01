import React, { useState } from 'react';
import UsersCard from '../UsersCard';
import AxiosRequester from '../functions/axiosRequester';
import { JsxElement } from 'typescript';

const AllUsers = () => {

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
        <div >
                {usersList()}
        </div>
    );
}

export default AllUsers;
