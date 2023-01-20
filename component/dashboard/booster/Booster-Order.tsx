/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import {
    Table, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '../../../hooks';
import DetailModal from '../../Detail-Modal';

import { asyncBoosterGetBoostOrder } from '../../../state/orderList/action';

import styles from '../../styles/DetailPage.module.css';

export default function BoosterOrder({ orders }) {
    const [newScreenshoot, setNewScreenShoot] = useState<any>([]);
    const [showScreenshoot, setShowScreenShoot] = useState<any>([]);

    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [ShowDetailModal, setDetailModal] = useState(false);
    const [ShowAttachModal, setAttachModal] = useState(false);

    const dispatch = useAppDispatch();
    const fileForm = useRef<any>();

    async function finishOrder(id) {
        const url = `${process.env.API}/booster/boost-order/${id}?status=finished`;

        await axios.post(url, {
            boost_done_ss: newScreenshoot,
        }).then((res) => {
            dispatch(asyncBoosterGetBoostOrder());
        }).catch((err) => console.log(err));
    }

    function addScreenshoot(e) {
        const file = e.target.files[0];
        setNewScreenShoot([...newScreenshoot, file]);

        if (file !== undefined) {
            const reader = new FileReader();
            reader.onload = () => {
                const { result } = reader;
                const detail = {
                    src: result,
                    name: file.name,
                };
                setShowScreenShoot([...showScreenshoot, detail]);
            };
            reader.readAsDataURL(file);
        }
    }

    function deleteShowScreenshoot(name) {
        const showSS = showScreenshoot.filter((item) => item.name !== name);
        const showFile = newScreenshoot.filter((file) => file.name !== name);
        setNewScreenShoot(showFile);
        setShowScreenShoot(showSS);
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
                                <button onClick={() => { setAttachModal(true); setSelectedOrder(order); }} className="capsule button-org-border">Finish</button>
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
                        {selectedOrder?.id}
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
            {/* Credential Modal */}
            {/* Finish Attachment */}
            <DetailModal
                show={ShowAttachModal}
                onHide={() => setAttachModal(false)}
            >
                <h5>Upload Attachment</h5>
                <Row>
                    <Col className="flex-down mb-3">
                        <span>Screenshoot</span>
                        <span>{selectedOrder?.id}</span>
                        {showScreenshoot?.map((image) => (
                            <div className="spbetween-horizontal mb-3">
                                <Image src={image.src} height="60px" width="90px" />
                                <span>{image.name}</span>
                                <button className={styles['delete-btn']} onClick={() => deleteShowScreenshoot(image.name)}>
                                    <i className="fa-solid fa-trash-can" />
                                </button>
                            </div>
                        ))}
                        <input type="file" onChange={(e) => { addScreenshoot(e); }} accept="image/png, image/jpg, image/jpeg" hidden ref={fileForm} />
                        <button className="button-org-border capsule" onClick={() => fileForm.current?.click()}>
                            Choose File
                        </button>
                    </Col>
                </Row>
                <Row>
                    <button onClick={() => finishOrder(selectedOrder?.id)} className="button capsule">Finish Order</button>
                </Row>
            </DetailModal>
        </Table>
    );
}
