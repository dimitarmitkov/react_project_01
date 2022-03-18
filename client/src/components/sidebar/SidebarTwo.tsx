import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, ListGroup, ListGroupItem, NavDropdown } from 'react-bootstrap';

const SidebarTwoMenu: React.FunctionComponent = () => {
    return (
        <>

            <Card className="card text-white bg-light">
                {/* <Card.Header>Featured</Card.Header> */}
                <Card.Body>
                    <Card.Link href="#">Link first part 1</Card.Link>
                    <Card.Link href="#">Link first part 2</Card.Link>
                </Card.Body>
                <Card.Body>
                    <Card.Link href="#">Link 1</Card.Link>
                </Card.Body>
                <Card.Body>
                    <Card.Link href="#">Link 1</Card.Link>
                </Card.Body>
                <Card.Body>
                    <Card.Link href="#">Link 1</Card.Link>
                </Card.Body>
                <Card.Body>

                    <NavDropdown title="Select Action" id="collasible-nav-dropdown-sidebar">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Card.Body>


                <Card.Body>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                <Card.Body>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>

            </Card>

        </>
    )
}
export default SidebarTwoMenu;
