import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosFunction = async (requestLocation: string, query: {}, action: string, resultValue: number, wsText: string | undefined = undefined, locationReload: string | undefined = 'reload') => {

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

    if (requestLocation === 'modalDeleteTask') {

        url = "http://localhost:62000/api/v1/tasksDelete";
    }
    
    if (requestLocation === 'loginForm') {

        url = "http://localhost:62000/api/v1/userLogin";
    }
    
    if (requestLocation === 'logoutForm') {

        url = "http://localhost:62000/api/v1/userLogout";
    }
    
    if (requestLocation === 'modalTaskGetData') {

        url = "http://localhost:62000/api/v1/tasks";
    }
    
    if (requestLocation === 'signUpForm') {

        url = "http://localhost:62000/api/v1/createUser";
    }

    const result = action === 'post' ? await axios.post(url, query) : await axios.get(url, query);

    if (result.status === resultValue) {

        if (wsText) ws.send(wsText);
        locationReload === 'reload' ? window.location.reload() : window.location.href = locationReload;
    } else {

        toast(toastMessage);
    }
}

export default axiosFunction;
