/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Col, Form, Table, Row,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../hooks';
import DetailModal from '../../Detail-Modal';
import styles from '../../styles/DetailPage.module.css';
import { asyncUserGetBoostOrder, asyncUserGetAccountOrder } from '../../../state/orderList/action';
import { encrypt, decrypt } from '../../../utils/crypto';

export default function UserOrder({ orders, token }) {
    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [typeOrder, setTypeOrder] = useState('boost');
    const [ShowDetailModal, setDetailModal] = useState(false);

    const [credentialEmail, setCredentialEmail] = useState('');
    const [credentialPass, setCredentialPass] = useState('');
    const [ShowCredentialModal, setCredentialModal] = useState(false);

    const [titleReview, setTitleReview] = useState('');
    const [bodyReview, setBodyReview] = useState('');
    const [rateReview, setRateReview] = useState('0');
    const [ShowReviewModal, setReviewModal] = useState(false);

    const dispatch = useAppDispatch();

    function getOrderByType() {
        if (typeOrder === 'boost') {
            dispatch(asyncUserGetBoostOrder(token));
        } else {
            dispatch(asyncUserGetAccountOrder(token));
        }
    }

    function sendCredential(e) {
        e.preventDefault();
        const data = {
            account_email: encrypt(credentialEmail),
            account_password: encrypt(credentialPass),
        };
        setCredentialModal(false);
        setCredentialEmail('');
        setCredentialPass('');
    }

    function sendReview(e) {
        e.preventDefault();
        const data = {
            title: titleReview,
            body: bodyReview,
            rate: rateReview,
        };

        setReviewModal(false);
        setTitleReview('');
        setBodyReview('');
        setRateReview('0');
    }

    useEffect(() => {
        getOrderByType();
    }, [typeOrder]);

    return (
        <div>
            <Col className="center-start mb-3">
                <Form.Group className="width150px">
                    <Form.Label>Order Type</Form.Label>
                    <Form.Select className="form-layout" onChange={(e) => setTypeOrder(e.target.value)}>
                        <option value="boost">Boost</option>
                        <option value="account">Account</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Table responsive="sm" borderless>
                <thead>
                    <tr>
                        <th>Order Date</th>
                        <th>Game</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order) => (
                        <tr key={order.boost_id}>
                            <td>{order.order_date}</td>
                            <td>{order.game}</td>
                            <td>{order.service}</td>
                            <td>{order.status}</td>
                            <td>
                                {order.status !== 'Finished' && (
                                    <button onClick={() => setCredentialModal(true)} className="capsule button mx-2">Credential</button>
                                )}
                                {order.status === 'Finished' && (
                                    <>
                                        <button className="capsule button">Attachment</button>
                                        <button onClick={() => setReviewModal(true)} className="capsule button-org-border mx-2">Review</button>
                                    </>
                                )}
                                <button onClick={() => { setDetailModal(true); setSelectedOrder(order); }} className="capsule button-org">Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Detail Modal */}
            <DetailModal
                show={ShowDetailModal}
                onHide={() => setDetailModal(false)}
            >
                <h1>Details</h1>
                {/* General Detail */}
                <Row>
                    <h5 className="text-org">General</h5>
                    <span>
                        Total Price :
                        {' '}
                        {selectedOrder?.total_price}
                    </span>
                    <span>
                        Payment Method :
                        {' '}
                        {selectedOrder?.payment}
                    </span>
                    <span>
                        Order Date :
                        {' '}
                        {selectedOrder?.order_date}
                    </span>
                    <span>
                        Game :
                        {' '}
                        {selectedOrder?.game}
                    </span>
                    <span>
                        Service :
                        {' '}
                        {selectedOrder?.service}
                    </span>
                    <span>
                        Status :
                        {' '}
                        {selectedOrder?.status}
                    </span>
                </Row>
                <hr />
                {/* Boost Detail */}
                <Row>
                    <h5 className="text-org">Spesification</h5>
                    {
                        selectedOrder?.detail.boost_detail?.map((item) => (
                            <span className={styles['booster-detail-list']}>
                                {Object.keys(item)}
                                {' '}
                                :
                                {' '}
                                {item[Object.keys(item).toString()]}
                            </span>
                        ))
                    }
                </Row>
                <hr />
                {/* Add Ons */}
                {selectedOrder?.detail.add_ons[0].name !== 'None' && (
                    <Row>
                        <h5 className="text-org">Add Ons</h5>
                        <span>Add Ons : </span>
                        <ul className="px-5">
                            {selectedOrder?.detail.add_ons?.map((list) => (
                                <li>{list.name}</li>
                            ))}
                        </ul>
                    </Row>
                )}
            </DetailModal>
            {/* Credential Modal */}
            <DetailModal
                show={ShowCredentialModal}
                onHide={() => setCredentialModal(false)}
            >
                <h2>Your Credential</h2>
                <Form className="mt-3" onSubmit={(e) => sendCredential(e)}>
                    <Form.Group>
                        <Form.Label>Username / Email</Form.Label>
                        <Form.Control value={credentialEmail} onChange={(e) => setCredentialEmail(e.target.value)} className="form-layout mb-2" type="email" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-0">Password</Form.Label>
                        <Form.Control value={credentialPass} onChange={(e) => setCredentialPass(e.target.value)} className="form-layout mb-2" type="text" required />
                    </Form.Group>
                    <Row>
                        <Col className="mt-3">
                            <button type="submit" className="button capsule">Send</button>
                        </Col>
                    </Row>
                </Form>
            </DetailModal>
            {/* Review Modal */}
            <DetailModal
                show={ShowReviewModal}
                onHide={() => setReviewModal(false)}
            >
                <h1>Review</h1>
                <Form className="mt-3" onSubmit={(e) => sendReview(e)}>
                    <Form.Group>
                        <Form.Label>What do you think about us?</Form.Label>
                        <Form.Control value={titleReview} onChange={(e) => setTitleReview(e.target.value)} className="form-layout mb-2" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Can you tell us about your experiance?</Form.Label>
                        <Form.Control value={bodyReview} onChange={(e) => setBodyReview(e.target.value)} className="form-layout mb-4" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Your rate :
                            {' '}
                            {rateReview}
                        </Form.Label>
                        <input value={rateReview} onChange={(e) => setRateReview(e.target.value)} className="form-layout mb-w-90 range-input mt-3" type="range" max={5} min={0} />
                    </Form.Group>
                    <Row>
                        <Col className="mt-3">
                            <button className="button capsule" type="submit">
                                Send
                            </button>
                        </Col>
                    </Row>
                </Form>
            </DetailModal>
        </div>

    );
}
