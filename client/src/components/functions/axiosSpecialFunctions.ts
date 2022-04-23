import axios from "axios";
import { useNavigate } from "react-router-dom";



const AxiosSpecialFunction = async (requestLocation: string, query: {}, action: string, setImportedValue: React.Dispatch<React.SetStateAction<never[]>> | undefined = undefined, wsText: string | undefined = undefined, navigateString: string | undefined = undefined) => {

    const navigate = useNavigate();
    
    if (requestLocation === 'modalDeletePatchAxios') {

        const url = "http://localhost:62000/api/v1/usertasks";

        axios.patch(url, query)
            .then(result => {

                const currentData = result.data;

                const allowedUsersList = () => (
                    currentData.map((name: any) => name.id)
                );

                if (setImportedValue) setImportedValue(allowedUsersList);
            })
            .catch(err => console.log(err));
    }

    if (requestLocation === 'createTaskPostAxios') {

        const url= "http://localhost:62000/api/v1/createTask";

        axios.post(url, query)
            .then(result => {
                if (result.status === 201 && navigateString) {
                    navigate(navigateString);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


}

export default AxiosSpecialFunction;
