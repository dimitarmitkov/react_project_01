import { Link } from 'react-router-dom';
import './userCard.css';
import { Row, Col, Container } from 'react-bootstrap';
import EditUserApp from './EditUser';
import DeleteUserModalApp from '../modal/ModalDeleteUser';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { valuesLinks, valuesUsersTypes } from '../../enumerators';

interface PropsCurrentUser {
    id?: number;
    role?: string;
    userName?: string;
};

interface EntryProps{
    user:{
        id: number;
        role: string;
        firstName: string;
        email: string;
    }
};

const UsersCard = (props: EntryProps) => {
    const user = props.user;

    const userLogged: PropsCurrentUser = CurrentLoggedUser()!;
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
                        { isAdmin ? <DeleteUserModalApp {...user} /> : null}
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
