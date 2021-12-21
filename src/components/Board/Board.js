import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Task from '../Task/Task';
import * as taskService from '../../services/taskService';
import NewTaskCard from '../NewTaskCard/NewTaskCard';
import TaskGroupHeader from '../TaskGroupHeader/TaskGroupHeader';
import * as notifications from '../../helpers/notifications';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
import ConfirmDialog from '../Common/ConfirmDialog';
import { useAuth } from '../../contexts/AuthContext';


const Board = ({
    match
}) => {

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState('');
    const [tasks, setTasks] = useState([]);
    const [taskStatuses, setTaskStatuses] = useState([]);

    const { user, isAuthenticated } = useAuth();

    const boardId = match.params.boardId;
    useEffect(() => {
        taskService.getAllTasks(boardId)
            .then(res => setTasks(Object.values(res)));
    }, [boardId]);

    useEffect(() => {
        taskService.getTaskStatuses()
            .then(res => setTaskStatuses(res))
            .catch(err => console.log(err));
    }, []);


    const handleClose = () => {
        setCurrentTaskId('');
        setShowEditModal(false);
    };

    const handleShow = (e) => {
        if (!isAuthenticated) {
            notifications.createWarning('You must log in first!');
            return;
        }

        const task = tasks.find(t => t._id === e.currentTarget.id);
        if (user._id !== task._ownerId) {
            notifications.createWarning('You are not task author!');
            return;
        }

        setCurrentTaskId(e.currentTarget.id);
        setShowEditModal(true);
    };

    const onDragOverHandler = (e) => {
        e.preventDefault();
        //e.target.style.border = "3px dotted red"
    };

    const onDragStartHandler = (e) => {
        e.dataTransfer.setData('id', e.currentTarget.id);
    };

    const onDragEnterHandler = (e) => {
        if (e.target.classList.contains('droptarget')) {
            e.target.style.border = "3px dotted red";
        }
    }

    const onDragLeaveHandler = (e) => {
        if (e.target.classList.contains('droptarget')) {
            e.target.style.border = '';
        }
    }

    const onDropHandler = (e, status) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('id');

        const modifiedTasks = tasks.filter(task => {
            if (task._id == taskId) {
                task.status = status;
            }
            return task;
        });

        taskService.updateTaskStatus(taskId, status)
            .then(setTasks(modifiedTasks))
            .catch((err) => notifications.createError(`${err.code} - ${err.message}`));

        e.target.style.border = '';
    };

    const handleModalSubmit = (updatedTask) => {
        setTasks((prevState) => {
            const index = prevState.findIndex(t => t._id === updatedTask._id);
            const newTasks = [...prevState]
            newTasks[index] = updatedTask;
            return newTasks;
        });
    }

    //Delete section
    const handleShowDelete = (e) => {
        e.stopPropagation();
        setCurrentTaskId(e.currentTarget.id);
        setShowDeleteModal(true);
    };

    const handleCloseDelete = () => {
        setCurrentTaskId('');
        setShowDeleteModal(false);
    }

    const handleTaskDelete = () => {
        taskService.deleteTask(currentTaskId)
            .then(() => {
                setTasks((prevState) => prevState.filter(t => t._id !== currentTaskId))
                notifications.createSuccess();
            })
            .catch(err => notifications.createError(err.message));
        setShowDeleteModal(false);
    }

    //Create task
    const createdTaskHandler = (createdTask) => {
        setTasks((prevState) => [...prevState, createdTask]);
    };


    return (
        <>
            <Container>
                <Row>
                    {taskStatuses.map(ts =>
                        <Col key={ts._id}>
                            <TaskGroupHeader name={ts.name} />
                        </Col>
                    )}
                </Row>
                <Row>
                    <Col onDragOver={onDragOverHandler}
                        onDrop={(e) => onDropHandler(e, 1)}
                        onDragEnter={onDragEnterHandler}
                        onDragLeave={onDragLeaveHandler}
                        className="droptarget"
                    >
                        {tasks.filter(t => t.status == 1).map(t =>
                            <Task key={t._id}
                                task={t}
                                onDragStart={onDragStartHandler}
                                onTaskEditClick={handleShow}
                                onDelete={handleShowDelete}
                            />
                        )}
                        {isAuthenticated && <NewTaskCard boardId={boardId} taskStatus={1} onTaskCreated={createdTaskHandler} />}
                    </Col>
                    <Col onDragOver={onDragOverHandler}
                        onDrop={(e) => onDropHandler(e, 2)}
                        onDragEnter={onDragEnterHandler}
                        onDragLeave={onDragLeaveHandler}
                        className="droptarget"
                    >
                        {tasks.filter(t => t.status == 2).map(t =>
                            <Task key={t._id}
                                task={t}
                                onDragStart={onDragStartHandler}
                                onTaskEditClick={handleShow}
                                onDelete={handleShowDelete}
                            />
                        )}
                        {isAuthenticated && <NewTaskCard boardId={boardId} taskStatus={2} onTaskCreated={createdTaskHandler} />}
                    </Col>
                    <Col onDragOver={onDragOverHandler}
                        onDrop={(e) => onDropHandler(e, 3)}
                        onDragEnter={onDragEnterHandler}
                        onDragLeave={onDragLeaveHandler}
                        className="droptarget"
                    >
                        {tasks.filter(t => t.status == 3).map(t =>
                            <Task key={t._id}
                                task={t}
                                onDragStart={onDragStartHandler}
                                onTaskEditClick={handleShow}
                                onDelete={handleShowDelete}
                            />
                        )}
                        {isAuthenticated && <NewTaskCard boardId={boardId} taskStatus={3} onTaskCreated={createdTaskHandler} />}
                    </Col>
                    <Col onDragOver={onDragOverHandler}
                        onDrop={(e) => onDropHandler(e, 4)}
                        onDragEnter={onDragEnterHandler}
                        onDragLeave={onDragLeaveHandler}
                        className="droptarget"
                    >
                        {tasks.filter(t => t.status == 4).map(t =>
                            <Task key={t._id}
                                task={t}
                                onDragStart={onDragStartHandler}
                                onTaskEditClick={handleShow}
                                onDelete={handleShowDelete}
                            />
                        )}
                        {isAuthenticated && <NewTaskCard boardId={boardId} taskStatus={4} onTaskCreated={createdTaskHandler} />}
                    </Col>
                </Row>
            </Container>
            <EditTaskModal
                taskId={currentTaskId}
                show={showEditModal}
                handleClose={handleClose}
                handleModalSubmit={handleModalSubmit}
                taskStatuses={taskStatuses} />
            <ConfirmDialog
                show={showDeleteModal}
                onClose={handleCloseDelete}
                onSave={handleTaskDelete}
                message="Are you sure you want to delete this task?"
                saveBtnText="Delete"
            />
        </>
    );
};

export default Board;