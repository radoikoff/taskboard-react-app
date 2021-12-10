import { useEffect, useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as boardService from '../services/boardService';
import { useAuth } from '../contexts/AuthContext';

import ConfirmDialog from './Common/ConfirmDialog';


//import './BoardDetails.css';

const BoardDetails = ({ match, history }) => {

    const [board, setBoard] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const { user } = useAuth();

    const boardId = match.params.boardId;

    useEffect(() => {
        boardService.getOne(boardId)
            .then((res) => setBoard(res))
            .catch(() => history.push('/404'));
    }, [boardId]);


    const deleteBoardHandler = () => {
        boardService.remove(boardId)
            .then(() => {
                setShowDialog(false);
                history.push('/boards');
            });
    };

    const ownerButtons = (
        <>
            <Button as={Link} to={`/boards/edit/${board._id}`} variant="warning" size="sm">Edit</Button>
            <Button variant="danger" size="sm" onClick={() => setShowDialog(true)}>Delete</Button>
        </>
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
            <Card>
                <Card.Body className="board-hover">
                    <Card.Title>{board.title}</Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">Owner: Petar Petrov</Card.Subtitle> */}
                    <Card.Text>{board.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    {user._id && (user._id == board._ownerId
                        ? ownerButtons
                        : null
                    )}
                    <div>Created by: <Badge pill bg="warning" text="dark">{board.author?.email}</Badge></div>
                    <div>Created on: {board._createdOn && new Date(board._createdOn).toISOString().slice(0, 10)}</div>
                </Card.Footer>
            </Card>
        </>
    );
}
export default BoardDetails;