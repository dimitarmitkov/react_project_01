import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosFunction = async (requestLocation: string, query: {}, action: string, resultValue: number) => {

    toast.configure();
    const toastMessage = 'Something went wrong, you are not allowed.';
    let url: string = '';


    if (requestLocation === 'currentUserCurrentPicture') {

        url = "http://localhost:62000/api/v1/photos/upload";
    }

    if (requestLocation === 'currentUserCurrentPassword') {

        url = "http://localhost:62000/api/v1/usersEdit";
    }


    if (requestLocation === 'editUser') {

        url = "http://localhost:62000/api/v1/usersEdit";
    }

    if (requestLocation === 'modalDeleteUser') {

        url = "http://localhost:62000/api/v1/usersDelete";
    }

    const result = await axios.post(url, query);

    if (result.status === resultValue) {

        window.location.reload();
    } else {

        toast(toastMessage);
    }
}

export default axiosFunction;
