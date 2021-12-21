import { useEffect, useState } from 'react';
import { Card, Button, Badge, ListGroup, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as boardService from '../../services/boardService';
import * as taskService from '../../services/taskService';
import * as notifications from '../../helpers/notifications';
import { useAuth } from '../../contexts/AuthContext';

import ConfirmDialog from '../Common/ConfirmDialog';

const BoardDetails = ({ match, history }) => {

    const [board, setBoard] = useState({});
    const [taskCount, setTaskCount] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const { user } = useAuth();

    const boardId = match.params.boardId;

    useEffect(() => {
        boardService.getOne(boardId)
            .then((res) => setBoard(res))
            .catch(() => history.push('/404'));

        taskService.getTasksCount(boardId)
            .then((res) => setTaskCount(res));
    }, [boardId]);

    const onClickDeleteHandler = () => {
        if (taskCount > 0) {
            notifications.createError('Board has tasks! You cannot delete it!');
            return;
        }
        setShowDialog(true);
    };


    const deleteBoardHandler = () => {
        boardService.remove(boardId)
            .then(() => {
                setShowDialog(false);
                history.push('/boards');
            });
    };

    const ownerButtons = (
        <div>
            <Button as={Link} to={`/boards/edit/${board._id}`} variant="warning" size="sm">Edit</Button> &nbsp;
            <Button variant="danger" size="sm" onClick={onClickDeleteHandler}>Delete</Button>
        </div>
    );

    return (
        <>
            <ConfirmDialog
                show={showDialog}
                onClose={() => setShowDialog(false)}
                onSave={deleteBoardHandler}
                message="Are you sure you want to delete this board?"
                saveBtnText="Delete"
            />
            <Container className="p-4">
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <Card>
                            <Card.Body className="board-hover" onClick={() => (history.push(`/boards/${board._id}`))}>
                                <Card.Title>{board.title}</Card.Title>
                                <Card.Text>{board.description}</Card.Text>
                            </Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="button-area">
                                    {user._id == board._ownerId
                                        ? ownerButtons
                                        : <div></div>
                                    }
                                    <div>
                                        <span>Tasks:</span> &nbsp;
                                        <Badge bg="success">{taskCount}</Badge>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                            <Card.Footer>
                                <div>Created by: <Badge pill bg="warning" text="dark">{`${board.author?.firstName} ${board.author?.lastName}`}</Badge></div>
                                <div>Created on: {board._createdOn && new Date(board._createdOn).toISOString().slice(0, 10)}</div>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default BoardDetails;