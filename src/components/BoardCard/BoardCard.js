import { useEffect, useState } from 'react';
import { Card, Col, Button, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import * as taskService from '../../services/taskService';


import './BoardCard.css';

const BoardCard = ({
    board
}) => {

    const [taskCount, setTaskCount] = useState(0);
    const history = useHistory();
    const { user } = useAuth();

    useEffect(() => {
        taskService.getTasksCount(board._id)
            .then((res) => setTaskCount(res));
    }, [board._id]);


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
                    <div className="button-area">
                        <div>
                            <Button variant="warning" size="sm" onClick={detailsClickHandler}>Details</Button> &nbsp;
                            <Button variant="success" size="sm" onClick={navigateToBoardClickHandler}>Go to board</Button>
                        </div>
                        <div>
                            <cite>Tasks:</cite> &nbsp;
                            <Badge bg="success">{taskCount}</Badge>
                        </div>
                    </div>
                    <div className="info-area">
                        <div>
                            <cite>Owner:</cite> &nbsp;
                            {user._id == board._ownerId
                                ? <Badge pill bg="warning">Me</Badge>
                                : <cite>{`${board.author.firstName} ${board.author.lastName}`}</cite>
                            }
                        </div>
                        <div>
                            <cite>Created on: {board._createdOn && new Date(board._createdOn).toISOString().slice(0, 10)}</cite>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    );
}
export default BoardCard;