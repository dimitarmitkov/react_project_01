import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const UsersCard = (props: any) => {
    const  user  = props.user;

    return(
        <div className="card-container" key={user.id+5+'userId'}>
            <div className="desc">
                <h2>
                    <Link to={`/users/${user.id}`}>
                        { user.firstName }
                    </Link>
                </h2>
                <h5>{user.email}</h5>
                <span>{user.role}_</span>
                <span>{user.id}</span>
            </div>
        </div>
    )
};

export default UsersCard;