/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Col, Form, Table, Row, Pagination,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { PayPalButton } from 'react-paypal-button-v2';
import { useAppDispatch } from '../../../hooks';
import DetailModal from '../../Detail-Modal';
import ImageGalery from '../../ImageGalery';
import { decrypt } from '../../../utils/crypto';

import { asyncUserGetBoostOrder, asyncUserGetAccountOrder, asyncUserMakeReview } from '../../../state/orderList/action';
import { userChangeStatusBoost, userChangeStatusAccount } from '../../../state/checkoutDetail/action';

import styles from '../../styles/DetailPage.module.css';

export default function UserOrder({ orders }) {
    const dispatch = useAppDispatch();

    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [typeOrder, setTypeOrder] = useState('Boost');

    const [ShowDetailModal, setDetailModal] = useState(false);
    const [ShowCredentialModal, setCredentialModal] = useState(false);
    const [ShowAttachModal, setAttachModal] = useState(false);
    const [ShowReviewModal, setReviewModal] = useState(false);
    const [ViewReviewModal, setViewReviewModal] = useState(false);

    const [titleReview, setTitleReview] = useState('');
    const [bodyReview, setBodyReview] = useState('');
    const [rateReview, setRateReview] = useState('0');

    const [credentials, setCredentials] = useState<any>();
    const [attachments, setAttachments] = useState<any>([]);

    // Paypal script load
    const [scriptLoaded, setScriptLoaded] = useState<any>(false);
    // Metamask
    const [ethereum, setEthereum] = useState<any>();

    const [paginationPage, setPaginationPage] = useState(1);
    const pagination: any = [];

    function clearForm() {
        setReviewModal(false);
        setTitleReview('');
        setBodyReview('');
        setRateReview('0');
    }

    function getOrderByType(page) {
        if (typeOrder === 'Boost') {
            dispatch(asyncUserGetBoostOrder(page));
        } else {
            dispatch(asyncUserGetAccountOrder(page));
        }
    }

    async function sendReview(e) {
        e.preventDefault();
        const data = {
            reviewable_id: selectedOrder?.detail.boost_id || selectedOrder?.detail.account_id,
            reviewable_type: typeOrder,
            review_title: titleReview,
            review_body: bodyReview,
            rating: rateReview,
            is_shown: false,
        };

        dispatch(asyncUserMakeReview(data, typeOrder));
        clearForm();
    }

    function getCredentials(data) {
        const accountCredential = {
            email: decrypt(data?.detail?.account_credential?.account_email),
            email_password: decrypt(data?.detail?.account_credential?.account_email_password),
            username: decrypt(data?.detail?.account_credential?.account_username),
            password: decrypt(data?.detail?.account_credential?.account_password),
        };
        setCredentials(accountCredential);
    }

    function seeAttachment(data) {
        data.detail?.boost_done_ss?.forEach(async (image) => {
            await axios.get(image, {
                responseType: 'blob',
            })
                .then((res: any) => res.data)
                .then((imageBlob) => {
                    const blobedImage = URL.createObjectURL(imageBlob);
                    setAttachments([...attachments, blobedImage]);
                    return () => URL.revokeObjectURL(blobedImage);
                });
        });
    }

    // Setup Payment Gateaway
    const setupPaypal = () => {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.CLIENT_ID}`;
        script.type = 'text/javascript';
        script.async = true;
        script.onload = () => setScriptLoaded(true);
        document.body.appendChild(script);
    };

    function setupETH(window: any) {
        setEthereum(window.ethereum);
    }

    async function doPayment(form, data) {
        if (typeOrder === 'Boost') {
            dispatch(userChangeStatusBoost(data?.detail.boost_id, form));
        } else {
            dispatch(userChangeStatusAccount(data?.detail.account_order_id, form));
        }
    }

    async function paymentForm(data, address) {
        const form = {
            full_name: address.order_address.full_name,
            country: address.order_address.country,
            billing_address: address.order_address.billing_address,
            city: address.order_address.city,
            zip_code: address.order_address.zip_code,
            address: 'x',
            payment_method: address.payment,
            payment_id: data?.hash || data?.purchase_units[0]?.payments?.captures[0]?.id,
        };

        await doPayment(form, address);
    }

    async function payMetamask(data) {
        if (ethereum !== undefined) {
            await ethereum.send('eth_requestAccounts');
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            await signer.sendTransaction({
                to: process.env.CRYPTO_WALLET_ADDRESS,
                value: ethers.utils.parseEther(data.totalPrice).toString(),
            })
                .then((res) => {
                    paymentForm(res, data);
                }).catch((err) => {
                    alert('Payment Cancelled');
                });
        } else {
            alert('You have to install Metamask first');
        }
    }

    useEffect(() => {
        setupPaypal();
        setupETH(window);
    }, []);

    useEffect(() => {
        getOrderByType(paginationPage);
    }, [typeOrder, paginationPage]);

    for (let i = 1; i <= orders?.last_page; i++) {
        pagination.push(
            <Pagination.Item className="pagination-items mx-1" key={i} active={i === paginationPage} onClick={() => setPaginationPage(i)}>
                {i}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Col className="center-start mb-3">
                <Form.Group className="width150px">
                    <Form.Label>Order Type</Form.Label>
                    <Form.Select className="form-layout" onChange={(e) => setTypeOrder(e.target.value)}>
                        <option value="Boost">Boost</option>
                        <option value="Account">Account</option>
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
                    {orders?.data?.map((order) => (
                        <tr key={order.boost_id}>
                            <td>{order.order_date}</td>
                            <td>{order.game}</td>
                            <td>{order.service}</td>
                            <td>{order.status}</td>
                            <td>
                                {order.status === 'Finished' && (
                                    <>
                                        {typeOrder === 'Boost' ? (
                                            <button onClick={() => { setAttachModal(true); seeAttachment(order); }} className="capsule button">Attachment</button>

                                        ) : (
                                            <button onClick={() => { setCredentialModal(true); getCredentials(order); }} className="capsule button mx-1">Credential</button>
                                        )}
                                        <button onClick={() => { setReviewModal(true); setSelectedOrder(order); }} className="capsule button-org-border mx-1">Review</button>
                                    </>
                                )}
                                {order.status === 'Unpaid' && (
                                    <>
                                        <div className={`${order.payment !== 'Paypal' && scriptLoaded ? ('hide') : (null)}`}>
                                            <PayPalButton
                                                style={{
                                                    color: 'blue', layout: 'horizontal', tagline: false, shape: 'pill', height: 40,
                                                }}
                                                amount={order?.total_price}
                                                onSuccess={(data) => paymentForm(data, order)}
                                            />
                                        </div>
                                        <div className={`${order.payment !== 'Metamask' && ('hide')}`}>
                                            <button className="button capsule mb-2" type="button" onClick={() => payMetamask(order)}>Metamask Payment</button>
                                        </div>
                                    </>
                                )}
                                {order.status === 'Reviewed' && (
                                    <button onClick={() => { setViewReviewModal(true); setSelectedOrder(order); }} className="capsule button-org-border mx-1">Review</button>
                                )}
                                <button onClick={() => { setDetailModal(true); setSelectedOrder(order); }} className="capsule button-org">Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination */}
            <Row className="mt-4 mb-3">
                {orders?.last_page && (
                    <Col>
                        <Pagination className={styles['pagination-container']}>
                            {paginationPage > 1 && (
                                <Pagination.Prev className="mx-1" onClick={() => setPaginationPage(paginationPage - 1)} />
                            )}

                            {pagination}

                            {paginationPage !== orders.last_page && (
                                <Pagination.Next className="mx-1" onClick={() => setPaginationPage(paginationPage + 1)} />
                            )}
                        </Pagination>
                    </Col>
                )}
            </Row>

            {/* Detail Modal */}
            <DetailModal
                sizing="lg"
                show={ShowDetailModal}
                onHide={() => setDetailModal(false)}
            >
                <h1>Details</h1>
                <hr />

                <Row>
                    {/* General Detail */}
                    <Col className="flex-down col-12 col-md-6">
                        <h4 className="text-org">General</h4>
                        <span>
                            Status :
                            {' '}
                            {selectedOrder?.status}
                        </span>
                        <span>
                            Order ID :
                            {' '}
                            {selectedOrder?.detail.boost_id || selectedOrder?.detail.account_order_id}
                        </span>
                        <span>
                            Order Date :
                            {' '}
                            {selectedOrder?.order_date}
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
                    </Col>
                    {/* Boost Detail */}
                    <Col className="flex-down flex-start col-12 col-md-6">
                        <h4 className="text-org">Order Spesification</h4>
                        {selectedOrder?.detail.boost_detail !== undefined ? (
                            <Row>
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
                                {selectedOrder?.detail?.boost_detail?.map((item) => (
                                    <span className={styles['booster-detail-list']}>
                                        {`${Object.keys(item).toString().replace('_', ' ')} : ${item[Object.keys(item).toString()].start ? (`${item[Object.keys(item).toString()].start} - ${item[Object.keys(item).toString()].to}`) : (item[Object.keys(item).toString()])}`}
                                    </span>
                                ))}
                            </Row>
                        ) : (
                            <Row>
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
                                {
                                    selectedOrder?.detail.account_detail?.map((item) => (
                                        <span className={styles['booster-detail-list']}>
                                            {`${Object.keys(item).toString().replace('_', ' ')} : ${item[Object.keys(item).toString()].start ? (`${item[Object.keys(item).toString()].start} - ${item[Object.keys(item).toString()].to}`) : (item[Object.keys(item).toString()])}`}
                                        </span>
                                    ))
                                }
                            </Row>
                        )}
                    </Col>
                </Row>
                <hr />
                {/* Add Ons */}
                {selectedOrder?.detail?.add_ons !== undefined && (
                    <Row>
                        {selectedOrder?.detail?.add_ons[0].name !== 'None' && (
                            <Col className="flex-down col-md-6 col-sm-12 ">
                                <h4 className="text-org">Add Ons</h4>
                                <span>Add Ons : </span>
                                <ul className="px-5">
                                    {selectedOrder?.detail?.add_ons?.map((list) => (
                                        <li>{list.name}</li>
                                    ))}
                                </ul>
                            </Col>
                        )}
                        {selectedOrder?.detail?.add_ons.filter((e) => e.name === 'Play With Booster').length > 0 && (
                            <Col className="col-md-6 col-sm-12 ">
                                <div className="centered my-3">
                                    <button type="button" className="button capsule">
                                        <a target="_blank" href={process.env.DISCORD_LINK} rel="noreferrer">
                                            <i className="fa-brands fa-discord" />
                                            {' '}
                                            Chat Booster
                                        </a>
                                    </button>
                                </div>
                            </Col>
                        )}
                    </Row>
                )}
                <hr />
                {/* Address */}
                {selectedOrder?.order_address !== undefined && (
                    <Row>
                        <h4 className="text-org">My Address</h4>
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
                <h2>Credential</h2>
                <Row>
                    <h5 className="text-org">Credential Account</h5>
                    <span>
                        Email :
                        {' '}
                        {credentials?.email}
                    </span>
                    <span>
                        Email Password:
                        {' '}
                        {credentials?.email_password}
                    </span>
                    <span>
                        Username :
                        {' '}
                        {credentials?.username}
                    </span>
                    <span>
                        Password :
                        {' '}
                        {credentials?.password}
                    </span>
                </Row>
            </DetailModal>
            {/* Attachment Modal */}
            <DetailModal
                sizing="lg"
                show={ShowAttachModal}
                onHide={() => { setAttachModal(false); setAttachments([]); }}
            >
                <h2>Attachment</h2>
                <Row>
                    <ImageGalery images={attachments} />
                </Row>
            </DetailModal>
            {/* Review Modal */}
            <DetailModal
                show={ShowReviewModal}
                onHide={() => setReviewModal(false)}
            >
                <h1>Review</h1>
                <Form className="mt-3" onSubmit={(e) => sendReview(e)}>
                    <Row>
                        <Col className="col-12 flex-down centered">
                            <span className="review-num">
                                {rateReview}
                            </span>
                            <input value={rateReview} onChange={(e) => setRateReview(e.target.value)} className="form-layout mb-w-90 range-input mt-3" type="range" max={5} min={0} />
                        </Col>
                        <Col className="col-12 flex-down mt-5">
                            <Form.Group>
                                <h5 className="text-org">Title :</h5>
                                <Form.Control value={titleReview} onChange={(e) => setTitleReview(e.target.value)} className="form-layout mb-2" />
                            </Form.Group>
                            <Form.Group>
                                <h5 className="text-org">Review :</h5>
                                <Form.Control value={bodyReview} onChange={(e) => setBodyReview(e.target.value)} className="form-layout mb-4" />
                            </Form.Group>
                            <Form.Group />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-3">
                            <button className="button capsule" type="submit">
                                Send
                            </button>
                        </Col>
                    </Row>
                </Form>
            </DetailModal>
            {/* Show Modal */}
            <DetailModal
                show={ViewReviewModal}
                onHide={() => setViewReviewModal(false)}
            >
                <h1>Review</h1>
                <Row className="mt-3">
                    <Col className="col-12 col-md-3">
                        <span className="review-num">
                            {selectedOrder?.review?.rating}
                        </span>
                    </Col>
                    <Col className="col-12 col-md-9">
                        <Row className="w-100">
                            <h5 className="text-org">Title :</h5>
                            <span>{selectedOrder?.review?.review_title}</span>
                            <h5 className="text-org mt-3">Review :</h5>
                            <span>{selectedOrder?.review?.review_body}</span>
                        </Row>
                    </Col>
                </Row>
            </DetailModal>
        </div>

    );
}
