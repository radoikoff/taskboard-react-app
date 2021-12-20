import { Card } from 'react-bootstrap';
import * as notifications from '../../helpers/notifications';
import * as taskService from '../../services/taskService';
import './NewTaskCard.css'


const NewTaskCard = ({
    boardId,
    taskStatus,
    onTaskCreated
}) => {

    const onClickHandler = () => {
        taskService.createTask({
            title: 'Task Title',
            description: 'Task Description',
            status: taskStatus,
            boardId: boardId
        })
            .then(newTask => {
                onTaskCreated(newTask);
                notifications.createSuccess();
            })
            .catch(err => notifications.createError(err.message));
    }

    return (
        <Card className="text-center" onClick={onClickHandler}>
            <Card.Body className="new-task-card">
                <i className="fas fa-plus text-center"></i>
            </Card.Body>
        </Card>
    );
}
export default NewTaskCard;