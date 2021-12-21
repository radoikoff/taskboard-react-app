import { useState, useEffect } from 'react';
import { Col, Row, Button, Container, Form, Card } from 'react-bootstrap';



const BoardForm = ({
    onSubmit,
    onClose,
    initialBoard,
    formTitle
}) => {

    const [board, setBoard] = useState({ title: 'x', description: 'x' });
    const [errors, setErrors] = useState({ title: false, description: false });
    
    useEffect(() => {
        if (initialBoard) {
            setBoard(initialBoard);
        }
      }, [initialBoard]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateForm(e);
        setBoard((x) => {
            return { ...x, [name]: value }
        });
    };

    const validateForm = (e) => {
        const currentValue = e.target.value;
        switch (e.target.name) {
            case 'title':
                if (currentValue.length < 3) {
                    setErrors(state => ({ ...state, title: 'Title sould be at least 3 characters!' }))
                } else {
                    setErrors(state => ({ ...state, title: false }))
                }
                break;
            case 'description':
                if (currentValue.length < 3) {
                    setErrors(state => ({ ...state, description: 'Description sould be at least 3 characters!' }))
                } else {
                    setErrors(state => ({ ...state, description: false }))
                }
                break;

            default:
                setErrors(state => ({ ...state, title: false, description: false }));
                break;
        }
    };


    return (
        <Container>
            <Row className="justify-content-md-center my-3">
                <Col md={6}>
                    <h3>{formTitle}</h3>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control name="title" placeholder="Enter board name..." value={board.title} onChange={handleInputChange} />
                                    {errors.title && <span className="validation-error">{errors.title}</span>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" name="description" rows={3} placeholder="Enter board description..." value={board.description} onChange={handleInputChange} />
                                    {errors.description && <span className="validation-error">{errors.description}</span>}
                                </Form.Group>

                                <Form.Group className="d-flex justify-content-end align-items-center">
                                    <Button variant="primary" className="mx-2" onClick={(e) => onSubmit(e, board)} disabled={errors.title || errors.description}>Save</Button>
                                    <Button variant="secondary" onClick={onClose}>Close</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

};

export default BoardForm;