import axios from "axios";

const AxiosSpecialFunction = async (requestLocation: string, query: {}, action: string, setImportedValue: React.Dispatch<React.SetStateAction<never[]>> | undefined = undefined) => {

    if (requestLocation === 'modalDeletePatchAxios') {

        const url = "http://localhost:62000/api/v1/usertasks";

        axios.patch(url, query)
            .then(result => {

                const currentData = result.data;

                const allowedUsersList = () => (
                    currentData.map((name: any) => name.id)
                );
debugger;
                if (setImportedValue) setImportedValue(allowedUsersList);
            })
            .catch(err => console.log(err));
    }
}

export default AxiosSpecialFunction;
