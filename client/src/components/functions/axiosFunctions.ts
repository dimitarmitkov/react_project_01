import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configData from '../../config.json';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const axiosFunction = async (requestLocation: string, query: {}, action: string, resultValue: number, wsText: string | undefined = undefined, locationReload: string | undefined = 'reload') => {

    toast.configure();
    const toastMessage = 'Something went wrong, you are not allowed.';
    let url: string = '';
    const ws = new WebSocket(configData.WEBSOCKET_URL);

    const toasterReload = (text: string) => toast.info(text,
        {
            onClick: () => window.location.reload(),
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            theme: "colored",
            onClose: () => window.location.reload(),
        });

    const toasterHref = (text: string, location: string) => toast.info(text,
        {
            onClick: () => window.location.href = location,
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            theme: "colored",
            onClose: () => window.location.href = location,
        });

    const axiosResult = async (url: string) => {
        return action === 'post' ? await axios.post(url, query) : await axios.get(url, query);
    }


    if (requestLocation === 'currentUserCurrentPicture') {

        url = "http://localhost:62000/api/v1/photos/upload";

        const result = (await axiosResult(url)).status;

        result === resultValue ? toasterReload('Picture changed successful.') : toast(toastMessage);
    }

    if (requestLocation === 'currentUserCurrentPassword') {

        url = "http://localhost:62000/api/v1/usersEdit";

        const result = (await axiosResult(url)).status;

        result === resultValue ? toasterReload('Password changed successful.') : toast(toastMessage);
    }

    if (requestLocation === 'editUser') {

        url = "http://localhost:62000/api/v1/usersEdit";

        const result = (await axiosResult(url)).status;

        result === resultValue ? toasterReload('Edit user successful.') : toast(toastMessage);
    }

    if (requestLocation === 'modalDeleteUser') {

        url = "http://localhost:62000/api/v1/usersDelete";

        const result = (await axiosResult(url)).status;

        result === resultValue ? toasterReload('User deleted successful.') : toast(toastMessage);
    }

    if (requestLocation === 'modalDeleteTask') {

        url = "http://localhost:62000/api/v1/tasksDelete";

        const result = (await axiosResult(url)).status;

        if (result === resultValue) {

            if (wsText) {
                ws.send(wsText);
                toasterReload('Deleted successful.');

            }
        } else {
            toast(toastMessage);
        }
    }

    if (requestLocation === 'loginForm') {

        url = "http://localhost:62000/api/v1/userLogin";

        const result = (await axiosResult(url)).status;

        result === resultValue ? toasterHref('Successful login.', '/helloMitko') : toast(toastMessage);
    }

    if (requestLocation === 'logoutForm') {

        url = "http://localhost:62000/api/v1/userLogout";

        const result = (await axiosResult(url)).status;

        result === resultValue ? toasterHref('Successful logout.', '/login') : toast(toastMessage);
    }

    if (requestLocation === 'signUpForm') {

        url = "http://localhost:62000/api/v1/createUser";

        const result = (await axiosResult(url)).status;

        result === resultValue ? toasterHref('User created successful.', '/users') : toast(toastMessage);
    }
}

export default axiosFunction;
