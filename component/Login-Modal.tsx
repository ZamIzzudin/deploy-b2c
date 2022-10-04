/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line react/jsx-props-no-spreading
import {
    Modal, Row, Col, Form, InputGroup,
} from 'react-bootstrap';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { googleProvider } from '../config/socialAuth';
import socialMediaAuth from '../login-auth/auth';
import styles from './styles/LoginModal.module.css';

export default function LoginModal(props: any) {
    const [selectOption, setSelectionOption] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPass, setShowPass] = useState(false);

    const handleLogin = async (provider: any) => {
        const res = await socialMediaAuth(provider);
        const auth = {
            username: res.displayName,
            email: res.email,
        };

        const { uid } = res;

        const user = await axios.post('http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/v1/auth', auth).then((response) => response.data).catch((response) => console.log(response));

        await props.getDataLogin(res, user.token, user.role);
    };

    async function handleLoginAccount() {
        console.log(`${email} ${password}`);
    }

    return (
        <Modal
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
                        <Col className={`${styles['form-container']} col-12 col-md-8 col-sm-12 flex-down`}>
                            <span className="mb-3">
                                Login with Account
                            </span>
                            <Form.Group className="fullwidth">
                                <Form.Control className="form-layout mb-3" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                                <InputGroup>
                                    <Form.Control type={showPass ? ('type') : ('password')} className="form-layout mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    <button className={styles['show-password-button']} onClick={() => { setShowPass(!showPass); }}>
                                        {showPass ? (
                                            <i className="fa-regular fa-eye" />
                                        ) : (
                                            <i className="fa-regular fa-eye-slash" />
                                        )}
                                    </button>
                                </InputGroup>
                                <div className="centered">
                                    <button className="button capsule fullwidth" onClick={() => handleLoginAccount()}>Login</button>
                                </div>
                            </Form.Group>
                        </Col>
                    ) : (
                        <Col className={`${styles['form-container']} col-12 col-md-8 col-sm-12 flex-down`}>
                            <span className="mb-3">Create new Account</span>
                            <Form.Group className="fullwidth">
                                <Form.Control className="form-layout mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                <InputGroup>
                                    <Form.Control type={showPass ? ('type') : ('password')} className="form-layout mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    <button className={styles['show-password-button']} onClick={() => { setShowPass(!showPass); }}>
                                        {showPass ? (
                                            <i className="fa-regular fa-eye" />
                                        ) : (
                                            <i className="fa-regular fa-eye-slash" />
                                        )}
                                    </button>
                                </InputGroup>
                                <div className="centered">
                                    <button className="button capsule fullwidth" onClick={() => handleLoginAccount()}>Register</button>
                                </div>
                            </Form.Group>
                        </Col>
                    )}
                    <Col>
                        <Col className="col-md-6 col-sm-12 col-12 flex-down center-start fullwidth">
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
