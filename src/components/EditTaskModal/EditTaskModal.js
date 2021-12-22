import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import * as taskService from '../../services/taskService';
import * as notifications from '../../helpers/notifications';
import TaskForm from '../Common/TaskForm';


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
        tags: []
    });

    useEffect(() => {
        if (taskId) {
            taskService.getTask(taskId)
                .then(res => setTask(res));
        }
    }, [taskId])


    const handleSubmit = (e, updatedTask) => {
        e.preventDefault();
        taskService.updateTask(updatedTask)
            .then(res => {
                handleModalSubmit(res);
                notifications.createSuccess();
            })
            .catch((err) => {
                notifications.createError(err.message);
            });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TaskForm onSubmit={handleSubmit} onClose={handleClose} initialTask={task} />
            </Modal.Body>
        </Modal>
    );
}

export default EditTaskModal;