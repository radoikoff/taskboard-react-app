import { Card } from 'react-bootstrap';
import './TaskGroupHeader.css';

const TaskGroupHeader = ({
    name
}) => {
    return (
        <Card className="group-header">
            <Card.Body>
                <Card.Text>{name}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default TaskGroupHeader;