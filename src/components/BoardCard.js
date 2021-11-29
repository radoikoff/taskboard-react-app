import { Card, Col } from 'react-bootstrap'

const BoardCard = ({
    board,
    onClickHandler
}) => {
    return (
        <Col>
            <Card id={board._id} onClick={onClickHandler}>
                <Card.Body>
                    <Card.Title>{board.title}</Card.Title>
                    <Card.Text>{board.description}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}
export default BoardCard;