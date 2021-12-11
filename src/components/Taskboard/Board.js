import { useEffect, useState } from 'react';
import { Container, Row, Col, Stack, Card, Button } from 'react-bootstrap';
import Task from './Task';
import TaskGroup from './TaskGroup';
import * as taskService from '../../services/taskService';

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


    return (
        <Container>
            <Row>
                <Col>
                    <TaskGroup name="To Do">
                        {tasks.filter(t => t.status == 1).map(t => <Task key={t._id} task={t} onStatusChangeHandler={onStatusChangeHandler} />)}
                    </TaskGroup>
                </Col>
                <Col>
                    <TaskGroup name="In Progress">
                        {tasks.filter(t => t.status == 2).map(t => <Task key={t._id} task={t} onStatusChangeHandler={onStatusChangeHandler} />)}

                    </TaskGroup>
                </Col>
                <Col>
                    <TaskGroup name="In Review">
                        {tasks.filter(t => t.status == 3).map(t => <Task key={t._id} task={t} onStatusChangeHandler={onStatusChangeHandler} />)}
                    </TaskGroup>
                </Col>
                <Col>
                    <TaskGroup name="Done">
                        {tasks.filter(t => t.status == 4).map(t => <Task key={t._id} task={t} onStatusChangeHandler={onStatusChangeHandler} />)}
                    </TaskGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Board;