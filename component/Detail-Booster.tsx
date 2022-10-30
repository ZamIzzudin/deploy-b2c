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
import Link from 'next/link';
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

    const [boostOrder, setBoostOrder] = useState([{
        boost_id: 0, boost_detail: {}, total_price: 0, game_name: '', service_name: '', order_created: '',
    }]);
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

        await axios.get(url).then((res) => setBoostOrder(res.data.data)).catch((err) => console.log(err));
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

        const data = {
            status: 'On Progress',
        };

        await axios.put(url, data, config).then((res) => {
            showModal3(false);
            getBoostOrderList();
        }).catch((err) => console.log(err));
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
                <div className="error-container fullwidth">
                    <Image src="/Jett-Sticker.png" width="300" height="300" />
                    <span className="sec-font">Go Back to Home Page</span>
                    <Link href="/">
                        <button className="button capsule mt-3" type="button">Home</button>
                    </Link>
                </div>
            )}
            {role === 'booster' && (
                <div className="mt-3 centered">
                    {boostOrder.length > 0 ? (
                        <Row className="fullwidth">
                            {boostOrder.map((order) => (
                                <Col className="col-md-3 my-2 col-12" key={order.boost_id}>
                                    <div className="centered w-95-res card flex-down">
                                        <div className="fullwidth flex-right">
                                            <span className={styles['booster-card-date']}>{order.order_created.slice(0, 10)}</span>
                                        </div>
                                        <Row className="fullwidth mb-3">
                                            <Col className="centered-down">
                                                <span className={styles['booster-card-title']}>{order.game_name}</span>
                                                <span className={styles['booster-card-subtitle']}>{order.service_name}</span>
                                            </Col>
                                            <Col className="centered-down">
                                                <span className={styles['booster-card-price']}>
                                                    $
                                                    {order.total_price}
                                                </span>
                                            </Col>
                                        </Row>
                                        <div className="centered">
                                            <button onClick={() => { showModal3(true); setSelectedOrder(order); }} className="button-org capsule">Details</button>
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
            {role === 'admin' && (
                <div className="error-container fullwidth">
                    <Image src="/Jett-Sticker.png" width="300" height="300" />
                    <span className="sec-font">Features Comming Soon</span>
                </div>
            )}
            {/* Take Order */}
            <DetailModal
                show={modal3}
                onHide={() => showModal3(false)}
            >
                <h1>Details</h1>
                <Row>
                    <span>
                        Game:
                        {' '}
                        {selectedOrder.game_name}
                    </span>
                    <span>
                        Service:
                        {' '}
                        {selectedOrder.service_name}
                    </span>
                </Row>
                <Row>
                    {
                        Object.keys(selectedOrder.boost_detail).map((key) => (
                            <span className={styles['booster-detail-list']}>
                                {key.replace('_', ' ')}
                                {' '}
                                :
                                {' '}
                                {selectedOrder.boost_detail[key]}
                            </span>
                        ))
                    }
                </Row>
                <Row>
                    <span>Add Ons : </span>
                    <ul className="px-5">
                        {selectedOrder.add_ons?.map((list) => (
                            <li>{list.name}</li>
                        ))}
                    </ul>
                </Row>
                <Row>
                    <Col>
                        <button className="button capsule" onClick={() => takeOrder(selectedOrder.boost_id)}>
                            Take Order
                        </button>
                    </Col>
                </Row>
            </DetailModal>
        </div>
    );
}

export default DetailBooster;
