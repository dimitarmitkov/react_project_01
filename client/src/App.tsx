import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './components/Users';
import Tasks from './components/Tasks';
import NavbarData from './components/navbar/NavbarData';
import { Container, Row, Col } from 'react-bootstrap';
import Hello from './components/test_components/HelloWorld';
import HelloClass from './components/test_components/HelloClass';
import SidebarFive from './components/sidebar/SidebarFive';
import LoginForm from './components/login/LoginForm';
import SignUpForm from './components/signup/SignUpForm';
// import PaginatedTasks from './components/paginate/PaginatedTasks';
import PaginatedUsers from './components/paginate/PaginatedUsers';


function App() {

  return (
    <Container fluid>
      <Router>
        <Row>
          <Col>
            <NavbarData />
            <HelloClass name="Simona" />
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
              < Route path="/tasks" element={<Tasks />} />
              < Route path="/login" element={<LoginForm />} />
              < Route path="/signup" element={<SignUpForm />} />

            </Routes>
          </Col>
        </Row>
      </Router>

    </Container>
  );
}

export default App;
