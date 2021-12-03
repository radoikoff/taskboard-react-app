import { useEffect, useState } from 'react';
import { Container, Row, Col, Stack, Card, Button } from 'react-bootstrap';
import Task from './Task';
import TaskGroup from './TaskGroup';
import * as taskService from '../../services/taskService';

const Board = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        taskService.getAllTasks()
            .then(res => setTasks(res));
    }, []);

    const onStatusChangeHandler = (taskId, taskStatus) => {
        if (taskStatus > 1 && taskStatus < 4) {
            const task = tasks.find(t => t._id == taskId);
            taskService.updateTask({ ...task, status: taskStatus })
                .then(() => taskService.getAllTasks()
                .then(res => setTasks(res)));
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