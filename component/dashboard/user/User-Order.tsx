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

import { asyncUserGetBoostOrder, asyncUserGetAccountOrder, asyncUserMakeReview } from '../../../state/orderList/action';

import styles from '../../styles/DetailPage.module.css';

export default function UserOrder({ orders }) {
    const dispatch = useAppDispatch();

    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [typeOrder, setTypeOrder] = useState('boost');
    const [ShowDetailModal, setDetailModal] = useState(false);

    const [ShowCredentialModal, setCredentialModal] = useState(false);

    const [titleReview, setTitleReview] = useState('');
    const [bodyReview, setBodyReview] = useState('');
    const [rateReview, setRateReview] = useState('0');
    const [ShowReviewModal, setReviewModal] = useState(false);

    function clearForm() {
        setReviewModal(false);
        setTitleReview('');
        setBodyReview('');
        setRateReview('0');
    }

    function getOrderByType() {
        if (typeOrder === 'boost') {
            dispatch(asyncUserGetBoostOrder());
        } else {
            dispatch(asyncUserGetAccountOrder());
        }
    }

    async function sendReview(e) {
        e.preventDefault();
        const data = {
            review_title: titleReview,
            review_body: bodyReview,
            rating: rateReview,
            is_shown: false,
        };
        dispatch(asyncUserMakeReview(data));
        clearForm();
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
                                {order.status === 'Finished' && (
                                    <>
                                        {typeOrder === 'Boost' ? (
                                            <button className="capsule button">Attachment</button>

                                        ) : (
                                            <button onClick={() => setCredentialModal(true)} className="capsule button mx-2">Credential</button>
                                        )}
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
                        Order ID :
                        {' '}
                        {selectedOrder?.id || selectedOrder?.detail.account_order_id}
                    </span>
                    {selectedOrder?.total_price !== undefined && (
                        <span>
                            Total Price :
                            {' $'}
                            {selectedOrder?.total_price}
                        </span>
                    )}
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
                <h5 className="text-org">Spesification</h5>
                {selectedOrder?.detail.boost_detail !== undefined ? (
                    <Row>
                        {selectedOrder?.detail.boost_detail?.map((item) => (
                            <span className={styles['booster-detail-list']}>
                                {`${Object.keys(item).toString().replace('_', ' ')} : ${item[Object.keys(item).toString()].start ? (`${item[Object.keys(item).toString()].start} - ${item[Object.keys(item).toString()].to}`) : (item[Object.keys(item).toString()])}`}
                            </span>
                        ))}
                    </Row>
                ) : (
                    <Row>
                        {
                            selectedOrder?.detail.account_detail?.map((item) => (
                                <span className={styles['booster-detail-list']}>
                                    {`${Object.keys(item).toString().replace('_', ' ')} : ${item[Object.keys(item).toString()].start ? (`${item[Object.keys(item).toString()].start} - ${item[Object.keys(item).toString()].to}`) : (item[Object.keys(item).toString()])}`}
                                </span>
                            ))
                        }
                    </Row>
                )}

                <hr />
                {/* Add Ons */}
                {selectedOrder?.detail?.add_ons !== undefined && (
                    <Row>
                        {selectedOrder?.detail?.add_ons[0].name !== 'None' && (
                            <>
                                <h5 className="text-org">Add Ons</h5>
                                <span>Add Ons : </span>
                                <ul className="px-5">
                                    {selectedOrder?.detail?.add_ons?.map((list) => (
                                        <li>{list.name}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Row>
                )}

                {/* Address */}
                {selectedOrder?.order_address !== undefined && (
                    <Row>
                        <h5 className="text-org">Address</h5>
                        <span>
                            Name :
                            {' '}
                            {selectedOrder?.order_address.full_name}
                        </span>
                        <span>
                            Country :
                            {' '}
                            {selectedOrder?.order_address.country}
                        </span>
                        <span>
                            City :
                            {' '}
                            {selectedOrder?.order_address.city}
                        </span>
                        <span>
                            Billing Address :
                            {' '}
                            {selectedOrder?.order_address.billing_address}
                        </span>
                        <span>
                            Zip Code :
                            {' '}
                            {selectedOrder?.order_address.zip_code}
                        </span>
                    </Row>
                )}

            </DetailModal>
            {/* Credential Modal */}
            <DetailModal
                show={ShowCredentialModal}
                onHide={() => setCredentialModal(false)}
            >
                <h2>Your Credential</h2>
                <div>
                    <h5 className="text-org">Credential Account</h5>
                    <span>Ini Credential</span>
                </div>
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
