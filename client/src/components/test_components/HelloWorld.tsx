import axios from "axios";
import { useEffect, useState } from "react";
import AxiosRequester from "../functions/axiosRequester";
import CurrentLoggedUser from '../functions/currentLoggedUser';



const Hello = () => {
    // debugger;
    // const [user, setUser] = useState([]);

    //     const url = "http://localhost:62000/api/v1/currentLoggedUser";


    //     function axiosFunction() {
    //         axios.get(url, {withCredentials: true})
    //             .then(response => setUser(response.data.userName))
    //             .catch(err => {
    //                 console.log('Error from Show List: ', err);
    //             });
    //     }

    //     useEffect(() => {
    //         axiosFunction()
    //     }, []);

    const [user, setUser] = useState(Object);

    CurrentLoggedUser(setUser);
  
    if (Object.keys(user).length > 0) {

        return <h1>Hello, {user.userName}</h1>
    } else {
        return null;
    }
}

export default Hello;
