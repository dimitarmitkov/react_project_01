import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div>

        <Users />

        <Button label="Success" className="p-button-success" />
        <Button label="Primary" className="p-button-rounded" />
        <Button label="Secondary" className="p-button-rounded p-button-secondary" />
        <ButtonBS variant="primary">Primary</ButtonBS>{' '}
        <ButtonBS variant="secondary">Secondary</ButtonBS>{' '}

      </div>

      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */}

      {/* componentDidMount() {
        
        axios
          .get('http://localhost:62000/api/v1/users/7')
          .then(response => {
          //  this.setState(response);
          //  console.log(response.data);

           <h1>response</h1>
            })
            .catch(err => {
              console.log('Error from ShowBookList')
            })
          }; */}




    </Router>
  );
}

export default App;
