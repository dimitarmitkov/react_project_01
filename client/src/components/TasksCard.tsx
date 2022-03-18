import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Card } from 'react-bootstrap';


const TasksCard = (props: any) => {
    const task = props.task;

    return (
        <div className="card-container">
            {/* <Card style={{ width: '18rem' }} className="mt-3 mb-3 card text-white bg-warning mb-3"> */}
            <Card className="mt-3 mb-3 card text-white bg-warning">
                <Card.Body>
                    <Card.Title>{task.taskName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{task.taskType}</Card.Subtitle>
                    <Card.Text>
                        {task.taskProgress}
                    </Card.Text>
                    <Card.Link href="#">Task Link</Card.Link>
                    <Card.Link href="#">Another Task</Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
};

export default TasksCard;