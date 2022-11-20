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
import DetailModal from './Detail-Modal';
import styles from './styles/DetailPage.module.css';

function DetailOrder(props: any) {
    const { role, token } = props;
    const [modal, showModal] = useState(false);
    const [modal2, showModal2] = useState(false);
    const [modal3, showModal3] = useState(false);
    const [modal4, showModal4] = useState(false);

    const [typeOrder, setTypeOrder] = useState('boost');
    const [orders, setOrders] = useState<any>([]);

    const [selectedOrder, setSelectedOrder] = useState({
        boost_detail: {
            boost_detail: [{
                game: { name: '' }, type: '', require: [],
            }],
            add_ons: [{ name: '' }],
        },
        total_price: 0,
    });

    async function getTypeByOrder() {
        let url = `${process.env.API}/account/account-order`;

        if (typeOrder === 'boost' && role === 'user') {
            url = `${process.env.API}/profile/detail`;
        } if (typeOrder === 'boost' && role === 'booster') {
            url = `${process.env.API}/booster/detail`;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        await axios.get(url, config)
            .then((res) => {
                if (typeOrder === 'boost' && role === 'user') {
                    setOrders(res.data.boost_order);
                    console.log(res.data.boost_order);
                } else if (typeOrder === 'boost' && role === 'booster') {
                    setOrders(res.data.data);
                    console.log(res.data.data);
                } else {
                    setOrders(res.data.data);
                    console.log(res.data.data);
                }
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getTypeByOrder();
    }, []);

    useEffect(() => {
        getTypeByOrder();
    }, [typeOrder]);

    return (
        <div>
            {role === 'user' && (
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
                            {orders.map((order) => (
                                <tr key={order.boost_id}>
                                    <td>{order.created_at?.slice(0, 10) || 'None'}</td>
                                    <td>Genshin Impact</td>
                                    <td>Daily Mission</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button onClick={() => { showModal3(true); setSelectedOrder(order); }} className="capsule button-org">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
            {role === 'booster' && (
                <div>
                    <Table responsive="sm" borderless>
                        <thead>
                            <tr>
                                <th>Order Date</th>
                                <th>Game</th>
                                <th>Service</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr>
                                    <td>{order.created_at?.slice(0, 10) || 'None'}</td>
                                    <td>Genshin Impact</td>
                                    <td>Daily Mission</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button onClick={() => showModal4(true)} className="capsule button-org-border">Finish</button>
                                    </td>
                                    <td>
                                        <button onClick={() => { showModal3(true); setSelectedOrder(order); }} className="capsule button-org">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

            )}
            {role === 'admin' && (
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
                                <th>Id</th>
                                <th>Game</th>
                                <th>Service</th>
                                <th>Booster</th>
                                <th>Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>7567335</td>
                                <td>Genshin Impact</td>
                                <td>Daily Mission</td>
                                <td>Agus</td>
                                <td>On Process</td>
                                <td className="centered"><button onClick={() => showModal3(true)} className="button-org-border capsule">Details</button></td>
                            </tr>
                            <tr>
                                <td>5647353</td>
                                <td>Valorant</td>
                                <td>Daily Mission</td>
                                <td>Agus</td>
                                <td>Finished</td>
                                <td className="centered"><button onClick={() => showModal3(true)} className="button-org-border capsule">Details</button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )}
            <DetailModal
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
                </Row>
                <Row>
                    {
                        selectedOrder.boost_detail.boost_detail?.map((item) => (
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
                    <Row>
                        <span>Add Ons : </span>
                        <ul className="px-5">
                            {selectedOrder.boost_detail.add_ons?.map((list) => (
                                <li>{list.name}</li>
                            ))}
                        </ul>
                    </Row>
                </Row>
            </DetailModal>
            <DetailModal
                show={modal4}
                onHide={() => showModal4(false)}
            >
                <h1>Finish</h1>
            </DetailModal>
        </div>
    );
}

export default DetailOrder;
