import { useEffect, useState } from 'react';
import { Container, Row, Col, Stack, Card, Button } from 'react-bootstrap';
import Task from './Task';
import TaskGroup from './TaskGroup';
import * as taskService from '../../services/taskService';
import NewTaskCard from './NewTaskCard';

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
    };


    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h6>Backlog</h6>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col onDragOver={onDragOverHandler} onDrop={(e) => onDropHandler(e, 1)}>

                    {tasks.filter(t => t.status == 1).map(t =>
                        <Task key={t._id} task={t} onStatusChangeHandler={onStatusChangeHandler} onDragStart={onDragStartHandler} />
                    )}
                    <NewTaskCard />
                </Col>
                <Col onDragOver={onDragOverHandler} onDrop={(e) => onDropHandler(e, 2)}>
                    {tasks.filter(t => t.status == 2).map(t =>
                        <Task key={t._id} task={t} onStatusChangeHandler={onStatusChangeHandler} onDragStart={onDragStartHandler} />
                    )}
                    <NewTaskCard />

                </Col>
                <Col onDragOver={onDragOverHandler} onDrop={(e) => onDropHandler(e, 3)}>
                    {tasks.filter(t => t.status == 3).map(t =>
                        <Task key={t._id} task={t} onStatusChangeHandler={onStatusChangeHandler} onDragStart={onDragStartHandler} />
                    )}
                    <NewTaskCard />
                </Col>
                <Col onDragOver={onDragOverHandler} onDrop={(e) => onDropHandler(e, 4)}>
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