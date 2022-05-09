import useCurrentLoggedUser from '../../hooks/useCurrentLoggedUser';
import { ProgressSpinner } from 'primereact/progressspinner';

interface PropsCurrentUser {
    id?: number;
    role?: string;
    userName?: string;
}

const Hello = () => {

    const user: PropsCurrentUser = useCurrentLoggedUser()!;

    if (user) {

        return <h1>Hello, {user.userName}</h1>
    } else {

        return <div className="d-flex align-items-center justify-content-center">
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
    }
}

export default Hello;
