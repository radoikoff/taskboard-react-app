import { Card, Col, Button, Badge } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'

import './BoardCard.css';

const BoardCard = ({
    board,
    onDelete
}) => {

    const history = useHistory();

    const navigateToBoardClickHandler = () => {
        history.push(`/boards/${board._id}`);
    };

    const editClickHandler = () => {
        history.push(`/boards/edit/${board._id}`);
    };

    return (
        <Col>
            <Card id={board._id} >
                <Card.Body className="board-hover" onClick={navigateToBoardClickHandler}>
                    <Card.Title>{board.title}</Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">Owner: Petar Petrov</Card.Subtitle> */}
                    <Card.Text>{board.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="warning" size="sm" name="edit" onClick={editClickHandler}>Edit</Button>{' '}
                    <Button variant="danger" name="delete" size="sm" onClick={onDelete}>Delete</Button>
                    <cite>Created by:</cite>
                    <Badge pill bg="warning" text="dark">Peter Pan</Badge>{' '}
                </Card.Footer>
            </Card>
        </Col>
    );
}
export default BoardCard;