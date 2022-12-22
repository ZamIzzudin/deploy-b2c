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
import { asyncAdminGetBoostOrder, asyncAdminGetAccountOrder } from '../../../state/orderList/action';

export default function AdminOrder({ orders, token }) {
    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [typeOrder, setTypeOrder] = useState('boost');
    const [ShowDetailModal, setDetailModal] = useState(false);

    const dispatch = useAppDispatch();

    function getOrderByType() {
        if (typeOrder === 'boost') {
            dispatch(asyncAdminGetBoostOrder(token));
        } else {
            dispatch(asyncAdminGetAccountOrder(token));
        }
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
                        Total Price :
                        {' '}
                        {selectedOrder?.total_price}
                    </span>
                    <span>
                        Payment Method :
                        {' '}
                        {selectedOrder?.payment}
                    </span>
                </Row>
                {/* Boost Detail */}
                <Row>
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
                {/* Add Ons */}
                <Row>
                    <span>Add Ons : </span>
                    <ul className="px-5">
                        {selectedOrder?.detail.add_ons?.map((list) => (
                            <li>{list.name}</li>
                        ))}
                    </ul>

                </Row>
            </DetailModal>
        </div>

    );
}
