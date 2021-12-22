import { Col, Row, Container, Card } from 'react-bootstrap';
import * as notifications from '../../helpers/notifications';
import * as taskService from '../../services/taskService';
import TaskForm from '../Common/TaskForm';

const CreateTask = ({ match, history }) => {

    const boardId = match.params.boardId;

    const handleSubmit = (e, task) => {
        e.preventDefault();

        taskService.createTask({ ...task, boardId })
            .then(() => {
                notifications.createSuccess();
                history.push(`/boards/${boardId}`);
            })
            .catch(err => {
                notifications.createError(err.message);
            });
    };

    const handleClose = (e) => {
        e.preventDefault();
        history.goBack();
    };

    return (
        <Container>
            <Row className="justify-content-md-center my-3">
                <Col md={4}>
                    <h3>Create Task</h3>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <TaskForm onSubmit={handleSubmit} onClose={handleClose} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateTask;