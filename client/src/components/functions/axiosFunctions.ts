import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configData from '../../config.json';
import { valuesLinks } from '../../enumerators';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const axiosFunction = async (url: string, query: {}, action: string, resultValue: number, wsText: string | undefined = undefined, locationReload: string | undefined = 'reload') => {

    toast.configure();
    const toastMessage = 'Something went wrong, you are not allowed.';
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

    const axiosUrl = SERVER_URL + url;

    const axiosResult = async () => {
        return action === 'post' ? await axios.post(axiosUrl, query) : await axios.get(axiosUrl, query);
    }

    const result = (await axiosResult()).status;


    if (result === resultValue && !wsText) {
        switch (url) {
            case valuesLinks.PhotosUpload: toasterReload('Picture changed successful.');
                break;
            case valuesLinks.UsersEdit: toasterReload('Edit user successful.');
                break;
            case valuesLinks.UsersDelete: toasterReload('User deleted successful.');
                break;
            case valuesLinks.UserLogin: toasterHref('Successful login.', '/helloMitko');
                break;
            case valuesLinks.UserLogout: toasterHref('Successful logout.', '/login');
                break;
            case valuesLinks.UserCreate: toasterHref('User created successful.', '/users');
                break;

            default: toast(toastMessage);
                break;
        }

    } else if (result === resultValue && wsText) {

        if (wsText) {
            ws.send(wsText);
            toasterReload('Deleted successful.');

        } else {
            toast(toastMessage);
        }
    }
}

export default axiosFunction;
