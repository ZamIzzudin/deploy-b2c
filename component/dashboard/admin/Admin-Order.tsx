/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Col, Form, Table, Row, Pagination, FormSelect,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../../hooks';
import DetailModal from '../../Detail-Modal';
import ImageGalery from '../../ImageGalery';
import { decrypt } from '../../../utils/crypto';

import { giveCredential, changeAllAccountBoost, changeAllAccountStatus } from '../../../state/flow/admin-action';
import { asyncAdminGetBoostOrder, asyncAdminGetAccountOrder } from '../../../state/orderList/action';

import styles from '../../styles/DetailPage.module.css';

export default function AdminOrder({ orders }) {
    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [status, setStatus] = useState<any>('unpaid');
    const [typeOrder, setTypeOrder] = useState('boost');

    const [ShowDetailModal, setDetailModal] = useState(false);
    const [ShowAttachModal, setAttachModal] = useState(false);
    const [ShowReviewModal, setReviewModal] = useState(false);

    const [credentials, setCredentials] = useState<any>();
    const [attachments, setAttachments] = useState<any>([]);

    const [paginationPage, setPaginationPage] = useState(1);
    const pagination: any = [];

    const dispatch = useAppDispatch();

    function getOrderByType(page) {
        if (typeOrder === 'boost') {
            dispatch(asyncAdminGetBoostOrder(page));
        } else {
            dispatch(asyncAdminGetAccountOrder(page));
        }
    }

    function finishAccountOrder(id) {
        dispatch(giveCredential(id));
    }

    function getCredentialAccount(data) {
        if (typeOrder === 'boost') {
            const credentialAccount = decrypt(data.notes);
            setCredentials(JSON.parse(credentialAccount));
        } else {
            const credentialAccount = {
                username: decrypt(data.detail.account_credential.account_username),
                password: decrypt(data.detail.account_credential.account_password),
                email: decrypt(data.detail.account_credential.account_email),
                email_password: decrypt(data.detail.account_credential.account_email_password),
            };

            setCredentials(credentialAccount);
        }
    }

    function seeAttachment(data) {
        data?.boost_done_ss?.forEach(async (image) => {
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

    function changeStatus(sts) {
        setStatus(sts);
        const newStatus = sts.toLowerCase().replace(' ', '-');
        if (typeOrder === 'boost') {
            const id = selectedOrder.boost_id;
            dispatch(changeAllAccountBoost(id, newStatus));
            setDetailModal(false);
        } else {
            const id = selectedOrder.detail.account_order_id;
            dispatch(changeAllAccountStatus(id, newStatus));
            setDetailModal(false);
        }
    }

    useEffect(() => {
        getOrderByType(paginationPage);
    }, [typeOrder, paginationPage]);

    useEffect(() => {
        setStatus(selectedOrder?.status);
    }, [selectedOrder]);

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
                    {orders?.data?.map((order) => (
                        <tr key={order.boost_id}>
                            <td>{order.order_date || order.order_created.slice(0, 10)}</td>
                            <td>{order.game_name || order.game}</td>
                            <td>{order.service_name || order.service}</td>
                            <td>{order.status}</td>
                            <td>
                                {order.status !== 'Finished' && typeOrder !== 'boost' && (
                                    <button className="capsule button-border mx-2" onClick={() => finishAccountOrder(order.detail.account_order_id)}>Send Credential</button>
                                )}
                                {order.status === 'Finished' && typeOrder === 'boost' && (
                                    <button className="capsule button-border mx-2" onClick={() => { setAttachModal(true); seeAttachment(order); }}>Attachment</button>
                                )}
                                {order.status === 'Reviewed' && (
                                    <button className="capsule button-border mx-2" onClick={() => { setReviewModal(true); setSelectedOrder(order); }}>Review</button>
                                )}

                                <button onClick={() => { setDetailModal(true); setSelectedOrder(order); getCredentialAccount(order); }} className="capsule button-org">Details</button>

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
                            {selectedOrder?.boost_id || selectedOrder?.detail.account_order_id}
                        </span>
                        <span>
                            Order Date :
                            {' '}
                            {selectedOrder?.order_date}
                        </span>
                        <span>
                            Customer Username :
                            {' '}
                            {selectedOrder?.user_name}
                        </span>
                        <span>
                            Booster Username :
                            {' '}
                            {selectedOrder?.booster_name}
                        </span>
                        <span>
                            Payment Method :
                            {' '}
                            {selectedOrder?.address.payment_method}
                        </span>
                        <span>
                            Total Price :
                            {' $'}
                            {selectedOrder?.total_price}
                        </span>
                    </Col>
                    {/* Boost Detail */}
                    <Col className="flex-down flex-start col-12 col-md-6">
                        <h4 className="text-org">Spesification</h4>
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
                                {selectedOrder?.detail.boost_detail?.map((item) => (
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
                            <>
                                <h4 className="text-org">Add Ons</h4>
                                <span>Add Ons : </span>
                                <ul className="px-5">
                                    {selectedOrder?.detail?.add_ons?.map((list) => (
                                        <li>{list.name}</li>
                                    ))}
                                </ul>
                                <hr />
                            </>
                        )}
                    </Row>
                )}
                <Row>
                    <h4 className="text-org">Customer Address</h4>
                    <span>
                        Name :
                        {' '}
                        {selectedOrder?.address?.full_name}
                    </span>
                    <span>
                        Country :
                        {' '}
                        {selectedOrder?.address?.country}
                    </span>
                    <span>
                        City :
                        {' '}
                        {selectedOrder?.address?.city}
                    </span>
                    <span>
                        Billing Address :
                        {' '}
                        {selectedOrder?.address?.billing_address}
                    </span>
                    <span>
                        Zip Code :
                        {' '}
                        {selectedOrder?.address?.zip_code}
                    </span>
                </Row>
                <hr />
                {/* Credential */}
                {credentials?.username !== undefined && (
                    <Row>
                        <h4 className="text-org">Credentials</h4>
                        <span>
                            Username :
                            {' '}
                            {credentials.username}
                        </span>
                        <span>
                            Password :
                            {' '}
                            {credentials.password}
                        </span>
                        {typeOrder !== 'boost' && (
                            <>
                                <span>
                                    Email :
                                    {' '}
                                    {credentials.email}
                                </span>
                                <span>
                                    Email Passwordd :
                                    {' '}
                                    {credentials.email_password}
                                </span>
                            </>
                        )}
                    </Row>
                )}
                <hr />
                {selectedOrder?.status !== 'Reviewed' && (
                    <Row className="my-4">
                        <h4 className="text-org">Change Status</h4>
                        <FormSelect className="form-layout" value={status} onChange={(e) => changeStatus(e.target.value)}>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="On Progress">On Progress</option>
                            <option value="Finished">Finished</option>
                            <option value="Reviewed">Reviewed</option>
                        </FormSelect>
                    </Row>
                )}
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
