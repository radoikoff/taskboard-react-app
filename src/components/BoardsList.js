import { Card, Button, Container, Row, Col, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import BoardCard from './BoardCard';
import * as boardService from '../services/boardService';

const BoardsList = () => {

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        boardService.getAll()
            .then(res => setBoards(res));
    }, []);

    return (
        <Container>
            <Row>
                <Col lg={6}>
                    <Stack gap={3}>
                        {boards.length > 0
                            ? boards.map(b => <BoardCard key={b._id} board={b} />)
                            : <h3>No boards available!</h3>
                        }
                    </Stack>
                </Col>
                <Col lg={6}>
                    <Card>
                        <Card.Header>Featured</Card.Header>
                        <Card.Body>
                            <Card.Title>Special title treatment</Card.Title>
                            <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
};

export default BoardsList;