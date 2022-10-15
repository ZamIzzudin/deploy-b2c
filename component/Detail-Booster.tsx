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
import { Row, Col, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import GameCard from './Game-Card';
import DetailModal from './Detail-Modal';
import styles from './styles/DetailPage.module.css';

function DetailBooster(props: any) {
    const { role, token } = props;

    const [modal, showModal] = useState(false);
    const [modal2, showModal2] = useState(false);
    const [modal3, showModal3] = useState(false);
    const [removingGame, setRemovingGame] = useState(false);
    const [removingService, setRemovingService] = useState(false);

    const [games, setGames] = useState([
        {
            name: null,
            logo_url: '/valo.png',
            id: null,
        },
    ]);
    const [service, setService] = useState<any>([]);

    const [newGameName, setNewGameName] = useState('');
    const [newGameLogo, setNewGameLogo] = useState('');
    const [newServiceName, setNewServiceName] = useState('');

    const [boostOrder, setBoostOrder] = useState([{ id: 0, boost_detail: { game: { name: 'h', logo_url: '' }, type: '' }, total_price: 0 }]);
    const [selectedOrder, setSelectedOrder] = useState<any>({
        id: undefined,
        boost_detail: {
            game: { name: '' }, type: '', require: [], addOns: [],
        },
        total_price: 0,
    });

    useEffect(() => {
        getGames();
        getBoostOrderList();
        getService({ name: 'Valorant' });
    }, []);

    // BOOSTER
    async function getBoostOrderList() {
        const url = `${process.env.API}/boosts`;

        await axios.get(url).then((res) => { setBoostOrder(res.data.data); console.log(res.data.data); }).catch((err) => console.log(err));
    }

    async function takeOrder(id) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const url = `${process.env.API}/boosts/${id}`;

        const data = { status: 'On Progress' };

        await axios.put(url, data, config).then((res) => { showModal3(false); getBoostOrderList(); }).catch((err) => console.log(err));
    }

    // ADMIN
    async function getGames() {
        await axios.get(`${process.env.API}/games`).then((res) => setGames(res.data.data)).catch((res) => console.log(res));
    }

    async function getService(game: any) {
        const slugGame = game.name.replace(
            /[^a-zA-Z0-9,\-.?! ]/g,
            '-',
        ).replace(/\s/g, '-').toLowerCase();

        const url = `${process.env.API}/boosting/${slugGame}`;

        await axios.get(url).then((res) => setService(res.data.boost_options)).catch((err) => console.log(err));
    }

    // CRUD ADMIN
    async function newGame() {
        const data = {
            name: newGameName,
            logo_img: newGameLogo,
        };

        const url = `${process.env.API}/games`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        await axios.post(url, data, config).then((res) => getGames()).catch((res) => console.log(res));

        showModal(false);
    }

    function newService() {
        console.log(newServiceName);
        showModal2(false);
    }

    async function deleteGame(id) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
        const url = `${process.env.API}/games/${id}`;
        await axios.delete(url, config).then((res) => getGames()).catch((err) => console.log(err));
    }

    function deleteService(service, game) {
        console.log(`${service} : ${game}`);
    }

    return (
        <div>
            {role === 'user' && (
                <h1>404 error</h1>
            )}
            {role === 'booster' && (
                <Row className="mt-3 centered debug-bg">
                    {boostOrder.length > 0 ? (
                        <Row>
                            {boostOrder.map((order) => (
                                <Col className="col-md-3 my-2 col-12">
                                    <Row className="centered card w-95-res debug-bg flex-down">
                                        <Col className="centered">
                                            <span className={styles['booster-card-price']}>
                                                $
                                                {order.total_price}
                                            </span>
                                        </Col>
                                        <Col className="centered">
                                            <button onClick={() => { showModal3(true); setSelectedOrder(order); }} className="button-org capsule">Details</button>
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <span className="text-center fullwidth">No Order Yet</span>
                    )}
                </Row>
            )}
            {role === 'admin' && (
                <div className="centered-down">
                    <Row className="my-4 fullwidth">
                        <Col className="flex-horizon-centered-right">
                            <button onClick={() => showModal(true)} className="button-border mx-2">Add</button>
                            {removingGame ? (
                                <button onClick={() => setRemovingGame(false)} className="button-org-border mx-1">Cancel</button>
                            ) : (
                                <button onClick={() => setRemovingGame(true)} className="button-org-border mx-1">Delete</button>
                            )}
                        </Col>
                    </Row>
                    <Row className="mt-5 mb-3 fullwidth">
                        {games.map((game) => (
                            <GameCard data={game} key={game.id} getData={getService} mini remove={removingGame} removeFunc={deleteGame} />
                        ))}
                    </Row>
                    <Row className="my-4 fullwidth">
                        <Col className="flex-horizon-centered-right">
                            <button onClick={() => showModal2(true)} className="button-border mx-3">Add Service</button>
                            {removingService ? (
                                <button onClick={() => setRemovingService(false)} className="button-org-border">Cancel</button>
                            ) : (
                                <button onClick={() => setRemovingService(true)} className="button-org-border">Delete</button>
                            )}

                        </Col>
                    </Row>
                    <Row className={`${styles['service-slider']} centered mb-3`}>
                        <div className={styles['service-slider-container']}>
                            {service.map((i: any) => (
                                <button key={i.name} className={`card fit-content mx-2 ${removingService ? ('') : ('card-hovering')} relative-pos`}>
                                    <span className={styles['service-name']}>{i.name}</span>
                                    {removingService && (
                                        <button onClick={() => deleteService(i.name, i)} className={styles['remove-toogle']}>X</button>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Row>

                </div>
            )}
            <DetailModal
                show={modal}
                onHide={() => showModal(false)}
            >
                <h1>Add Game</h1>
                <Form.Group className="mb-3 fullwidth">
                    <Form.Label>Name</Form.Label>
                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewGameName(e.target.value)} />
                    <Form.Label>Picture</Form.Label>
                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewGameLogo(e.target.value)} />
                    <div>
                        <button onClick={() => newGame()} className="button capsule">Add</button>
                    </div>
                </Form.Group>
            </DetailModal>
            <DetailModal
                show={modal2}
                onHide={() => showModal2(false)}
            >
                <h1>Add Service</h1>
                <Form.Group className="mb-3 fullwidth">
                    <Form.Label>Name</Form.Label>
                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewServiceName(e.target.value)} />
                    <div>
                        <button onClick={() => newService()} className="button capsule">Add</button>
                    </div>
                </Form.Group>
            </DetailModal>
            <DetailModal
                show={modal3}
                onHide={() => showModal3(false)}
            >
                <h1>Details</h1>
                {/* <Row className="mb-4">
                    <Col className="col-4 pad-0">
                        <div className="fullwidth centered flex-down">
                            <Image src={selectedOrder.boost_detail.game.logo_url} width="100%" height="100%" />
                            <span className="text-center d-i-block fullwidth">{selectedOrder.boost_detail.game.name}</span>
                        </div>
                    </Col>
                    <Col className="col-8 flex-down">
                        <p className="mar-0">
                            <b>Service : </b>
                            {selectedOrder.boost_detail.type}
                        </p>
                        <p className="mar-0">
                            <b>Price : </b>
                            {`$${selectedOrder.total_price}`}
                        </p>
                        {selectedOrder.boost_detail.require.map((item) => (
                            <p className="mar-0">
                                <b>
                                    {Object.keys(item)[0]}
                                    {' '}
                                    :
                                    {' '}
                                </b>
                                {item[Object.keys(item)[0]]}
                            </p>
                        ))}
                        <p className="mar-0">
                            <b>Add Ons : </b>
                            {selectedOrder.boost_detail.addOns.map((addOn) => <span className="mar-0">{`${addOn},`}</span>)}
                        </p>
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                        <button className="button capsule" onClick={() => takeOrder(selectedOrder.id)}>
                            Take Order
                        </button>
                    </Col>
                </Row>
            </DetailModal>
        </div>
    );
}

export default DetailBooster;
