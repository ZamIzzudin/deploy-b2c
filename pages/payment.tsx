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
    Col, Row, Container, Form,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { PayPalButton } from 'react-paypal-button-v2';
import styles from '../styles/Payment.module.css';

function Payment() {
    const [fullName, setFullName] = useState('');
    const [Country, setCountry] = useState('');
    const [billingAddress, setBilling] = useState('');
    const [City, setCity] = useState('');
    const [zipCode, setZip] = useState('');
    const [Address, setAddress] = useState('');
    const [paymentMethod, setPayment] = useState('Metamask');

    const [user, setUser] = useState({
        roles: [],
        token: '',
        user: {}
    });

    const [accForm, setAcc] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState<any>(false);

    const plain = {
        id_account: null,
        full_name: null,
        total_price: 0,
        service: null,
        type: null,
        rank: null,
        game: {
            name: null,
            logo_url: '/kosong.png'
        },
    };

    const [data, setData] = useState(plain);

    async function paymentForm() {
        const form = {
            full_name: fullName,
            country: Country,
            billing_address: billingAddress,
            city: City,
            zip_code: zipCode,
            address: Address,
            payment_method: paymentMethod
        };

        if (accForm) {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            };

            if (data.service === 'Boost') {
                const url = `${process.env.API}/boosts`;
                await axios.post(url, data, config).then(async (res) => {
                    const url2 = `${process.env.API}/boost/checkout/${res.data.data.id}`;
                    await axios.post(url2, form, config).then(() => { global.location.href = '/profile/detail'; }).catch((err) => console.log(err));
                }).catch((err) => console.log(err));
            } else {
                const url = `${process.env.API}/account/checkout/${data.id_account}`;
                await axios.post(url, form, config).then(() => { global.location.href = '/profile/detail'; }).catch((err) => console.log(err));
            }
        }
    }

    function getCookie(cName: any) {
        const name = `${cName}=`;
        const cDecoded = decodeURIComponent(document.cookie); // to be careful
        const cArr = cDecoded.split('; ');
        let res;
        cArr.forEach((val) => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        });
        return res;
    }

    useEffect(() => {
        const predata = localStorage.getItem('data') || '';
        const userData = getCookie('store');

        if (userData !== '') {
            setUser(JSON.parse(userData));
        }
        setData(JSON.parse(predata));
        console.log(JSON.parse(predata));

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

    return (
        <Container className="pt-3 my-5">
            <h1 className="section-title mt-5 text-center">Checkout</h1>
            <h2 className="section-subtitle text-center mb-5">Finish Your payment to make us process Your order</h2>
            {user.roles.length > 0 ? (
                <Row className="flex-center-start">
                    <Col className="card col-md-7 col-12 mb-4">
                        <h3 className="section-subtitle">Payement Gateaway</h3>
                        <Row>
                            <Col className="p-4">
                                <div className={`${paymentMethod === 'Metamask' ? ('active') : ('')} centered-down inside-card fullwidth p-2 card-hovering`} onClick={() => setPayment('Metamask')}>
                                    <Image src="/metamask.png" width="100" height="100" />
                                    <h5 className="mt-3">Metamask</h5>
                                </div>
                            </Col>
                            <Col className="p-4">
                                <div className={`${paymentMethod === 'Paypal' ? ('active') : ('')} centered-down inside-card fullwidth p-2 card-hovering`} onClick={() => setPayment('Paypal')}>
                                    <Image src="/paypal.png" width="90" height="90" />
                                    <h5 className="mt-3">PayPal</h5>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3 col-md-6 fullwidth">
                                <Form.Label>Currency</Form.Label>
                                <Form.Select className="form-layout">
                                    <option>USD $</option>
                                    <option>Euro €</option>
                                </Form.Select>
                            </Form.Group>
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
                                <Form.Select className="form-layout" onChange={(e) => setCountry(e.target.value)}>
                                    <option value="United State">United State</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Japan">Japan</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3 col-md-6">
                                <Form.Label>Billing Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter Your Location" className="form-layout" onChange={(e) => setBilling(e.target.value)} />
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
                                <input type="checkbox" className="checkbox" onClick={() => setAcc(!accForm)} />
                                <span className={`${styles['mini-text']} mx-2`}>
                                    I confirm that all the entered information is accurate and I agree to your
                                    {' '}
                                    <b>Terms of Use.</b>
                                </span>
                            </div>
                            <span className={styles['sub-mini-text']}>Further information will be requested after payment.</span>
                            <div className="centered mt-4 mb-2">
                                {paymentMethod === 'Paypal' && scriptLoaded ? (
                                    <PayPalButton amount={data.total_price} onSuccess={(details) => console.log(details)} />
                                ) : (
                                    <button className="button capsule" onClick={() => paymentForm()}>Pay Now</button>
                                )}
                            </div>
                        </Row>
                    </Col>
                    <Col className="col-md-5 col-12">
                        <div className="w-95 card bordered full-width">
                            <h3 className="section-subtitle">My Order</h3>
                            <hr />
                            <Row>
                                <Col className="col-md-6">
                                    <Image src={data.game.logo_url} width="100%" height="100%" />
                                </Col>
                                <Col className="centered-down">
                                    <h5 className={styles['service-type']}>{data.game.name}</h5>
                                    <span className={styles['service-desc']}>{data.type}</span>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col className="centered">
                                    <h5>Total Amount :</h5>
                                </Col>
                                <Col>
                                    <h5 className={styles['service-price']}>
                                        $
                                        {data.total_price}
                                    </h5>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            ) : (
                <h1>Login Dulu</h1>
            )}

        </Container>

    );
}

export default Payment;
