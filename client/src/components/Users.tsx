import React from 'react';
import '../App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UsersCard from './UsersCard';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'primereact/button';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';



class ShowUsersList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:62000/api/v1/users')
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
            .catch(err => {
                console.log('Error from ShowUsersList');
            })
    };


    render() {
        const users = this.state.users;
        console.log("PrintUser: " + users);
        let usersList;

        if (!users) {
            usersList = "there is no user record!";
        } else {
            usersList = users.map((user: any, k: number) =>
                <UsersCard user={user} key={k} />
            );
        }

        return (
            <div className="ShowUsersList">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br />
                            <h2 className="display-4 text-center">Users List</h2>
                        </div>

                        <div className="col-md-12">
                            <Link to="/create-user" className="btn btn-outline-warning float-right">
                                + Add New User
                            </Link>
                            <br />
                            <br />
                            <hr />
                        </div>

                        <div>
                            <hr />

                            <Container>
                                <Row>
                                    <Col className="text-center"> <Button icon="pi pi-user" className="p-button-rounded p-button-info" /></Col>
                                    <Col className="text-right"><Button label="Success" className="p-button-raised p-button-success p-button-text" /></Col>
                                    <Col><Button label="Click" icon="pi pi-check" iconPos="right" /></Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">1 of 3</Col>
                                    <Col className="text-right">2 of 3</Col>
                                    <Col>3 of 3</Col>
                                </Row>
                            </Container>



                            <hr />

                        </div>

                    </div>

                    <div className="list">
                        {usersList}
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowUsersList;