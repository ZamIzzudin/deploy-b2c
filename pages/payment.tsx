/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable comma-dangle */
/* eslint-disable key-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import {
    Col, Row, Container, Form, InputGroup
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { PayPalButton } from 'react-paypal-button-v2';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '../hooks';

import { LoginModal } from '../component';
import { checkCheckoutDetail, asyncMakeBoostOrder, asyncMakeAccountOrder } from '../state/checkoutDetail/action';

import { encrypt } from '../utils/crypto';
import countries from '../utils/country.json';

import styles from '../styles/Payment.module.css';

function Payment() {
    const { auth, checkoutDetail } = useAppSelector((states) => states);
    const router = useRouter();

    const [modal, showModal] = useState(false);

    const [fullName, setFullName] = useState('');
    const [Country, setCountry] = useState(countries.data[0].nicename);
    const [billingAddress, setBilling] = useState('');
    const [City, setCity] = useState('');
    const [zipCode, setZip] = useState('');
    const [Address, setAddress] = useState('');
    const [paymentMethod, setPayment] = useState('Paypal');

    // Credential
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showPass, setShowPass] = useState(false);
    const [accForm, setAcc] = useState(false);
    // Paypal script load
    const [scriptLoaded, setScriptLoaded] = useState<any>(false);

    const dispatch = useAppDispatch();

    async function paymentForm(e) {
        if (e !== null) {
            e.preventDefault();
        }

        let serviceRequire;

        const form = {
            full_name: fullName,
            country: Country,
            billing_address: billingAddress,
            city: City,
            zip_code: zipCode,
            address: Address,
            payment_method: paymentMethod
        };

        if (checkoutDetail !== 'Valorant Account') {
            const credential = {
                username,
                password
            };

            serviceRequire = {
                boost_detail: checkoutDetail?.require,
                add_ons: checkoutDetail?.add_ons,
                total_price: checkoutDetail?.total_price,
                notes: encrypt(JSON.stringify(credential))
            };
        } else {
            serviceRequire = {
                boost_detail: checkoutDetail?.require,
                add_ons: checkoutDetail?.add_ons,
                total_price: checkoutDetail?.total_price,
            };
        }

        if (accForm) {
            await doPayment(form, serviceRequire);
        }
    }

    async function doPayment(form, serviceRequire) {
        if (checkoutDetail.service === 'Boosting') {
            dispatch(asyncMakeBoostOrder(form, serviceRequire, checkoutDetail.type));
            router.push('/dashboard');
        } else {
            dispatch(asyncMakeAccountOrder(form, checkoutDetail.id_account));
            router.push('/dashboard');
        }
    }

    useEffect(() => {
        dispatch(checkCheckoutDetail());

        // Setup Script Paypal
        const setUpPaypal = () => {
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.CLIENT_ID}`;
            script.type = 'text/javascript';
            script.async = true;
            script.onload = () => setScriptLoaded(true);
            document.body.appendChild(script);
        };
        setUpPaypal();
    }, []);

    if (checkoutDetail.service === undefined) {
        return (
            <Col>
                <Head>
                    <title>Lunar Boost | Payment</title>
                </Head>
                <div className="error-container">
                    <Image src="/Jett-Sticker.png" width="300" height="300" />
                    <span className="sec-font">You Dont Have Any Order, Make Your Order Now</span>
                    <Link href="/boost">
                        <button className="button capsule mt-3" type="button">Boost</button>
                    </Link>
                </div>
            </Col>
        );
    }

    return (
        <Container className="pt-3 my-5">
            <Head>
                <title>Lunar Boost || Payment</title>
            </Head>
            <h1 className="section-title mt-5 text-center">Checkout</h1>
            <h2 className="section-subtitle text-center mb-5 px-3">Finish Your payment to make us process Your order</h2>
            {auth.role === null ? (
                <Row className="fullwidth py-5">
                    <Col>
                        <div className="error-container">
                            <Image src="/Jett-Sticker.png" width="300" height="300" />
                            <span className="sec-font">You Have to Login First</span>
                            <div className="mt-3">
                                <button className="capsule button" onClick={() => showModal(true)}>Login</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            ) : (
                <Row>
                    {auth.role[0] === 'user' ? (
                        <Row className="flex-center-start">
                            <Col className="col-md-7 col-12 mb-4">
                                <Form className="card" onSubmit={(e) => paymentForm(e)}>
                                    <h3 className="section-subtitle">Payement Gateaway</h3>
                                    <Row>
                                        <Col className="p-4">
                                            <div className={`${paymentMethod === 'Paypal' ? ('active') : ('')} centered-down inside-card fullwidth p-2 card-hovering`} onClick={() => setPayment('Paypal')}>
                                                <Image src="/paypal.png" width="90" height="90" />
                                                <h5 className="mt-3">PayPal</h5>
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <h3 className="section-subtitle">Billing Details</h3>
                                    <Row>
                                        <Form.Group className="mb-3 col-md-6">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control type="text" className="form-layout" onChange={(e) => setFullName(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 col-md-6">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Select className="form-layout" defaultValue={Country} onChange={(e) => setCountry(e.target.value)}>
                                                {countries.data.map((country) => (
                                                    <option value={country.nicename}>{country.nicename}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3 col-md-6">
                                            <Form.Label>Billing Address</Form.Label>
                                            <Form.Control type="text" className="form-layout" onChange={(e) => setBilling(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 col-md-6">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" className="form-layout" onChange={(e) => setCity(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3 col-md-6">
                                            <Form.Label>ZIP Code</Form.Label>
                                            <Form.Control type="text" className="form-layout" onChange={(e) => setZip(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 col-md-6">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" className="form-layout" onChange={(e) => setAddress(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <div className="center-horizontal mb-3">
                                            <div>
                                                <input type="checkbox" className="checkbox" onClick={() => setAcc(!accForm)} />
                                            </div>
                                            <span className={`${styles['mini-text']} mx-2`}>
                                                I confirm that all the entered information is accurate and I agree to your
                                                {' '}
                                                <b>Terms of Use.</b>
                                            </span>
                                        </div>
                                        <span className={styles['sub-mini-text']}>Further information will be requested after payment.</span>
                                        <div className=" centered mt-4 px-5">
                                            {paymentMethod === 'Paypal' && scriptLoaded ? (
                                                <PayPalButton
                                                    style={{
                                                        color: 'blue', layout: 'horizontal', tagline: false, shape: 'pill', height: 40
                                                    }}
                                                    amount={checkoutDetail?.total_price}
                                                    onSuccess={() => paymentForm(null)}
                                                />
                                            ) : (
                                                <button className="button capsule mb-2" type="submit">Pay Now</button>
                                            )}
                                        </div>
                                    </Row>
                                </Form>
                            </Col>
                            <Col className="col-md-5 col-12">
                                <div className="card bordered full-width">
                                    <h3 className="section-subtitle">My Order</h3>
                                    <hr />
                                    <Row>
                                        <Col className="col-md-6">
                                            <Image src={checkoutDetail?.game?.logo_url || '/valo.png'} width="100%" height="100%" />
                                        </Col>
                                        <Col className="centered-down">
                                            <h5 className={styles['service-type']}>{checkoutDetail?.game?.name}</h5>
                                            <span className={styles['service-desc']}>{checkoutDetail?.type}</span>
                                        </Col>
                                    </Row>
                                    {checkoutDetail?.type !== 'Valorant Account' && (
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Account Username</Form.Label>
                                                <Form.Control required type="text" className="form-layout" onChange={(e) => setUsername(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Account Password</Form.Label>
                                                <InputGroup>
                                                    <Form.Control required type={showPass ? ('type') : ('password')} className="form-layout" onChange={(e) => setPassword(e.target.value)} />
                                                    <button type="button" className={styles['show-password-button']} onClick={() => { setShowPass(!showPass); }}>
                                                        {showPass ? (
                                                            <i className="fa-regular fa-eye" />
                                                        ) : (
                                                            <i className="fa-regular fa-eye-slash" />
                                                        )}
                                                    </button>
                                                </InputGroup>
                                            </Form.Group>
                                        </Form>
                                    )}
                                    <hr />
                                    <Row className="centered">
                                        <Col className="centered h-100 m-0">
                                            <h5 className="subtitle-sec">Total Amount :</h5>
                                        </Col>
                                        <Col>
                                            <h5 className={styles['service-price']}>
                                                {`$ ${checkoutDetail?.total_price}`}
                                            </h5>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <Row className="fullwidth py-5">
                            <Col>
                                <div className="error-container">
                                    <Image src="/Jett-Sticker.png" width="300" height="300" />
                                    <span className="sec-font">You Dont Have Access, Go Back to Home Page</span>
                                    <Link href="/">
                                        <button className="button capsule mt-3" type="button">Home</button>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Row>
            )}
            <LoginModal
                show={modal}
                onHide={() => showModal(false)}
            />
        </Container>

    );
}

export default Payment;
