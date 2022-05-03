import CurrentLoggedUser from '../functions/currentLoggedUser';
import ErrorComponent from '../error/ErrorComponent';

interface PropsCurrentUser {
    id?: number;
    role?: string;
    userName?: string;
}

const Hello = () => {

    const user: PropsCurrentUser = CurrentLoggedUser()!;

    if (user) {

        return <h1>Hello, {user.userName}</h1>
    } else {
        return <ErrorComponent/>
    }
}

export default Hello;
