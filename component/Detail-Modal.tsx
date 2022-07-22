import { Modal } from 'react-bootstrap';

function DetailModal(props: any) {
    const { children } = props;
    return (
        <Modal
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            size="md"
            centered
        >
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}

export default DetailModal;
