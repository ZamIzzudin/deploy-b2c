/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
import { Modal, Row, Col } from 'react-bootstrap';
import Image from 'next/Image';
import { facebookProvider, googleProvider } from '../config/socialAuth';
import socialMediaAuth from '../login-auth/auth';
import styles from './styles/LoginModal.module.css';

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
            <Modal.Body>
                <Row>
                    <h1 className={styles['Login-Header']}>Login</h1>
                    <h2 className={styles['Login-Subheader']}>Let us identify you</h2>
                </Row>
                <Row className="my-4 px-5">
                    <Col className="centered-down">
                        <button className={styles['Socmed-Button']} onClick={() => handleLogin(facebookProvider)}>
                            <span className={styles['Provider-Logo']}><Image src="/facebook_logo.png" width="25%" height="25%" /></span>
                            Lanjutkan dengan Facebook
                        </button>
                        <button className={styles['Socmed-Button']} onClick={() => handleLogin(googleProvider)}>
                            <span className={styles['Provider-Logo']}><Image src="/google_logo.png" width="25%" height="25%" /></span>
                            Lanjutkan dengan Google
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Col className={`${styles['Login-Footer']} px-3`}>
                        <button onClick={props.onHide} className="button capsule">Close</button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}
