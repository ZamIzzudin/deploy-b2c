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
// import styles from './styles/DetailPage.module.css';

function DetailOrder(props: any) {
    const { role, token } = props;
    const [modal, showModal] = useState(false);
    const [modal2, showModal2] = useState(false);
    const [modal3, showModal3] = useState(false);
    const [modal4, showModal4] = useState(false);

    const [typeOrder, setTypeOrder] = useState('boost');
    const [order, setOrder] = useState([]);

    // async function getTypeByOrder() {
    //     const url = `${process.env.API}/account/checkout`;

    //     const config = {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     };

    //     await axios.get(url, config).then((res) => setOrder(res.data.data)).catch((err) => console.log(err));
    // }

    // useEffect(() => {
    //     getTypeByOrder();
    // }, [typeOrder]);

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
                                <th>Order Id</th>
                                <th>Game</th>
                                <th>Service</th>
                                <th>Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>424853</td>
                                <td>Genshin Impact</td>
                                <td>Daily Mission</td>
                                <td>On Process</td>
                                <td>
                                    <button onClick={() => showModal3(true)} className="capsule button-org">Details</button>
                                </td>
                            </tr>
                            <tr>
                                <td>532153</td>
                                <td>Valorant</td>
                                <td>Rank Boosting</td>
                                <td>Finished</td>
                                <td>
                                    <button onClick={() => showModal3(true)} className="capsule button-org">Details</button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )}
            {role === 'booster' && (
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
                                <th>Status</th>
                                <th>Action</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>424853</td>
                                <td>Genshin Impact</td>
                                <td>Daily Mission</td>
                                <td>On Process</td>
                                <td>
                                    <button onClick={() => showModal4(true)} className="capsule button-org-border">Finish</button>
                                </td>
                                <td>
                                    <button onClick={() => showModal3(true)} className="capsule button-org">Details</button>
                                </td>
                            </tr>
                            <tr>
                                <td>532153</td>
                                <td>Valorant</td>
                                <td>Rank Boosting</td>
                                <td>Finished</td>
                                <td>
                                    <button className="capsule button-border" onClick={() => showModal(true)}>Review</button>
                                </td>
                                <td>
                                    <button onClick={() => showModal3(true)} className="capsule button-org">Details</button>
                                </td>
                            </tr>
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
