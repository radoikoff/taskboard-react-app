import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import * as boardService from '../../services/boardService';

import BoardCard from '../BoardCard/BoardCard';

const BoardsList = () => {

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        boardService.getAll()
            .then(res => setBoards(Object.values(res)))
            .catch((err) => { console.log(err) });
    }, []);


    return (
        <Container>
            <Row md={3}>
                <Col>
                    <Link to={'/boards/create'} className="btn btn-primary">Create New</Link>
                </Col>
            </Row>
            <Row xs={1} md={3} className="g-4">
                {boards.length > 0
                    ? boards.map(b =>
                        <BoardCard
                            key={b._id}
                            board={b}
                        />)
                    : <h3>No boards available!</h3>
                }
            </Row>
        </Container>
    );
};

export default BoardsList;