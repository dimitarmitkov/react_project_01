import { Card, Row, Col } from 'react-bootstrap';
import ModalApp from './modal/ModalTask';
import './tasks/tasks.css';

const TasksCard = (props: any) => {
    const task = props.task;

    return (
        <div className="card-container">
            <Card className={task.taskType === 'project' ? "mt-3 mb-3 card text-white bg-warning" : "mt-3 mb-3 card text-white bg-info"} >
                <Card.Body>
                    <Card.Title>{task.taskName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{task.taskType}</Card.Subtitle>
                    <Card.Text>
                        {task.taskProgress}
                    </Card.Text>
                    <Card.Link href="#">{task.taskId ? task.taskId : task.id}</Card.Link>
                    <Card.Link href="#"></Card.Link>
                </Card.Body>
                <Card.Body className="mt-2 edit-buttons edit">
                            <ModalApp {...task} />
                </Card.Body>
            </Card>
        </div>
    );
}

export default TasksCard;