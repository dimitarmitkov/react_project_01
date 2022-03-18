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
        console.log("PrintTask: " + tasks);
        let tasksList;
        let tasksListInitial;
        let tasksListSelected;
        let tasksListProgress;
        let tasksListReview;
        let tasksListDone;

        if (!tasks) {
            tasksList = "there is no task record!";
        } else {


            tasksListInitial = tasks.filter(function (obj: any) {
                return obj.taskProgress === 'initial';
            }).map((task: any, k: number) =>
                <TasksCard task={task} key={k} />
            );

            tasksListSelected = tasks.filter(function (obj: any) {
                return obj.taskProgress === 'selected';
            }).map((task: any, k: number) =>
                <TasksCard task={task} key={k} />
            );

            tasksListProgress = tasks.filter(function (obj: any) {
                return obj.taskProgress === 'progress';
            }).map((task: any, k: number) =>
                <TasksCard task={task} key={k} />
            );

            tasksListReview = tasks.filter(function (obj: any) {
                return obj.taskProgress === 'review';
            }).map((task: any, k: number) =>
                <TasksCard task={task} key={k} />
            );

            tasksListDone = tasks.filter(function (obj: any) {
                return obj.taskProgress === 'done';
            }).map((task: any, k: number) =>
                <TasksCard task={task} key={k} />
            );
        }

        return (
            <div>

                <Row>
                    
                    <Col sm={2} className="padding-0">
                        <Card
                            bg={''}
                            key={1}
                            text={'dark'}
                            style={{ height: '100%' }}
                            className="padding-0"
                        >
                            <Card.Header>Selected</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {tasksListSelected}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={2} className="padding-0">
                        <Card
                            bg={''}
                            key={1}
                            text={'dark'}
                            style={{ height: '100%' }}
                            className="padding-0"
                        >
                            <Card.Header>Initial</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {tasksListInitial}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={2}>
                        <Card
                            bg={''}
                            key={1}
                            text={'dark'}
                            style={{ height: '100%' }}
                            className=""
                        >
                            <Card.Header>Progress</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {tasksListProgress}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={2}>
                        <Card
                            bg={''}
                            key={1}
                            text={'dark'}
                            style={{ height: '100%' }}
                            className=""
                        >
                            <Card.Header>Review</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {tasksListReview}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={2}>
                        <Card
                            bg={''}
                            key={1}
                            text={'dark'}
                            style={{ height: '100%' }}
                            className=""
                        >
                            <Card.Header>Done</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {tasksListDone}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default ShowTasksList;