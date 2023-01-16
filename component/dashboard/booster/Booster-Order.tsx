/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import {
    Table, Row,
} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../hooks';
import DetailModal from '../../Detail-Modal';
import { asyncBoosterGetBoostOrder } from '../../../state/orderList/action';

import styles from '../../styles/DetailPage.module.css';

export default function BoosterOrder({ orders }) {
    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [ShowDetailModal, setDetailModal] = useState(false);

    const dispatch = useAppDispatch();

    async function finishOrder(id) {
        const url = `${process.env.API}/boosts/${id}?status=finished`;

        await axios.put(url, {}).then((res) => {
            dispatch(asyncBoosterGetBoostOrder());
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        dispatch(asyncBoosterGetBoostOrder());
    }, []);

    return (
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
                                <button onClick={() => finishOrder(order.id)} className="capsule button-org-border">Finish</button>
                            )}
                            {order.status === 'On Progress' && (
                                <button className="capsule button mx-2">Credential</button>
                            )}

                            {order.status === 'Finished' && (
                                <button className="capsule button mx-2">Attachment</button>
                            )}
                            <button onClick={() => { setDetailModal(true); setSelectedOrder(order); }} className="capsule button-org">Details</button>
                        </td>
                    </tr>
                ))}
            </tbody>
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
                                {`${Object.keys(item).toString().replace('_', ' ')} : 
                                ${item[Object.keys(item).toString()].start
                                        ? (`${item[Object.keys(item).toString()].start} - ${item[Object.keys(item).toString()].to}`)
                                        : (item[Object.keys(item).toString()])}`}
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

        </Table>
    );
}
