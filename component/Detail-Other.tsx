/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
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
    const { role, token } = props;

    const [servers, setServers] = useState([{ id: 0, server_name: '' }]);
    const [currentServer, setCurrentServer] = useState();
    const [nameServer, setNameServer] = useState<any>([]);
    const [gameServer, setGameServer] = useState<any>(1);

    const [ranks, setRanks] = useState<any>([{ name: '', id: 0, game_id: 0 }]);
    const [currentRank, setCurrentRank] = useState<any>([{ name: '', id: 0, game_id: 0 }]);
    const [selectedRank, setSelectedRank] = useState(1);
    const [nameRank, setNameRank] = useState<any>();
    const [gameRank, setGameRank] = useState<any>(1);
    const [badgeRank, setBadgeRank] = useState<any>();

    const [games, setGames] = useState([{ name: '', id: 0 }]);
    const [currentGame, setCurrentGame] = useState<any>(1);

    const [modal, showModal] = useState(false);
    const [modal2, showModal2] = useState(false);
    const [modal3, showModal3] = useState(false);
    const [modal4, showModal4] = useState(false);
    const [modal5, showModal5] = useState(false);
    const [modal6, showModal6] = useState(false);

    async function getGames() {
        const url = 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/games';

        await axios.get(url).then((res) => setGames(res.data.data)).catch((err) => console.log(err));
    }

    // Manage Server
    async function getServer() {
        await axios.get('http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/servers').then((res) => setServers(res.data.data)).catch((err) => console.log(err));
    }

    async function deleteServer(server) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const url = `http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/servers/${server}`;

        await axios.delete(url, config).then((res) => {
            getServer();
        }).catch((err) => console.log(err));
    }

    async function addServer() {
        const url = 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/servers';

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const data = {
            name: nameServer,
            game_id: gameServer,
        };

        await axios.post(url, data, config).then(() => {
            showModal(false);
            setNameServer('');
            clearData();
            getServer();
        }).catch((err) => console.log(err));
    }

    async function getCurrentServer(id) {
        const url = `http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/servers/${id}`;

        await axios.get(url).then((res) => {
            setCurrentServer(res.data.data.id);
            setNameServer(res.data.data.server_name);
            setGameServer(res.data.data.game_id);
            showModal3(true);
            showModal2(false);
        }).catch((err) => console.log(err));
    }

    async function updateServer() {
        const url = `http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/servers/${currentServer}`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const data = {
            name: nameServer,
            game_id: gameServer,
        };

        await axios.put(url, data, config).then((res) => {
            showModal3(false);
            clearData();
            getServer();
            showModal2(true);
        }).catch((err) => console.log(err));
    }

    // Manage Rank
    async function getRanks() {
        await axios.get('http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/ranks').then((res) => setRanks(res.data.ranks.data)).catch((res) => console.log(res));
    }

    function getCurrentRank(id) {
        setCurrentGame(id);
        const current: any = [];
        if (ranks.length > 0) {
            ranks.forEach((rank) => {
                if (rank.game_id === parseInt(id, 10)) {
                    current.push(rank);
                }
            });
            setCurrentRank(current);
        }
        console.log(ranks[0].name);
    }

    async function selectRank(id) {
        setSelectedRank(id);
        showModal5(false);
        showModal6(true);

        const url = `http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/ranks/${id}`;

        await axios.get(url).then((res) => {
            setNameRank(res.data.data.name);
            setBadgeRank(res.data.data.badge);
            setGameRank(currentGame);
        }).catch((err) => console.log(err));
    }

    async function addRank() {
        const url = 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/ranks';

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const data = {
            name: nameRank,
            badge: badgeRank,
            game_id: gameRank,
        };

        await axios.post(url, data, config).then(() => {
            showModal4(false);
            getCurrentRank(gameRank);
            getRanks();
        }).catch((err) => console.log(err));
    }

    async function updateRank() {
        const url = `http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/ranks/${selectedRank}`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const data = {
            name: nameRank,
            logo: badgeRank,
            game_id: gameRank,
        };

        await axios.put(url, data, config).then(async () => {
            showModal6(false);
            clearData();
            await getRanks();
            getCurrentRank(currentGame);
            showModal5(true);
        }).catch((err) => console.log(err));
    }

    async function deleteRank(id) {
        const url = `http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/ranks/${id}`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        await axios.delete(url, config).then(async () => {
            await getRanks();
            getCurrentRank(currentGame);
        }).catch((err) => console.log(err));
    }

    function clearData() {
        setNameServer('');
        setGameServer(1);
        setNameRank('');
        setGameRank(1);
        setBadgeRank('');
    }

    useEffect(() => {
        getServer();
        getRanks();
        getGames();
    }, []);
    return (
        <>
            {role === 'admin' ? (
                <Row className="centered mt-4">
                    <Col className=" col-md-6 px-3">
                        <div className="card fullwidth">
                            <h3>Manage Server</h3>
                            <div className="mt-3">
                                <button className="button capsule" onClick={() => { clearData(); showModal(true); }}>Add Server</button>
                                <button className="button capsule mx-3" onClick={() => showModal2(true)}>Update Server</button>
                            </div>
                        </div>
                    </Col>
                    <Col className=" col-md-6 px-3">
                        <div className="card fullwidth">
                            <h3>Manage Rank</h3>
                            <div className="mt-3">
                                <button className="button capsule" onClick={() => showModal4(true)}>Add Rank</button>
                                <button className="button capsule mx-3" onClick={() => { getCurrentRank(1); showModal5(true); }}>Update Rank</button>
                            </div>
                        </div>

                    </Col>
                    {/* Server */}
                    {/* Add */}
                    <DetailModal
                        show={modal}
                        onHide={() => showModal(false)}
                    >
                        <h1>Add Server</h1>
                        <Form.Group>
                            <Row>
                                <Col className="flex-down px-1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control onChange={(e) => setNameServer(e.target.value)} value={nameServer} className="form-layout" />
                                </Col>
                                <Col className="flex-down px-1">
                                    <Form.Label>Game</Form.Label>
                                    <Form.Select className="form-layout" onChange={(e) => setGameServer(e.target.value)}>
                                        {games.map((game) => (
                                            <option value={game.id}>{game.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4 flex-down-centered-right">
                                    <button onClick={() => addServer()} className="button capsule">Add</button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </DetailModal>
                    {/* Show List */}
                    <DetailModal
                        show={modal2}
                        onHide={() => showModal2(false)}
                    >
                        <h1>Server List</h1>
                        <div className={styles['server-manage-container']}>
                            {servers?.map((server) => (
                                <div className={`${styles['server-manage-list']} my-1`}>
                                    <span>{server?.server_name}</span>
                                    <div>
                                        <button onClick={() => deleteServer(server.id)} className={`${styles['delete-button']} mx-2`}>Delete</button>
                                        <button className={styles['update-button']} onClick={() => getCurrentServer(server.id)}>Update</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DetailModal>
                    {/* Update */}
                    <DetailModal
                        show={modal3}
                        onHide={() => showModal3(false)}
                    >
                        <h1>Update Server</h1>
                        <Form.Group>
                            <Row>
                                <Col className="flex-down px-1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control onChange={(e) => setNameServer(e.target.value)} value={nameServer} className="form-layout" />
                                </Col>
                                <Col className="flex-down px-1">
                                    <Form.Label>Game</Form.Label>
                                    <Form.Select className="form-layout" value={gameServer} onChange={(e) => setGameServer(e.target.value)}>
                                        {games.map((game) => (
                                            <option value={game.id}>{game.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4 flex-down-centered-right">
                                    <button onClick={() => updateServer()} className="button capsule">Update</button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </DetailModal>

                    {/* Rank */}
                    {/* Add */}
                    <DetailModal
                        show={modal4}
                        onHide={() => showModal4(false)}
                    >
                        <h1>Add Rank</h1>
                        <Form.Group>
                            <Row>
                                <Col className="flex-down px-1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control onChange={(e) => setNameRank(e.target.value)} value={nameRank} className="form-layout" />
                                </Col>
                                <Col className="flex-down px-1">
                                    <Form.Label>Game</Form.Label>
                                    <Form.Select className="form-layout" onChange={(e) => setGameRank(e.target.value)}>
                                        {games.map((game) => (
                                            <option value={game.id}>{game.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col className="flex-down px-1">
                                    <Form.Label>Badge</Form.Label>
                                    <Form.Control onChange={(e) => setBadgeRank(e.target.value)} value={badgeRank} className="form-layout" />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4 flex-down-centered-right">
                                    <button onClick={() => addRank()} className="button capsule">Add</button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </DetailModal>
                    {/* Show List */}
                    <DetailModal
                        show={modal5}
                        onHide={() => showModal5(false)}
                    >
                        <h1>
                            Rank List
                        </h1>
                        <Form.Group className="my-3">
                            <Form.Select className="form-layout w-50" defaultValue={currentGame} onChange={(e) => getCurrentRank(e.target.value)}>
                                {games.map((game) => (
                                    <option value={game.id}>
                                        {game.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        {currentRank.length > 0 ? (
                            <div className={styles['server-manage-container']}>
                                {currentRank.map((rank) => (
                                    <div className={`${styles['server-manage-list']} my-1`}>
                                        <span>
                                            {rank.name}
                                        </span>
                                        <div>
                                            <button className={`${styles['delete-button']} mx-2`} onClick={() => deleteRank(rank.id)}>Delete</button>
                                            <button className={styles['update-button']} onClick={() => selectRank(rank.id)}>Update</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <span>No Rank Yet</span>
                        )}
                    </DetailModal>
                    {/* Update */}
                    <DetailModal
                        show={modal6}
                        onHide={() => showModal6(false)}
                    >
                        <h1>
                            Update Rank
                            {' '}
                            {gameRank}
                        </h1>
                        <Form.Group>
                            <Row>
                                <Col className="flex-down px-1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control onChange={(e) => setNameRank(e.target.value)} value={nameRank} className="form-layout" />
                                </Col>
                                <Col className="flex-down px-1">
                                    <Form.Label>Game</Form.Label>
                                    <Form.Select className="form-layout" defaultValue={currentGame} onChange={(e) => setGameRank(e.target.value)}>
                                        {games.map((game) => (
                                            <option value={game.id}>{game.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col className="flex-down px-1">
                                    <Form.Label>Badge</Form.Label>
                                    <Form.Control onChange={(e) => setBadgeRank(e.target.value)} value={badgeRank} className="form-layout" />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4 flex-down-centered-right">
                                    <button onClick={() => updateRank()} className="button capsule">Add</button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </DetailModal>
                </Row>
            ) : (
                <h1>404 Error</h1>
            )}
        </>
    );
}

export default DetailOther;
