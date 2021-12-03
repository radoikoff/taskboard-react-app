//import './TaskGroup.css';
import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Task = ({
    task,
    onStatusChangeHandler
}) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <NavLink to={`/tasks/${task._id}`}>Edit</NavLink>
                {task.status < 4 && <Button onClick={() => onStatusChangeHandler(task._id, task.status + 1)}>+</Button>}
                {task.status > 1 && <Button onClick={() => onStatusChangeHandler(task._id, task.status - 1)}>-</Button>}

            </Card.Body>
        </Card>
    );
};

export default Task;