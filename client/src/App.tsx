import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
// import Button from './components/ButtonTest';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'primereact/button';
import ButtonBS from 'react-bootstrap/Button';
import Users from './components/Users';
import Tasks from './components/Tasks';
import NavbarData from './components/navbar/NavbarData';
import SidebarThree from './components/sidebar/SidebarThree';
import SidebarFour from './components/sidebar/SidebarFour';
import { Container, Row, Col } from 'react-bootstrap';
import Hello from './components/test_components/HelloWorld';
import HelloClass from './components/test_components/HelloClass';
import SidebarFive from './components/sidebar/SidebarFive';



function App() {

  return (
    <Container fluid>
      <Row>
        <Col>
          <NavbarData />
          <HelloClass name="Mitko" />
        </Col>
      </Row>
      <Router>
      <Row>
        <Col sm={2}>
          <SidebarFive />
        </Col>

        <Col sm={10}>
          {/* <Tasks /> */}

          {/* <SidebarFourRouter/> */}

         

              <Routes>

                < Route path="/helloMitko" element={<Hello name="Dimitar" />} />
                < Route path="/users" element={<Users />} />
                < Route path="/tasks" element={<Tasks />} />

              </Routes>
        </Col>
      </Row>
      </Router>

    </Container>
  );
}

export default App;
