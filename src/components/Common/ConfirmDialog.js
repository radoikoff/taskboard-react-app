import { Modal, Button } from 'react-bootstrap';

const ConfirmDialog = ({
    show,
    onClose,
    onSave,
    message,
    saveBtnText
}) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{message}</Modal.Title>
            </Modal.Header>

   {/*      <Modal.Body>
                <p>{message}</p>
            </Modal.Body> */}

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={onSave}>{saveBtnText}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDialog;
