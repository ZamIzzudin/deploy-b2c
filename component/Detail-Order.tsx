/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
import { Table, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import DetailModal from './Detail-Modal';
// import styles from './styles/DetailPage.module.css';

function DetailOrder(props: any) {
    const { role } = props;
    const [modal, showModal] = useState(false);
    const [modal2, showModal2] = useState(false);
    const [modal3, showModal3] = useState(false);
    const [modal4, showModal4] = useState(false);

    return (
        <div className="mt-4">
            {role === 'user' && (
                <Table>
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
                            <td className="text-center">
                                <button className="capsule button" onClick={() => showModal(true)}>Chat</button>
                            </td>
                            <td className="centered">
                                <button onClick={() => showModal3(true)} className="capsule button-org-border">Details</button>
                            </td>
                        </tr>
                        <tr>
                            <td>532153</td>
                            <td>Valorant</td>
                            <td>Rank Boosting</td>
                            <td>Finished</td>
                            <td className="text-center">
                                <button className="capsule button-org" onClick={() => showModal2(true)}>Rate</button>
                            </td>
                            <td className="centered">
                                <button onClick={() => showModal3(true)} className="capsule button-org-border">Details</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            )}
            {role === 'booster' && (
                <Table>
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
                            <td className="centered">
                                <button className="capsule button" onClick={() => showModal(true)}>Chat</button>
                                <button onClick={() => showModal4(true)} className="capsule button-org">Finish</button>
                            </td>
                            <td>
                                <button onClick={() => showModal3(true)} className="capsule button-org-border">Details</button>
                            </td>
                        </tr>
                        <tr>
                            <td>532153</td>
                            <td>Valorant</td>
                            <td>Rank Boosting</td>
                            <td>Finished</td>
                            <td className="centered">
                                <button className="capsule button" onClick={() => showModal(true)}>Chat</button>
                            </td>
                            <td>
                                <button onClick={() => showModal3(true)} className="capsule button-org-border">Details</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            )}
            {role === 'admin' && (
                <div>
                    <Row className="mb-4">
                        <Col>
                            filter
                        </Col>
                    </Row>
                    <Table>
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
