import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TasksCard from './TasksCard';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card } from 'react-bootstrap';
import { JsxElement } from 'typescript';
import AxiosRequester from './functions/axiosRequester';
import { addAbortSignal } from 'stream';



    const ShowTasksList = () => {

    const [tasks, setTasks] = useState([])

    
        AxiosRequester(setTasks, "http://localhost:62000/api/v1/tasks");

        // state array declaration
        let progressArray: string[] = ["initial", "selected", "progress", "review", "done"];

        // this function is responsible to loop through progress array and create task cards 
        function tasksFunction(value: string) {
            return tasks.filter(function (obj: any) {
                return obj.taskProgress === value;
            }).map((task: JsxElement, k: number) =>
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

            const elementArrayMapping= progressArray.map((element: string, elKey: number) =>
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

            return elementArrayMapping;
        }

        return (
            <Row>
                {elementArray()}
            </Row >
        );
}

export default ShowTasksList;
