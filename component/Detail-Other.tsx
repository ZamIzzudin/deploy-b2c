/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
import { Row, Col, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DetailModal from './Detail-Modal';
import styles from './styles/DetailPage.module.css';

function DetailOther(props: any) {
    const { role } = props;

    const [servers, setServers] = useState([]);
    const [ranks, setRanks] = useState([]);

    const [modal, showModal] = useState(false);
    const [modal2, showModal2] = useState(false);

    async function getServer() {
        await axios.get('http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/servers').then((res) => setServers(res.data.data)).catch((err) => console.log(err));
    }

    async function getRanks() {
        await axios.get('http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/ranks').then((res) => setRanks(res.data)).catch((res) => console.log(res));
    }

    useEffect(() => {
        getServer();
        getRanks();
    }, []);
    return (
        <>
            {role === 'admin' ? (
                <Row className="centered mt-4">
                    <Col className=" col-md-6 px-3">
                        <div className="card fullwidth">
                            <h3>Manage Server</h3>
                            <div className="mt-3">
                                <button className="button capsule" onClick={() => showModal(true)}>Add Server</button>
                                <button className="button capsule mx-3" onClick={() => showModal2(true)}>Update Server</button>
                            </div>
                        </div>
                    </Col>
                    <Col className=" col-md-6 px-3">
                        <div className="card fullwidth">
                            <h3>Manage Rank</h3>
                            <div className="mt-3">
                                <button className="button capsule">Add Rank</button>
                                <button className="button capsule mx-3">Update Rank</button>
                            </div>
                        </div>

                    </Col>
                    <DetailModal
                        show={modal}
                        onHide={() => showModal(false)}
                    >
                        <h1>Add Server</h1>
                    </DetailModal>
                    <DetailModal
                        show={modal2}
                        onHide={() => showModal2(false)}
                    >
                        <h1>Update Server</h1>
                        <div className={styles['server-manage-container']}>
                            {servers?.map((server) => (
                                <div className={`${styles['server-manage-list']} my-1`}>
                                    <span>{server?.server_name}</span>
                                </div>
                            ))}
                        </div>
                    </DetailModal>
                </Row>
            ) : (
                <h1>404 Error</h1>
            )}
        </>
    );
}

export default DetailOther;
