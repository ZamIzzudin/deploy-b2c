/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
import { Modal } from 'react-bootstrap';
import { facebookProvider, googleProvider } from '../config/socialAuth';
import socialMediaAuth from '../login-auth/auth';

export default function LoginModal(props: any) {
    const handleLogin = async (provider: any) => {
        const res = await socialMediaAuth(provider);
        await props.getDataLogin(res);
    };

    return (
        <Modal
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            size="md"
            centered
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <h1 className="title text-center">Login</h1>
                <div className="centered">
                    <button className="button capsule" onClick={() => handleLogin(facebookProvider)}>facebook</button>
                    <button className="button capsule mx-3 my-5" onClick={() => handleLogin(googleProvider)}>google</button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide} className="button capsule">Close</button>
            </Modal.Footer>
        </Modal>
    );
}
