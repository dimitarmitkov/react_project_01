import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const UsersCard = (props: any) => {
    const  user  = props.user;

    return(
        <div className="card-container">
            {/* <img src="https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" alt="" /> */}
            <div className="desc">
                <h2>
                    <Link to={`/users/${user.id}`}>
                        { user.firstName }
                    </Link>
                </h2>
                {/* <h3>{user.firstName}</h3> */}
                <h5>{user.email}</h5>
                <span>{user.role}_</span>
                <span>{user.id}</span>
            </div>
        </div>
    )
};

export default UsersCard;