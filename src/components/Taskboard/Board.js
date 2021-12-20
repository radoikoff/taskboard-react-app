import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Task from './Task';
import * as taskService from '../../services/taskService';
import NewTaskCard from './NewTaskCard';
import TaskGroupHeader from './TaskGroupHeader';
import * as notifications from '../../helpers/notifications';
import EditTaskModal from './EditTaskModal';
import ConfirmDialog from '../Common/ConfirmDialog';


const taskTypes = {
    backlog: 'Backlog',
    doing: 'Doing',
    review: 'In Review',
    completed: "Completed"
};

const Board = ({
    match
}) => {

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState('');
    const [tasks, setTasks] = useState([]);

    const boardId = match.params.boardId;
    useEffect(() => {
        taskService.getAllTasks(boardId)
            .then(res => setTasks(Object.values(res)));
    }, [boardId]);

    /*     const onStatusChangeHandler = (taskId, taskStatus) => {
            if (taskStatus >= 1 && taskStatus <= 4) {
    
                taskService.updateTask(taskId, taskStatus)
                    .then(updatedTask => setTasks((prevState) => {
                        const index = prevState.findIndex(x => x._id === taskId);
                        return [
                            ...prevState.slice(0, index),
                            updatedTask,
                            //{ ...prevState[index], status: taskStatus },
                            ...prevState.slice(index + 1)
                        ]
                    }));
            }
        }; */

    const handleClose = () => {
        setCurrentTaskId('');
        setShowEditModal(false);
    };

    const handleShow = (e) => {
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


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <TaskGroupHeader name={taskTypes.backlog} />
                    </Col>
                    <Col>
                        <TaskGroupHeader name={taskTypes.doing} />
                    </Col>
                    <Col>
                        <TaskGroupHeader name={taskTypes.review} />
                    </Col>
                    <Col>
                        <TaskGroupHeader name={taskTypes.completed} />
                    </Col>
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
                        <NewTaskCard />
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
                        <NewTaskCard />

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
                        <NewTaskCard />
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
                        <NewTaskCard/>
                    </Col>
                </Row>
            </Container>
            <EditTaskModal taskId={currentTaskId} show={showEditModal} handleClose={handleClose} handleModalSubmit={handleModalSubmit} />
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