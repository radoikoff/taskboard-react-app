import { Card } from 'react-bootstrap'

const BoardCard = ({board}) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{board.title}</Card.Title>
                <Card.Text>{board.description}</Card.Text>
            </Card.Body>
        </Card>
    );
}
export default BoardCard;