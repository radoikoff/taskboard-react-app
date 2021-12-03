import './TaskGroup.css';
//import { Alert, Card } from "react-bootstrap";

const TaskGroup = ({
    children,
    name
}) => {
    return (
        <>
            <h4 className="task-group text-center p-2 mt-2 bg-info text-white">{name}</h4>
            <div className="task-group min-vh-60">
                {children}
            </div>
        </>
    );
};

export default TaskGroup;