import axios from "axios";
import { useEffect, useState } from "react";

const CurrentUserCardData = (id: string | undefined) => {

    const [currentUserCardData, setCurrentUserCardData] = useState({});

    const getUser = () => {

        const urlUser = "http://localhost:62000/api/v1/users";
        const queryData = { id: id };
        const headersData = { 'Content-Type': 'application/json' };

        axios.post(urlUser, queryData, { headers: headersData })
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
