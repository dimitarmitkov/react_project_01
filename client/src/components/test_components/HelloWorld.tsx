import { useState } from "react";
import CurrentLoggedUser from '../functions/currentLoggedUser';

const Hello = () => {

    const [user, setUser] = useState(Object);

    CurrentLoggedUser(setUser);
  
    if (Object.keys(user).length > 0) {

        return <h1>Hello, {user.userName}</h1>
    } else {
        return null;
    }
}

export default Hello;
