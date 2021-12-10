import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as boardService from '../../services/boardService';

const EditBoard = ({ history, match }) => {

    const [board, setBoard] = useState({});
    const boardId = match.params.boardId;

    useEffect(() => {
        boardService.getOne(boardId)
            .then((res) => setBoard(res))
    }, [boardId]);

console.log(board)
    const onEditHandler = (e) => {
        e.preventDefault();

        const { name, description } = Object.fromEntries(new FormData(e.currentTarget));

        boardService.update(boardId, name, description)
            .then((data) => {
                history.push(`/boards/details/${boardId}`);
            })
    }

    return (
        <section className="login-section">
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
        </section >
    );

};

export default EditBoard;