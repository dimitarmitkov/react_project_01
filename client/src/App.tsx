import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarData from './components/navbar/NavbarData';
import { Container, Row, Col } from 'react-bootstrap';
import Hello from './components/test_components/HelloWorld';
import SidebarFive from './components/sidebar/SidebarFive';
import LoginGroup from './components/login/LoginForm';
import SignUpForm from './components/signup/SignUpForm';
import Logout from './components/login/Logout';
import PaginatedTasks from './components/paginate/PaginatedTasks';
import PaginatedUsers from './components/paginate/PaginatedUsers';
import PaginatedTasksByUser from './components/paginate/PaginatedTasksByUser';
import CreateTask from './components/createTask/CreateTask';
import CurrentLoggedUser from './components/functions/currentLoggedUser';
import UserCardData from './components/user/UserCardData';
import CurrentUserCard from './components/user/CurrentUserDataCard';
import WebsocketData from './components/ws/websocket';

function App() {

  const [user, setUser] = useState(Object);

  CurrentLoggedUser(setUser);

  // if(!user){
  //   CurrentLoggedUser(setUser);

  // }

 

    return (
      <Container fluid>
        <Router>
          <Row>
            <Col>
              <NavbarData />
              {/* <HelloClass name={"Orfi"} /> */}
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <SidebarFive />
            </Col>
            <Col sm={10}>
              <Routes>

                < Route path="/helloMitko" element={<Hello />} />
                < Route path="/users" element={<PaginatedUsers />} />
                < Route path="/tasks" element={<PaginatedTasks />} />
                < Route path="/login" element={<LoginGroup />} />
                < Route path="/logout" element={<Logout />} />
                < Route path="/signup" element={<SignUpForm />} />
                < Route path="/createTask" element={<CreateTask />} />
                < Route path="/usertasks" element={<PaginatedTasksByUser data={user} />} />
                < Route path="/users/:id" element={<UserCardData />} />
                < Route path="/currentuser/:id" element={<CurrentUserCard />} />
                < Route path="/websocket" element={<WebsocketData />} />
                
              </Routes>
            </Col>
          </Row>
        </Router>

      </Container>
    );
}

export default App;
