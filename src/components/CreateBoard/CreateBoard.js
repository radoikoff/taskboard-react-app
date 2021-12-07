import { Col, Row, Button, InputGroup, Form } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import * as boardService from '../../services/boardService';

import './CreateBoard.css';

const CreateBoard = ({ history }) => {

    const { user } = useAuth();

    const onBoardCreateHandler = (e) => {
        e.preventDefault();

        const { title, description } = Object.fromEntries(new FormData(e.currentTarget));


        boardService.create(title, description, user.accessToken)
            .then((res) => {
                console.log(res);
                history.push('/boards');
            })
            .catch(err => {
                // TODO: show notification
                console.log(err);
            });
    };

    return (
        <section id="create-board">
            <Form onSubmit={onBoardCreateHandler}>
                <Form.Group as={Row} className="align-items-center" controlId="create-board-form">
                    <Col xs="auto">
                        <Form.Label>Board Name</Form.Label>
                    </Col>
                    <Col>
                        <InputGroup hasValidation>
                            <Form.Control type="text" name="title" placeholder="Title" required />
                            <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup hasValidation>
                            <Form.Control type="text" name="description" placeholder="Description" required />
                            <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                    <Col>
                        <Button type="submit">Create</Button>
                    </Col>
                </Form.Group>
            </Form>
        </section>
    );

};
export default CreateBoard;