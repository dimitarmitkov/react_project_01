import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import ScrollButton from './components/scrollButton/ScrollButton';
import { valuesLinks } from './enumerators';

function App() {

  const user = CurrentLoggedUser()!;

  return (
    <Container fluid>
      <Router>
        <Row>
          <Col>
            <NavbarData />
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <SidebarFive />
          </Col>
          <Col sm={10}>
            <Routes>

              < Route path={valuesLinks.DashBoard} element={<Hello />} />
              < Route path={valuesLinks.Users} element={<PaginatedUsers />} />
              < Route path={valuesLinks.Tasks} element={<PaginatedTasks />} />
              < Route path={valuesLinks.LogIn} element={<LoginGroup />} />
              < Route path={valuesLinks.LogOut} element={<Logout />} />
              < Route path={valuesLinks.SignUp} element={<SignUpForm />} />
              < Route path={valuesLinks.CreateTask} element={<CreateTask />} />
              < Route path={valuesLinks.UserTasks} element={<PaginatedTasksByUser data={user} />} />
              < Route path={valuesLinks.Users + "/:id"} element={<UserCardData />} />
              < Route path={valuesLinks.CurrentUser + ":id"} element={<CurrentUserCard />} />
              < Route path={valuesLinks.WebSocket} element={<WebsocketData />} />

            </Routes>
          </Col>
        </Row>
      </Router>
      <ScrollButton />
    </Container>
  );
}

export default App;
