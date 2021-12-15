import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Task from './Task';
import * as taskService from '../../services/taskService';
import NewTaskCard from './NewTaskCard';
import TaskGroupHeader from './TaskGroupHeader';

const taskTypes = {
    backlog: 'Backlog',
    doing: 'Doing',
    review: 'In Review',
    completed: "Completed"
};

const Board = ({
    match
}) => {

    const [tasks, setTasks] = useState([]);
    const boardId = match.params.boardId;

    useEffect(() => {
        taskService.getAllTasks(boardId)
            .then(res => setTasks(Object.values(res)));
    }, [boardId]);

    const onStatusChangeHandler = (taskId, taskStatus) => {
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
    };

    const onDragOverHandler = (e) => {
        e.preventDefault();
        //e.target.style.border = "3px dotted red"
    };

    const onDragStartHandler = (e) => {
        e.dataTransfer.setData('id', e.currentTarget.id);
    };

    const onDragEnterHandler = (e) => {
        console.log(e.target.className)
        if (e.target.classList.contains('droptarget')) {
            e.target.style.border = "3px dotted red";
        }
    }

    const onDragLeaveHandler = (e) => {
        console.log(e.target.className)
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

        taskService.updateTask(taskId, status)
            .then(setTasks(modifiedTasks));

        e.target.style.border = '';
    };


    return (
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
                        <Task key={t._id} task={t} onStatusChangeHandler={onStatusChangeHandler} onDragStart={onDragStartHandler} />
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
                        <Task key={t._id} task={t} onStatusChangeHandler={onStatusChangeHandler} onDragStart={onDragStartHandler} />
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
                        <Task key={t._id} task={t} onStatusChangeHandler={onStatusChangeHandler} onDragStart={onDragStartHandler} />
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
                        <Task key={t._id} task={t} onStatusChangeHandler={onStatusChangeHandler} onDragStart={onDragStartHandler} />
                    )}
                    <NewTaskCard />
                </Col>
            </Row>
        </Container>
    );
};

export default Board;