import { Modal } from 'react-bootstrap';

function DetailModal(props: any) {
    const { children, sizing } = props;
    return (
        <Modal
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            size={sizing === 'lg' ? ('lg') : ('md')}
            centered
        >
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}

export default DetailModal;
