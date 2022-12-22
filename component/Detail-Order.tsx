/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
import {
    Table, Row, Col, Form,
} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../hooks';
import DetailModal from './Detail-Modal';
import styles from './styles/DetailPage.module.css';

import UserOrder from './dashboard/user/User-Order';
import BoosterOrder from './dashboard/booster/Booster-Order';
import AdminOrder from './dashboard/admin/Admin-Order';

function DetailOrder(props: any) {
    const { role, token } = props;

    const { orderList } = useAppSelector((states) => states);

    // const [modal, showModal] = useState(false);
    // const [modal2, showModal2] = useState(false);
    // const [modal3, showModal3] = useState(false);
    // const [modal4, showModal4] = useState(false);

    return (
        <div>
            {role === 'user' && (
                <UserOrder orders={orderList} token={token} />
            )}
            {role === 'booster' && (
                <BoosterOrder orders={orderList} token={token} />
            )}
            {role === 'admin' && (
                <AdminOrder orders={orderList} token={token} />
            )}
            {/* <DetailModal
                show={modal}
                onHide={() => showModal(false)}
            >
                <h1>Chat</h1>
            </DetailModal>
            <DetailModal
                show={modal2}
                onHide={() => showModal2(false)}
            >
                <h1>Rate</h1>
            </DetailModal>
            <DetailModal
                show={modal3}
                onHide={() => showModal3(false)}
            >
                <h1>Details</h1>
                <Row>
                    <span>
                        Total Price :
                        {' '}
                        {selectedOrder.total_price}
                    </span>
                    <span>
                        Payment Method :
                        {' '}
                        {selectedOrder.payment}
                    </span>
                </Row>
                <Row>
                    {
                        selectedOrder.detail.boost_detail?.map((item) => (
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
                <Row>
                    <span>Add Ons : </span>
                    <ul className="px-5">
                        {selectedOrder.detail.add_ons?.map((list) => (
                            <li>{list.name}</li>
                        ))}
                    </ul>

                </Row>
            </DetailModal>
            <DetailModal
                show={modal4}
                onHide={() => showModal4(false)}
            >
                <h1>Finish</h1>
            </DetailModal> */}
        </div>
    );
}

export default DetailOrder;
