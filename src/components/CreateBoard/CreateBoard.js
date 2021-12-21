
import * as boardService from '../../services/boardService';
import * as notifications from '../../helpers/notifications';
import BoardForm from '../BoardForm';

const CreateBoard = ({ history }) => {

    const handleSubmit = (e, board) => {
        e.preventDefault();

        boardService.create(board.title, board.description)
            .then(() => {
                history.push('/boards');
            })
            .catch(err => {
                notifications.createError(err.message);
            });
    };

    const handleClose = (e) => {
        e.preventDefault();
        history.goBack();
    };

    return (
        <BoardForm onSubmit={handleSubmit} onClose={handleClose} formTitle="Create Board"/>
    );

};
export default CreateBoard;