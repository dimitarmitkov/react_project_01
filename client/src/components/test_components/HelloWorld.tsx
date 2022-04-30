import { useState } from "react";
import CurrentLoggedUser from '../functions/currentLoggedUser';
import ErrorComponent from '../error/ErrorComponent';

const Hello = () => {

    const [user, setUser] = useState(Object);
    const [hasError, setHasError] = useState(false);

    try {
        CurrentLoggedUser(setUser);
    } catch (error) {
        setHasError(true);
    }
  
    if (Object.keys(user).length > 0 && !hasError) {

        return <h1>Hello, {user.userName}</h1>
    } else {
        return <ErrorComponent/>
    }
}

export default Hello;
