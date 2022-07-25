/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import {
    Col, Row, Container, Form,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Payment.module.css';

function Payment() {
    const plain = {
        id_account: null,
        id_user: null,
        total_price: null,
        service: null,
        type: null,
        rank: null,
        picture: '/valorant.png',
    };
    const [data, setData] = useState(plain);

    useEffect(() => {
        const predata = localStorage.getItem('data') || '';
        setData(JSON.parse(predata));
    }, []);

    return (
        <Container className="pt-3 my-5">
            <h1 className="section-title mt-5 text-center">Checkout</h1>
            <h2 className="section-subtitle text-center mb-5">Finish Your payment to make us process Your order</h2>
            <Row className="px-3 flex-center-start">
                <Col className="card col-md-7 col-12 mb-4">
                    <h3 className="section-subtitle">Payement Gateaway</h3>
                    <Row>
                        <Col className="p-4">
                            <div className="centered-down inside-card fullwidth p-2 card-hovering">
                                <Image src="/metamask.png" width="100" height="100" />
                                <h5 className="mt-3">Metamask</h5>
                            </div>
                        </Col>
                        <Col className="p-4">
                            <div className="centered-down inside-card fullwidth p-2 card-hovering">
                                <Image src="/paypal.png" width="90" height="90" />
                                <h5 className="mt-3">PayPal</h5>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3 col-md-6 fullwidth">
                            <Form.Label>Name</Form.Label>
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
                            <Form.Control type="text" className="form-layout" />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Country</Form.Label>
                            <Form.Select className="form-layout">
                                <option>United State</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Billing Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your Location" className="form-layout" />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" className="form-layout" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>ZIP Code</Form.Label>
                            <Form.Control type="text" className="form-layout" />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Adress</Form.Label>
                            <Form.Control type="text" className="form-layout" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <div className="center-horizontal mb-3">
                            <input type="checkbox" className="checkbox" />
                            <span className={`${styles['mini-text']} mx-2`}>
                                I confirm that all the entered information is accurate and I agree to your
                                {' '}
                                <b>Terms of Use.</b>
                            </span>
                        </div>
                        <span className={styles['sub-mini-text']}>Further information will be requested after payment.</span>
                        <div className="centered mt-4 mb-2">
                            <button className="button capsule">Pay Now</button>
                        </div>
                    </Row>
                </Col>
                <Col className="col-md-5 col-12">
                    <div className="w-95 card bordered full-width">
                        <h3 className="section-subtitle">My Order</h3>
                        <Row>
                            {data.service === 'boost' && (
                                <span>ini boost</span>
                            )}
                        </Row>
                        <hr />
                        <Row className="flex-row">
                            <Col className="mx-2 col-md-3">
                                <Image src={data.picture} width="100%" height="100%" />
                            </Col>
                            <Col className="flex-down flex-left px-3">
                                <h5 className={styles['service-type']}>{data.type}</h5>
                                <span className={styles['service-desc']}>{data.rank}</span>
                            </Col>
                            {data.service === 'boost' && (
                                <Col className="col-md-4 debug-bg mx-2">
                                    <span>detail</span>
                                </Col>
                            )}
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
        </Container>

    );
}

export default Payment;
