import { Card } from 'react-bootstrap';
import './NewTaskCard.css'

const NewTaskCard = ({
    onTaskCreate
}) => {

    return (
        <Card className="text-center" onClick={onTaskCreate}>
            <Card.Body className="new-task-card">
                <i className="fas fa-plus text-center"></i>
            </Card.Body>
        </Card>
    );
}
export default NewTaskCard;