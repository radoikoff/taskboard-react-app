import { Card, Badge } from "react-bootstrap";
import { useAuth } from '../../contexts/AuthContext';
import './Task.css';

const Task = ({
    task,
    onDragStart,
    onTaskEditClick,
    onDelete
}) => {

    const { user } = useAuth();

    return (
        <Card id={task._id} className="card-col" draggable={user._id == task._ownerId} onDragStart={onDragStart} onClick={onTaskEditClick}>
            <Card.Body>
                <div className="card-action">
                    <h6 className="card-title">
                        {task.title}
                    </h6>
                    <div >
                        {user._id == task._ownerId
                            ? <i id={task._id} onClick={onDelete} className="fas fa-trash-alt i"></i>
                            : null
                        }
                    </div>
                </div>
                <Card.Text>
                    {task.description.lenght > 40
                        ? task.description.substr(0, 50) + '...'
                        : task.description
                    }
                </Card.Text>

                <div className="tags-list">
                    {task.tags?.map(tag =>
                        <Badge key={tag} variant="info" style={{marginRight: '0.1rem'}}>{tag}</Badge>
                    )}
                </div>
                <div className="author-area">
                    <cite>Owner:</cite> &nbsp;
                    {user._id == task._ownerId
                        ? <Badge pill bg="warning">Me</Badge>
                        : <cite>{`${task.author.firstName} ${task.author.lastName}`}</cite>
                    }
                </div>

            </Card.Body>
        </Card>

    );
};

export default Task;