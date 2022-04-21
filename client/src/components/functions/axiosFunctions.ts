import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosFunction = async (requestLocation: string, query: {}, action: string, resultValue: number, wsText: string | undefined = undefined) => {

    toast.configure();
    const toastMessage = 'Something went wrong, you are not allowed.';
    let url: string = '';
    const ws = new WebSocket('ws://127.0.0.1:8000/ws');


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
    // not in use now
    // if (requestLocation === 'modalDeleteTaskGetUsers') {

    //     url = "http://localhost:62000/api/v1/usertasks";
    // }
    
    if (requestLocation === 'modalDeleteTask') {

        url = "http://localhost:62000/api/v1/tasksDelete";
    }

    const result = await axios.post(url, query);

    if (result.status === resultValue) {

        window.location.reload();
        if (wsText) ws.send(wsText);
    } else {

        toast(toastMessage);
    }
}

export default axiosFunction;
