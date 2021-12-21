import { useState, useEffect } from 'react';
import * as boardService from '../../services/boardService';
import * as notifications from '../../helpers/notifications';
import BoardForm from '../BoardForm';


const EditBoard = ({ history, match }) => {

    const [board, setBoard] = useState({});
    const boardId = match.params.boardId;

    useEffect(() => {
        boardService.getOne(boardId)
            .then((res) => setBoard(res))
    }, [boardId]);


    const handleSubmit = (e, board) => {
        e.preventDefault();

        boardService.update(boardId, board.title, board.description)
            .then(() => {
                history.push(`/boards/details/${boardId}`);
            })
            .catch(err => {
                notifications.createError(err.message);
            });
    }

    const handleClose = (e) => {
        e.preventDefault();
        history.goBack();
    };

    return (
        <BoardForm onSubmit={handleSubmit} onClose={handleClose} initialBoard={board} formTitle="Edit Board"/>
        /*         <section className="login-section">
                    <Form onSubmit={onEditHandler} method="POST" className="login-form">
                        <Form.Group className="mb-3" controlId="board-name">
                            <Form.Label>Board Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter board name..." defaultValue={board.title} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" placeholder="Enter board description..." defaultValue={board.description} />
                        </Form.Group>
                        <Form.Group className="d-flex justify-content-center">
                            <Button variant="primary" className="flex-grow-1" type="submit">Save</Button>
                        </Form.Group>
                    </Form>
                </section > */
    );

};

export default EditBoard;