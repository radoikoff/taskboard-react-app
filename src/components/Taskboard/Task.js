//import './TaskGroup.css';
import { Card, Button, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import './Task.css';

const Task = ({
    task,
    onStatusChangeHandler,
    onDragStart
}) => {
    return (
        <Card id={task._id} className="card-col" draggable onDragStart={onDragStart}>
            <Card.Body>
                <div className="card-action">
                    <h6 className="card-title" onclick={(e) => { e.stopPropagation() }}>
                        {task.title}
                    </h6>
                    <div>
                        <i className="fas fa-trash-alt i"></i>
                    </div>
                </div>
                <Card.Text>{task.description}</Card.Text>
                <Badge variant="info">dev</Badge>
                <NavLink to={`/tasks/${task._id}`}>Edit</NavLink>
                {task.status < 4 && <Button onClick={() => onStatusChangeHandler(task._id, task.status + 1)}>+</Button>}
                {task.status > 1 && <Button onClick={() => onStatusChangeHandler(task._id, task.status - 1)}>-</Button>}

            </Card.Body>
        </Card>

    );
};

export default Task;