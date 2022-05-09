import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import EditUserApp from './EditUser';
import DeleteUserModalApp from '../modal/ModalDeleteUser';
import useCurrentLoggedUser from '../../hooks/setCurrentLoggedUser';
import { valuesLinks, valuesUsersTypes } from '../../enumerators';
import './userCard.css';

interface CurrentUserProps {
    id?: number;
    role?: string;
    userName?: string;
};

interface EntryProps {
    user: {
        firstName: string;
        userName: string;
        lastName: string;
        password: string;
        email: string;
        role: string;
        picture: string;
        id: number;
    }
};

const UsersCard = (props: EntryProps) => {
    const user = props.user;

    const userLogged: CurrentUserProps = useCurrentLoggedUser()!;
    const isAdmin = userLogged && userLogged.role === valuesUsersTypes.Admin;

    return (
        <Container fluid key={user.id + 5 + 'userId'}>

            <Col sm={6}>

                <Row className="mt-1">

                    <Col sm={6}>
                        <h2>
                            <Link to={`${valuesLinks.Users}/${user.id}`}>
                                {user.firstName}
                            </Link>
                        </h2>
                        <h5>{user.email}</h5>
                        <span id="userRole">User role: <span className="user-role-id">{user.role}</span></span>
                        <span id="userId">User Id: <span className="user-role-id">{user.id}</span></span>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <EditUserApp {...user} />
                        {isAdmin ? <DeleteUserModalApp {...user} /> : null}
                    </Col>
                </Row>

                <Row className="mt-1">
                    <hr />
                </Row>
            </Col>
        </Container>
    )
};

export default UsersCard;
