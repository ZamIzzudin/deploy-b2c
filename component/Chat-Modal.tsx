import { Modal } from 'react-bootstrap';

function ChatModal(props: any) {
    return (
        <Modal
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            size="md"
            centered
        >
            <Modal.Body>
                h
            </Modal.Body>
        </Modal>
    );
}

export default ChatModal;
