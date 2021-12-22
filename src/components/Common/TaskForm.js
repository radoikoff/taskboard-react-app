import { useState, useEffect } from 'react';
import { Col, Row, Button, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import * as taskService from '../../services/taskService';
import * as tagService from '../../services/tagService';



const TaskForm = ({
    onSubmit,
    onClose,
    initialTask,
}) => {

    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 1,
        tags: []
    });

    const [errors, setErrors] = useState({ title: false, description: false });
    const [taskStatuses, setTaskStatuses] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (initialTask) {
            setTask(initialTask);
        }
    }, [initialTask]);

    useEffect(()=>{
        tagService.getAllTags()
        .then(res => setTags(res))
        .catch(err => console.log(err));

        taskService.getTaskStatuses()
        .then(res => setTaskStatuses(res))
        .catch(err => console.log(err));
    },[]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateForm(e);
        setTask((x) => {
            return { ...x, [name]: value }
        });
    };

    const handleTagChange = (newTags, e) => {
        setTask((prevState) => ({ ...prevState, tags: newTags }));
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
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="title" placeholder="Enter task name..." value={task.title} onChange={handleInputChange} />
                {errors.title && <span className="validation-error">{errors.title}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
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
                    <ToggleButtonGroup type="checkbox" value={task.tags} onChange={handleTagChange}>
                        {tags.map(t =>
                            <ToggleButton key={t._id} variant="outline-info" id={t._id} value={t.name}>{t.name}</ToggleButton>
                        )}
                    </ToggleButtonGroup>
                </Form.Group>
            </Row>
            <div className="d-flex justify-content-end align-items-center">
                <Button variant="primary" className="mx-2" onClick={(e)=>onSubmit(e, task)} disabled={errors.title || errors.description}>Save</Button>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </div>

        </Form>
    );

};

export default TaskForm;