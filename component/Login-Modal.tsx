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
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { googleProvider } from '../config/socialAuth';
import socialMediaAuth from '../login-auth/auth';
import styles from './styles/LoginModal.module.css';

export default function LoginModal(props: any) {
    const [selectOption, setSelectionOption] = useState('login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);

    const [errorMsg, setErrorMsg] = useState(false);

    const saveDataLogin = (data: any, token: any, roles: any) => {
        if (data !== undefined) {
            const store = {
                user: {
                    isLogin: data.emailVerified,
                },
                token,
                roles,
            };

            const expiryDate = new Date();
            const month = (expiryDate.getMonth() + 1) % 12;
            expiryDate.setMonth(month);

            document.cookie = `store=${JSON.stringify(store)}; expires=${expiryDate.toUTCString()}`;
        }
    };

    const handleLogin = async (provider: any) => {
        const res = await socialMediaAuth(provider);
        const auth = {
            username: res.displayName,
            email: res.email,
            firebase_id: res.uid,
        };

        const url = `${process.env.API}/v1/auth`;

        await axios.post(url, auth).then((response) => {
            saveDataLogin(res, response.data.token, response.data.role);
            window.location.reload();
        }).catch((response) => console.log(response));
    };

    async function handleLoginAccount(e) {
        e.preventDefault();
        const auth = {
            password,
            email,
        };

        const url = `${process.env.API}/v1/auth/login`;

        await axios.post(url, auth).then((response) => {
            saveDataLogin({ emailVerified: true }, response.data.token, response.data.role);
            window.location.reload();
        }).catch((err) => { setErrorMsg(true); });
    }

    async function handleRegisterAccount(e) {
        e.preventDefault();
        const auth = {
            username,
            email,
            password,
            password_confirmation: rePassword,
        };

        const url = `${process.env.API}/v1/auth/register`;
        if (password === rePassword) {
            await axios.post(url, auth).then((response) => saveDataLogin({ emailVerified: true }, response.data.token, response.data.role)).catch((response) => console.log(response));
            window.location.reload();
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
                                <span className="mb-3 error-message">Your Email or Password Wrong</span>
                            )}
                            <Form onSubmit={(e) => handleLoginAccount(e)}>
                                <Form.Group className="fullwidth">
                                    <Form.Control required className="form-layout mb-3" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
                                    <InputGroup>
                                        <Form.Control required type={showPass ? ('type') : ('password')} className="form-layout mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                        <button className={styles['show-password-button']} onClick={() => { setShowPass(!showPass); }}>
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
                                        <button className={styles['show-password-button']} onClick={() => { setShowPass(!showPass); }}>
                                            {showPass ? (
                                                <i className="fa-regular fa-eye" />
                                            ) : (
                                                <i className="fa-regular fa-eye-slash" />
                                            )}
                                        </button>
                                    </InputGroup>
                                    <InputGroup>
                                        <Form.Control required type={showRePass ? ('type') : ('password')} className="form-layout mb-3" placeholder="Rewrite Password" onChange={(e) => setRePassword(e.target.value)} />
                                        <button className={styles['show-password-button']} onClick={() => { setShowRePass(!showRePass); }}>
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
