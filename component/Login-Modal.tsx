/* eslint-disable no-alert */
/* eslint-disable max-len */
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
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../hooks';
import { googleProvider } from '../config/socialAuth';

import { AsyncLogin, AsyncGoogleLogin, AsyncRegister } from '../state/auth/action';

import styles from './styles/LoginModal.module.css';

export default function LoginModal(props: any) {
    const { error }: any = useAppSelector((states) => states);
    const dispatch = useAppDispatch();

    const [selectOption, setSelectionOption] = useState('login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);

    const [errorMsg, setErrorMsg] = useState(false);

    async function handleLogin(provider: any) {
        dispatch(AsyncGoogleLogin(provider));
    }

    async function handleLoginAccount(e) {
        e.preventDefault();
        const auth = {
            password,
            email,
        };

        dispatch(AsyncLogin(auth));
    }

    async function handleRegisterAccount(e) {
        e.preventDefault();
        const auth = {
            username,
            email,
            password,
            password_confirmation: rePassword,
        };

        if (password === rePassword) {
            dispatch(AsyncRegister(auth));
        } else {
            setErrorMsg(true);
        }
    }

    function clearState() {
        setUsername('');
        setEmail('');
        setPassword('');
        setRePassword('');
        setShowPass(false);
        setShowRePass(false);
        setErrorMsg(false);
    }

    useEffect(() => {
        setErrorMsg(error.message);
    }, [error]);

    return (
        <Modal
            {...props}
            size="md"
            centered
        >
            <Modal.Body>
                <Row>
                    <Col className={`${styles['modal-header']} mb-3`}>
                        <button className={`${styles['option-button']} ${selectOption === 'login' && (styles.active)}`} onClick={() => { setSelectionOption('login'); clearState(); }}>Login</button>
                        <button className={`${styles['option-button']} ${selectOption === 'register' && (styles.active)}`} onClick={() => { setSelectionOption('register'); clearState(); }}>Register</button>
                    </Col>
                </Row>
                <Row>
                    {selectOption === 'login' ? (
                        <Col className={`${styles['form-container']} col-12 col-md-8 col-sm-12 flex-down`}>
                            <span className="mb-3">
                                Login with Account
                            </span>
                            {errorMsg && (
                                <span className="mb-3 error-message">Cannot Login</span>
                            )}
                            <Form onSubmit={(e) => handleLoginAccount(e)}>
                                <Form.Group className="fullwidth">
                                    <Form.Control required className="form-layout mb-3" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                                    <InputGroup>
                                        <Form.Control required type={showPass ? ('type') : ('password')} className="form-layout mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                        <button type="button" className={styles['show-password-button']} onClick={() => { setShowPass(!showPass); }}>
                                            {showPass ? (
                                                <i className="fa-regular fa-eye" />
                                            ) : (
                                                <i className="fa-regular fa-eye-slash" />
                                            )}
                                        </button>
                                    </InputGroup>
                                    <div className="centered">
                                        <button className="button capsule fullwidth" type="submit">Login</button>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Col>
                    ) : (
                        <Col className={`${styles['form-container']} col-12 col-md-8 col-sm-12 flex-down`}>
                            <span className="mb-3">Create new Account</span>
                            <Form onSubmit={(e) => handleRegisterAccount(e)}>
                                <Form.Group className="fullwidth">
                                    <Form.Control required className="form-layout mb-3" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Control required className="form-layout mb-3" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                    {errorMsg && (
                                        <span className="mb-3 error-message">Your Password Doesn`t Match</span>
                                    )}
                                    <InputGroup>
                                        <Form.Control required type={showPass ? ('type') : ('password')} className="form-layout mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                        <button type="button" className={styles['show-password-button']} onClick={() => { setShowPass(!showPass); }}>
                                            {showPass ? (
                                                <i className="fa-regular fa-eye" />
                                            ) : (
                                                <i className="fa-regular fa-eye-slash" />
                                            )}
                                        </button>
                                    </InputGroup>
                                    <InputGroup>
                                        <Form.Control required type={showRePass ? ('type') : ('password')} className="form-layout mb-3" placeholder="Rewrite Password" onChange={(e) => setRePassword(e.target.value)} />
                                        <button type="button" className={styles['show-password-button']} onClick={() => { setShowRePass(!showRePass); }}>
                                            {showRePass ? (
                                                <i className="fa-regular fa-eye" />
                                            ) : (
                                                <i className="fa-regular fa-eye-slash" />
                                            )}
                                        </button>
                                    </InputGroup>
                                    <div className="centered">
                                        <button className="button capsule fullwidth" type="submit">Register</button>
                                    </div>
                                </Form.Group>
                            </Form>
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
