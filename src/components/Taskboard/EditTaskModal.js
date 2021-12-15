import { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import * as taskService from '../../services/taskService';

const EditTaskModal = ({
    taskId,
    show,
    handleClose
}) => {

    const [task, setTask] = useState({});

    useEffect(() => {
        if (taskId) {
            taskService.getTask(taskId)
                .then(res => setTask(res))
        } else {
            setTask({});
        }
    }, [taskId])

    return (
        <Modal
            show={show}
            onHide={handleClose}
        /*             backdrop="static"
                    keyboard={false} */
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter task name..." defaultValue={task.title} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter short description..." defaultValue={task.description} />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Task status</Form.Label>
                            <Form.Select value={task.status} onChange={(e) => setTask(s => ({ ...s, status: e.target.value }))}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Tags</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option>Cdffdf..</option>
                                <option>.dfdf..</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <div className="d-flex justify-content-end align-items-center">
                        <Button variant="primary" type="submit" className="mx-2">Save</Button>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </div>

                </Form>
            </Modal.Body>



        </Modal>
    );
}

export default EditTaskModal;