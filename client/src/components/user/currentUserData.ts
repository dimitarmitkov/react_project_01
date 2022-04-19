import axios from "axios";
import { useEffect, useState } from "react";


const CurrentUserCardData = (id:string | undefined) => {
    
    const [currentUserCardData, setCurrentUserCardData] = useState({});

    const getUser = () => {

        const urlUser = "http://localhost:62000/api/v1/users";

        axios.post(urlUser,
            {
                id: id
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(result => {
                setCurrentUserCardData(result.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getUser();
    }, []);

    return currentUserCardData;
}

export default CurrentUserCardData;