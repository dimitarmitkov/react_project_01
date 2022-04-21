import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosFunction = async (requestLocation: string, query: {}) => {

    toast.configure();
    const toastMessage = 'Something went wrong, you are not allowed.';

    if (requestLocation === 'currentUserCurrentPicture') {

        const url = "http://localhost:62000/api/v1/photos/upload";
        const result = await axios.post(url, query)
        if (result.status === 201) {

            window.location.reload();
        } else {

            toast(toastMessage);
        }
    }

    if (requestLocation === 'currentUserCurrentPassword') {

        const urlPassword = "http://localhost:62000/api/v1/usersEdit";

        const result = await axios.post(urlPassword, query);

        if (result.status === 200) {

            window.location.reload();
        } else {

            toast(toastMessage);
        }
    }
    
    
    if (requestLocation === 'editUser') {

        const url = "http://localhost:62000/api/v1/usersEdit";

        const result = await axios.post(url, query);



        if (result.status === 200) {

            window.location.reload();
        } else {

            toast(toastMessage);
        }
    }


}



export default axiosFunction;