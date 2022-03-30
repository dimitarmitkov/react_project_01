import React from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import '../App.css';
import EditUserGroup  from './user/EditUser';
import Hello from './test_components/HelloWorld';
import { useNavigate } from "react-router-dom";

const UsersCard = (props: any) => {
    const user = props.user;

const navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/edituser/${user.id}`; 
        navigate(path);
      }

    const axiosPost = () => {


        axios.get(`http://localhost:62000/api/v1/usersEdit/${user.id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);

            });
    }

    return (
        <div className="card-container" key={user.id + 5 + 'userId'}>
            <div className="desc">
                <h2>
                    <Link to={`/users/${user.id}`}>
                        {user.firstName}
                    </Link>
                </h2>
                <h5>{user.email}</h5>
                <span>{user.role}_</span>
                <span>{user.id}</span>
                <Button label="Edit User" className="p-button-danger" onClick={routeChange} />
                {/* <Link to={`/edituser/${user.id}`} className="p-button-danger">Edit User {user.id}</Link> */}
            </div>
        </div>
    )
};

export default UsersCard;