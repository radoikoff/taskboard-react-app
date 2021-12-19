import { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import * as taskService from '../../services/taskService';
import * as notifications from '../../helpers/notifications';


const EditTaskModal = ({
    taskId,
    show,
    handleClose,
    handleModalSubmit
}) => {

    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 1,
        tags: [1, 3]
    });

    useEffect(() => {
        if (taskId) {
            taskService.getTask(taskId)
                .then(res => setTask(res))
        }
    }, [taskId])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
            .catch((err) => notifications.createError(`${err.code} - ${err.message}`));
        handleClose();
        
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
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" rows={3} placeholder="Enter short description..." value={task.description} onChange={handleInputChange} />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Task status</Form.Label>
                            <Form.Select name="status" value={task.status} onChange={handleInputChange}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Tags</Form.Label>
                            <Form.Select name="tags" multiple={true} value={task.tags} onChange={handleInputChange}>
                                <option value={1}>Cdffdf..</option>
                                <option value={2}>dfdf..</option>
                                <option value={3}>dddd</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <div className="d-flex justify-content-end align-items-center">
                        <Button variant="primary" className="mx-2" onClick={handleSubmit}>Save</Button>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </div>

                </Form>
            </Modal.Body>



        </Modal>
    );
}

export default EditTaskModal;