/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import {
    Table, Row, Col, Pagination,
} from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '../../../hooks';
import DetailModal from '../../Detail-Modal';
import { decrypt } from '../../../utils/crypto';

import { asyncBoosterGetBoostOrder } from '../../../state/orderList/action';

import styles from '../../styles/DetailPage.module.css';

export default function BoosterOrder({ orders }) {
    const [newScreenshoot, setNewScreenShoot] = useState<any>([]);
    const [showScreenshoot, setShowScreenShoot] = useState<any>([]);

    const [selectedOrder, setSelectedOrder] = useState<any>();
    const [ShowDetailModal, setDetailModal] = useState(false);
    const [ShowCredentialsModal, setCredentialsModal] = useState(false);
    const [ShowAttachModal, setAttachModal] = useState(false);
    const [ShowReviewModal, setReviewModal] = useState(false);

    const [credentials, setCredentials] = useState<any>();

    const [paginationPage, setPaginationPage] = useState(1);
    const pagination: any = [];

    const dispatch = useAppDispatch();
    const fileForm = useRef<any>();

    async function finishOrder(id) {
        const url = `${process.env.API}/booster/boost/${id}?status=finished`;
        const form = new FormData();

        newScreenshoot.forEach((image) => {
            form.append('boost_done_ss', image);
        });

        await axios.post(url, form).then((res) => {
            dispatch(asyncBoosterGetBoostOrder());
            setAttachModal(false);
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

    function getCredentials(data) {
        const accountCredential = decrypt(data.notes);
        setCredentials(JSON.parse(accountCredential));
    }

    useEffect(() => {
        dispatch(asyncBoosterGetBoostOrder(paginationPage));
    }, [paginationPage]);

    for (let i = 1; i <= orders?.last_page; i++) {
        pagination.push(
            <Pagination.Item className="pagination-items mx-1" key={i} active={i === paginationPage} onClick={() => setPaginationPage(i)}>
                {i}
            </Pagination.Item>,
        );
    }

    return (
        <div>
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
                                {(order.status !== 'Finished' && order.status !== 'Reviewed') && (
                                    <button onClick={() => { setAttachModal(true); setSelectedOrder(order); }} className="capsule button-org-border">Finish</button>
                                )}
                                {(order.status === 'Reviewed') && (
                                    <button onClick={() => { setReviewModal(true); setSelectedOrder(order); }} className="capsule button-border">Review</button>
                                )}
                                {order.status === 'On Progress' && (
                                    <button onClick={() => { setCredentialsModal(true); getCredentials(order); }} className="capsule button">Credential</button>
                                )}
                                <button onClick={() => { setDetailModal(true); setSelectedOrder(order); }} className="capsule button-org mx-2">Details</button>
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
                    <Col className="flex-down flex-start col-12 col-md-6">
                        <h4 className="text-org">General</h4>
                        <span>
                            Status :
                            {' '}
                            {selectedOrder?.status}
                        </span>
                        <span>
                            Order ID :
                            {' '}
                            {selectedOrder?.boost_id}
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
                    </Col>
                    {/* Boost Detail */}
                    <Col className="flex-down flex-start col-12 col-md-6">
                        <h4 className="text-org">Spesification</h4>
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
                            selectedOrder?.detail.boost_detail?.map((item) => (
                                <span className={styles['booster-detail-list']}>
                                    {`${Object.keys(item).toString().replace('_', ' ')} :
                                ${item[Object.keys(item).toString()].start
                                            ? (`${item[Object.keys(item).toString()].start} - ${item[Object.keys(item).toString()].to}`)
                                            : (item[Object.keys(item).toString()])}`}
                                </span>
                            ))
                        }
                    </Col>
                </Row>
                <hr />
                {/* Add Ons */}
                {selectedOrder?.detail.add_ons[0].name !== 'None' && (
                    <Row>
                        <h4 className="text-org">Add Ons</h4>
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
            <DetailModal
                show={ShowCredentialsModal}
                onHide={() => setCredentialsModal(false)}
            >
                <h1>Credential</h1>
                <Row>
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
                        <button className="button-org-border capsule my-3" onClick={() => fileForm.current?.click()}>
                            Choose File *Max 2 mb
                        </button>
                    </Col>
                </Row>
                <Row>
                    <button onClick={() => finishOrder(selectedOrder?.boost_id)} className="button capsule">Finish Order</button>
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
