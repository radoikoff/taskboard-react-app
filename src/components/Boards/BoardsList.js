import { Card, Button, Container, Row, Col, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import BoardCard from './BoardCard';
import * as boardService from '../../services/boardService';
//import CreateBoard from './CreateBoard';
import {Link} from 'react-router-dom';

const BoardsList = ({ history }) => {

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        boardService.getAll()
            .then(res => setBoards(res));
    }, []);

    function onClickHandler(e) {
        history.push(`/boards/${e.currentTarget.id}`);
    }

    return (
        <>
            <Container>
                <Row md={3}>
                    <Col>
                        <Link to={'/boards/create'} className="btn btn-primary">Create New</Link>
                    </Col>
                </Row>
                <Row xs={1} md={3} className="g-4">
                    {boards.length > 0
                        ? boards.map(b => <BoardCard key={b._id} board={b} onClickHandler={onClickHandler} />)
                        : <h3>No boards available!</h3>
                    }
                </Row>
            </Container>
        </>
    );
};

export default BoardsList;