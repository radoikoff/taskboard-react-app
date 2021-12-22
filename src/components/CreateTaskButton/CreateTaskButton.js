import {useHistory} from 'react-router-dom'
import './CreateTaskButton.css';

const BackTopButton = ({
    boardId
}) => {

    const history = useHistory();

    const handleClick = () => {
        history.push(`/tasks/create/${boardId}`);
    }

    return (
        <div className="backTopBtn rounded-circle" onClick={handleClick}>
            <i className="fas fa-plus text-center"></i>
        </div>
    )
};

export default BackTopButton;