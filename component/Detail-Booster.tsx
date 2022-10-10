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
    const [selectedGame, setSelectedGame] = useState('');
    const [service, setService] = useState<any>([]);

    const [newGameName, setNewGameName] = useState('');
    const [newGameLogo, setNewGameLogo] = useState('');
    const [newServiceName, setNewServiceName] = useState('');

    const [boostOrder, setBoostOrder] = useState([{ id: undefined }]);

    useEffect(() => {
        getGames();
        getBoostOrderList();
        getService({ name: 'Valorant' });
    }, []);

    async function getBoostOrderList() {
        const url = `${process.env.API}/boosts`;

        await axios.get(url).then((res) => setBoostOrder(res.data)).catch((err) => console.log(err));
    }

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

    // CRUD
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
                <Row className="mt-3 centered">
                    {boostOrder[0].id !== undefined ? (
                        <span>Ada Order</span>
                    ) : (
                        <span>No Order Yet</span>
                    )}
                    {/* <Col className="col-md-4 my-3 col-6">
                        <Row className="card width90">
                            <h2 className={styles['booster-card-title']}>Genshin Impact</h2>
                            <h3 className={styles['booster-card-subtitle']}>Daily Mission</h3>
                            <Row className="centered gap-3 mt-3">
                                <Col className="centered">
                                    <span className={styles['booster-card-price']}>$47.0</span>
                                </Col>
                                <Col className="centered">
                                    <button onClick={() => showModal3(true)} className="button capsule">Details</button>
                                </Col>
                            </Row>
                        </Row>
                    </Col> */}
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
                                        <button onClick={() => deleteService(i.name, selectedGame)} className={styles['remove-toogle']}>X</button>
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
            </DetailModal>
        </div>
    );
}

export default DetailBooster;
