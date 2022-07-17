/* eslint-disable react/button-has-type */
import { Table, Row, Col } from 'react-bootstrap';
// import styles from './styles/DetailPage.module.css';

function DetailOrder(props: any) {
    const { role } = props;

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
                            <td>
                                <button className="capsule button">Chat</button>
                            </td>
                            <td className="centered">
                                <button className="capsule button">Details</button>
                            </td>
                        </tr>
                        <tr>
                            <td>532153</td>
                            <td>Valorant</td>
                            <td>Rank Boosting</td>
                            <td>Finished</td>
                            <td>
                                <button className="capsule button">Chat</button>
                            </td>
                            <td className="centered">
                                <button className="capsule button">Details</button>
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
                                <button className="capsule button">Chat</button>
                                <button className="capsule button">Finish</button>
                            </td>
                            <td>
                                <button className="capsule button">Details</button>
                            </td>
                        </tr>
                        <tr>
                            <td>532153</td>
                            <td>Valorant</td>
                            <td>Rank Boosting</td>
                            <td>Finished</td>
                            <td className="centered">
                                <button className="capsule button">Chat</button>
                            </td>
                            <td>
                                <button className="capsule button">Details</button>
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
                                <td className="centered"><button className="button capsule">Details</button></td>
                            </tr>
                            <tr>
                                <td>5647353</td>
                                <td>Valorant</td>
                                <td>Daily Mission</td>
                                <td>Agus</td>
                                <td>Finished</td>
                                <td className="centered"><button className="button capsule">Details</button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}

export default DetailOrder;
