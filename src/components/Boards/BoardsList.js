import { Card, Button, Container, Row, Col, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import * as boardService from '../../services/boardService';

import BoardCard from './BoardCard';
import ConfirmDialog from '../Common/ConfirmDialog';

const BoardsList = () => {

    const [boards, setBoards] = useState([]);
    const [showDialog, setShowDialog] = useState(false);


    useEffect(() => {
        boardService.getAll()
            .then(res => setBoards(res))
            .catch((err) => { console.log(err) });
    }, []);

    function deleteClickHandler(e) {
        setShowDialog(true);
    };

    const deleteBoardHandler = (e) => {

        console.log('deleted', e);
        setShowDialog(false);

    };

    return (
        <>
            <ConfirmDialog
                show={showDialog}
                onClose={() => setShowDialog(false)}
                onSave={deleteBoardHandler}
                message="Are you sure you want to delete this board?"
                saveBtnText="Delete"
            />
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
                                onDelete={deleteClickHandler}
                            />)
                        : <h3>No boards available!</h3>
                    }
                </Row>
            </Container>
        </>
    );
};

export default BoardsList;