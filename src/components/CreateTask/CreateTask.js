import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import * as petService from '../../services/petService';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { AuthContext, useAuth } from '../../contexts/AuthContext';

const CreateBoard = ({ history }) => {
    //const { user } = useContext(AuthContext);
    //const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const { user } = useAuth();
    const isAutenticated = Boolean(user.accessToken);

    const onBoardCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        //const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

        let name = formData.get('name');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');
        let type = formData.get('type');

        /* petService.create({
            name,
            description,
            imageUrl,
            type,
        }, user.accessToken)
            .then(result => {
                navigate('/');
            }) */
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <section id="create-board">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="align-items-top" controlId="create-board-form">
                    <Col xs="auto">
                        <Form.Label>Board Name</Form.Label>
                    </Col>
                    <Col>
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="Username" required />
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
}

export default CreateBoard;