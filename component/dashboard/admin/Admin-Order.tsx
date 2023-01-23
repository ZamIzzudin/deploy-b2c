/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    Col, Form, Table, Row,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../../hooks';
import DetailModal from '../../Detail-Modal';
import ImageGalery from '../../ImageGalery';
import { decrypt } from '../../../utils/crypto';

import { giveCredential } from '../../../state/flow/admin-action';
import { asyncAdminGetBoostOrder, asyncAdminGetAccountOrder } from '../../../state/orderList/action';

import styles from '../../styles/DetailPage.module.css';

export default function AdminOrder({ orders }) {
    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [typeOrder, setTypeOrder] = useState('boost');

    const [ShowDetailModal, setDetailModal] = useState(false);
    const [ShowAttachModal, setAttachModal] = useState(false);

    const [credentials, setCredentials] = useState<any>();
    const [attachments, setAttachments] = useState<any>([]);

    const dispatch = useAppDispatch();

    function getOrderByType() {
        if (typeOrder === 'boost') {
            dispatch(asyncAdminGetBoostOrder());
        } else {
            dispatch(asyncAdminGetAccountOrder());
        }
    }

    function finishAccountOrder(id) {
        dispatch(giveCredential(id));
    }

    function getCredentialAccount(data) {
        const credentialAccount = decrypt(data?.notes);
        console.log(JSON.parse(credentialAccount));
        setCredentials(JSON.parse(credentialAccount));
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
                                {typeOrder === 'boost' ? (
                                    <button onClick={() => { setDetailModal(true); setSelectedOrder(order); getCredentialAccount(order); }} className="capsule button-org">Details</button>
                                ) : (
                                    <button onClick={() => { setDetailModal(true); setSelectedOrder(order); }} className="capsule button-org">Details</button>
                                )}
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
                        Total Price :
                        {' $'}
                        {selectedOrder?.total_price}
                    </span>
                </Row>
                <hr />
                {/* Boost Detail */}
                <Row>
                    <h5 className="text-org">Spesification</h5>
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
                </Row>
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
                                <hr />
                            </>
                        )}
                    </Row>
                )}
                {/* Credential */}
                {credentials?.username !== undefined && (
                    <Row>
                        <h5 className="text-org">Credentials</h5>
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
                    </Row>
                )}
            </DetailModal>

            {/* Detail Modal */}
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
        </div>

    );
}
