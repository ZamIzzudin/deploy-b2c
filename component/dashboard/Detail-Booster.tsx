/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-self-assign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-use-before-define */
/* eslint-disable no-trailing-spaces */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../hooks';

import DetailModal from '../Detail-Modal';
import { asyncGetAllOrderToTake, asyncTakeOrder } from '../../state/orderTake/action';

import styles from '../styles/DetailPage.module.css';

function DetailBooster() {
    const dispatch = useAppDispatch();
    const { orderTake, auth } = useAppSelector((states) => states);

    const [modal, showModal] = useState(false);

    // const [boostOrder, setBoostOrder] = useState<any>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>({
        id: undefined,
        boost_detail: [{
            game: { name: '' }, type: '', require: [], addOns: [],
        }],
        total_price: 0,
    });

    useEffect(() => {
        if (auth?.role[0] === 'booster') {
            getBoostOrderList();
        }
    }, []);

    // BOOSTER
    function getBoostOrderList() {
        dispatch(asyncGetAllOrderToTake());
    }

    function takeOrder(id) {
        try {
            dispatch(asyncTakeOrder(id));
            showModal(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            {auth?.role[0] === 'user' && (
                <div className="error-container fullwidth">
                    <Image src="/Jett-Sticker.png" width="300" height="300" />
                    <span className="sec-font">Go Back to Home Page</span>
                    <Link href="/">
                        <button className="button capsule mt-3" type="button">Home</button>
                    </Link>
                </div>
            )}
            {auth?.role[0] === 'booster' && (
                <div className="mt-3 centered">
                    {orderTake.length !== 0 ? (
                        <Row className="fullwidth">
                            {orderTake?.data?.map((order) => (
                                <Col className="col-md-4 col-12 mb-3" key={order?.boost_id}>
                                    <div className="centered w-95-res card flex-down">
                                        <div className="fullwidth flex-right">
                                            <span className={styles['booster-card-date']}>{order?.order_date}</span>
                                        </div>
                                        <Row className="fullwidth mb-3">
                                            <Col className="centered-down p-0">
                                                <span className={styles['booster-card-title']}>{order?.game}</span>
                                                <span className={styles['booster-card-subtitle']}>{order?.service}</span>
                                            </Col>
                                            <Col className="centered-down col-5 p-0">
                                                <span className={styles['booster-card-price']}>
                                                    $
                                                    {order?.total_price}
                                                </span>
                                            </Col>
                                        </Row>
                                        <div className="centered">
                                            <button onClick={() => { showModal(true); setSelectedOrder(order); }} className="button-org capsule">Details</button>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className="error-container ">
                            <Image src="/Jett-Sticker.png" width="300" height="300" />
                            <span className="sec-font">There is No Order Yet</span>
                        </div>
                    )}
                </div>
            )}
            {auth?.role[0] === 'admin' && (
                <div className="error-container fullwidth">
                    <Image src="/Jett-Sticker.png" width="300" height="300" />
                    <span className="sec-font">Features Coming Soon</span>
                </div>
            )}
            {/* Take Order */}
            <DetailModal
                show={modal}
                onHide={() => showModal(false)}
            >
                <h1>Details</h1>
                {/* General Detail */}
                <Row>
                    <h5 className="text-org">General</h5>
                    <span>
                        Order ID :
                        {' '}
                        {selectedOrder?.boost_id}
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
                        selectedOrder?.detail?.boost_detail?.map((item) => (
                            <span className={styles['booster-detail-list']}>
                                {`${Object.keys(item).toString().replace('_', ' ')} : 
                                ${item[Object.keys(item).toString()]?.start
                                        ? (`${item[Object.keys(item).toString()].start} - ${item[Object.keys(item).toString()].to}`)
                                        : (item[Object.keys(item).toString()])}`}
                            </span>
                        ))
                    }
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
                            </>
                        )}
                    </Row>
                )}
                <Row>
                    <Col className="mt-3">
                        <button onClick={() => takeOrder(selectedOrder?.boost_id)} className="button-org capsule">Take Order</button>
                    </Col>
                </Row>
            </DetailModal>
        </div>
    );
}

export default DetailBooster;
