/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
import {
    Modal, Row, Col, Form,
} from 'react-bootstrap';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { googleProvider } from '../config/socialAuth';
import socialMediaAuth from '../login-auth/auth';
import styles from './styles/LoginModal.module.css';

export default function LoginModal(props: any) {
    const [selectOption, setSelectionOption] = useState('login');

    const handleLogin = async (provider: any) => {
        const res = await socialMediaAuth(provider);
        const auth = {
            username: res.displayName,
            email: res.email,
        };

        const user = await axios.post('http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/v1/auth', auth).then((response) => response.data).catch((response) => console.log(response));

        await props.getDataLogin(res, user.token, user.role);
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
                    <Col className={`${styles['modal-header']} mb-3`}>
                        <button className={`${styles['option-button']} ${selectOption === 'login' && (styles.active)}`} onClick={() => setSelectionOption('login')}>Login</button>
                        <button className={`${styles['option-button']} ${selectOption === 'register' && (styles.active)}`} onClick={() => setSelectionOption('register')}>Register</button>
                    </Col>
                </Row>
                <Row>
                    {selectOption === 'login' ? (
                        <Col className={`${styles['form-container']} col-md-8 flex-down`}>
                            <span className="mb-3">Login with Account</span>
                            <Form.Group className="fullwidth">
                                <Form.Control className="form-layout mb-3" placeholder="Email" type="email" />
                                <Form.Control className="form-layout mb-3" placeholder="Password" type="password" />
                                <div className="centered">
                                    <button className="button capsule fullwidth">Login</button>
                                </div>
                            </Form.Group>
                        </Col>
                    ) : (
                        <Col className={`${styles['form-container']} col-md-8 flex-down`}>
                            <span className="mb-3">Create new Account</span>
                            <Form.Group className="fullwidth">
                                <Form.Control className="form-layout mb-3" placeholder="Email" />
                                <Form.Control className="form-layout mb-3" placeholder="Password" />
                                <div className="centered">
                                    <button className="button capsule fullwidth">Register</button>
                                </div>
                            </Form.Group>
                        </Col>
                    )}
                    <Col>
                        <Col className=" flex-down center-start">
                            <span className="mb-3">Or</span>
                            <button className={styles['Socmed-Button']} onClick={() => handleLogin(googleProvider)}>
                                <span className={styles['Provider-Logo']}><Image src="/google_logo.png" width="25%" height="25%" /></span>
                                Google
                            </button>
                        </Col>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}
