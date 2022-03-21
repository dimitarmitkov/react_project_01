import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Sidebar from './components/sidebar/Sidebar';
import SidebarTwo from './components/sidebar/SidebarTwo';
import SidebarThree from './components/sidebar/SidebarThree';
import { Container, Row, Col } from 'react-bootstrap';
import Hello from './components/test_components/HelloWorld';
import HelloClass from './components/test_components/HelloClass';


function App() {
  return (

    <Router>

      <Container fluid>
        <Row>
          <Col>
            <NavbarData />
            <Routes>

              < Route path="/helloMitko" element={<Hello name="Dimitar" />} />
            </Routes>

            <HelloClass name="Mitko" />
          </Col>

        </Row>

        <Row>

          <Col sm={2} style={{ height: '100%' }}>
            <SidebarThree />

          </Col>

          <Col sm={10}>
            <Tasks />

          </Col>
        </Row>
      </Container>

      <div>




      </div>



    </Router>

  );
}

export default App;
