import { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import * as taskService from '../../services/taskService';
import * as notifications from '../../helpers/notifications';


const EditTaskModal = ({
    taskId,
    show,
    handleClose,
    handleModalSubmit,
    taskStatuses
}) => {

    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 1,
        tags: [1, 3]
    });
    const [errors, setErrors] = useState({ title: false, description: false });

    useEffect(() => {
        if (taskId) {
            taskService.getTask(taskId)
                .then(res => setTask(res))
        }
        setErrors({ title: false, description: false });
    }, [taskId])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateForm(e);
        setTask((t) => {
            return { ...t, [name]: value }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        taskService.updateTask(task)
            .then(res => {
                handleModalSubmit(res);
                notifications.createSuccess('sucess');
            })
            .catch((err) => {
                let message = '';

                if (err.message == 'Forbidden') {
                    message = 'You are not the owner of the task!';
                } else if (err.message == 'Invalid access token') {
                    message = 'Please log in first!';
                }
                notifications.createError(message);
            });
        handleClose();

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
                        <Form.Control name="title" placeholder="Enter task name..." value={task.title} onChange={handleInputChange} />
                        {errors.title && <span className="validation-error">{errors.title}</span>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" rows={3} placeholder="Enter short description..." value={task.description} onChange={handleInputChange} />
                        {errors.description && <span className="validation-error">{errors.description}</span>}
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Task status</Form.Label>
                            <Form.Select name="status" value={task.status} onChange={handleInputChange}>
                                {taskStatuses.map(ts =>
                                    <option key={ts._id} value={ts._id}>{ts.name}</option>
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Tags</Form.Label>
                            <Form.Select name="tags" multiple={true} value={task.tags} onChange={handleInputChange}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <div className="d-flex justify-content-end align-items-center">
                        <Button variant="primary" className="mx-2" onClick={handleSubmit} disabled={errors.title || errors.description}>Save</Button>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </div>

                </Form>
            </Modal.Body>



        </Modal>
    );
}

export default EditTaskModal;