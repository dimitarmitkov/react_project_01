import { Card } from 'react-bootstrap';
import ModalApp from './modal/ModalTask';

const TasksCard = (props: any) => {
    const task = props.task;

    return (
        <div className="card-container">
            <Card className="mt-3 mb-3 card text-white bg-warning">
                <Card.Body>
                    <Card.Title>{task.taskName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{task.taskType}</Card.Subtitle>
                    <Card.Text>
                        {task.taskProgress}
                    </Card.Text>
                    <Card.Link href="#">{task.id}</Card.Link>
                    <Card.Link href="#"></Card.Link>
                    <ModalApp {...task}/>
                </Card.Body>
            </Card>
        </div>
    )
};

export default TasksCard;