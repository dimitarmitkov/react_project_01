import axios from "axios";
import { useEffect, useState } from "react";
import AxiosRequester from "../functions/axiosRequester";


const Hello = () => {
// debugger;
    const [user, setUser] = useState([]);

        const url = "http://localhost:62000/api/v1/currentLoggedUser";
        

        function axiosFunction() {
            axios.get(url, {withCredentials: true})
                .then(response => setUser(response.data.userName))
                .catch(err => {
                    console.log('Error from Show List: ', err);
                });
        }
    
        useEffect(() => {
            axiosFunction()
        }, []);

        

        

    return <h1>Hello World!, {user} </h1>
}

export default Hello;
