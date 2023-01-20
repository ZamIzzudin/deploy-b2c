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
import { useAppDispatch } from '../../../hooks';
import DetailModal from '../../Detail-Modal';

import { giveCredential } from '../../../state/flow/admin-action';
import { asyncAdminGetBoostOrder, asyncAdminGetAccountOrder } from '../../../state/orderList/action';

import styles from '../../styles/DetailPage.module.css';

export default function AdminOrder({ orders }) {
    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [typeOrder, setTypeOrder] = useState('boost');
    const [ShowDetailModal, setDetailModal] = useState(false);

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
                                <button onClick={() => { setDetailModal(true); setSelectedOrder(order); }} className="capsule button-org">Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DetailModal
                show={ShowDetailModal}
                onHide={() => setDetailModal(false)}
            >
                <h1>Details</h1>
                {/* General Detail */}
                <Row>
                    <span>
                        Order ID :
                        {' '}
                        {selectedOrder?.detail.boost_order_id || selectedOrder?.detail.account_order_id}
                    </span>
                    <span>
                        Total Price :
                        {' $'}
                        {selectedOrder?.total_price}
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
                                {`${Object.keys(item).toString().replace('_', ' ')} : ${item[Object.keys(item).toString()].start ? (`${item[Object.keys(item).toString()].start} - ${item[Object.keys(item).toString()].to}`) : (item[Object.keys(item).toString()])}`}
                            </span>
                        ))
                    }
                </Row>
                <hr />
                {/* Add Ons */}
                <Row>
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
                </Row>
            </DetailModal>
        </div>

    );
}
