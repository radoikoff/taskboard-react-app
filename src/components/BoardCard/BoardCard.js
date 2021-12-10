import { Card, Col, Button, Badge } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'

import './BoardCard.css';

const BoardCard = ({
    board
}) => {

    const history = useHistory();

    const navigateToBoardClickHandler = () => {
        history.push(`/boards/${board._id}`);
    };

    const detailsClickHandler = () => {
        history.push(`/boards/details/${board._id}`);
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
                    <Button variant="warning" size="sm" onClick={detailsClickHandler}>Details</Button>{' '}
                    <Button variant="success" size="sm" onClick={navigateToBoardClickHandler}>Go to board</Button>
                    <cite>Created on: {board._createdOn && new Date(board._createdOn).toISOString().slice(0, 10)}</cite>
                </Card.Footer>
            </Card>
        </Col>
    );
}
export default BoardCard;