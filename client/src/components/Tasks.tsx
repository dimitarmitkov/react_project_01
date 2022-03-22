import React from 'react';
import '../App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TasksCard from './TasksCard';
import About from './About';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'primereact/button';
import { Container, Row, Col, Card } from 'react-bootstrap';



class ShowTasksList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: []
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:62000/api/v1/tasks')
            .then(response => {
                this.setState({
                    tasks: response.data
                })
            })
            .catch(err => {
                console.log('Error from ShowTasksList');
            })
    };

    render() {
        const tasks = this.state.tasks;

        // state array declaration
        let progressArray: string[] = ["initial", "selected", "progress", "review", "done"];

        // this function is responsible to loop through progress array and create task cards 
        function tasksFunction(value: string) {
            return tasks.filter(function (obj: any) {
                return obj.taskProgress === value;
            }).map((task: any, k: number) =>
                <TasksCard task={task} key={k} />
            );
        }

        // this function below sets first letter of word as capital
        function capitalizeFirstLetter(word: string) {
            if (typeof word !== 'string') return '';
            return word.charAt(0).toUpperCase() + word.slice(1);
        }

        // create array of elements 
        function elementArray () {

            if (!tasks) {
                return "there is no task record!";
            }

            return progressArray.map((element: any, elKey: number) =>
                <Col sm={2} className="padding-0" key={element + elKey + 1}>
                    <Card
                        bg={''}
                        key={element + elKey + 2}
                        text={'dark'}
                        style={{ height: '100%' }}
                        className="padding-0"
                    >
                        <Card.Header key={element + elKey + 3}>{capitalizeFirstLetter(element)}</Card.Header>
                        <Card.Body key={element + elKey + 4}>
                            {tasksFunction(element)}
                        </Card.Body>
                    </Card>
                </Col>
            );
        }

        return (
            <Row>
                {elementArray()}
            </Row >
        );
    }
}

export default ShowTasksList;