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

    useEffect(() => {
        getGames();
    }, []);

    async function getGames() {
        await axios.get('http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/games').then((res) => setGames(res.data.data)).catch((res) => console.log(res));
    }

    function getService(Game: any) {
        const ApexLegend = [{ name: 'Rank Boosting', type: 'A' }, { name: 'Battlepass Boost', type: 'B' }, { name: 'Level Boost', type: 'C' }];
        const Valorant = [{ name: 'Rank Boosting', type: 'A' }, { name: 'Placement', type: 'C' }, { name: 'Competitive Net Wins', type: 'D' }, { name: 'Derank', type: 'A' }, { name: 'Unrated Wins', type: 'B' }, { name: 'Challenges', type: 'D' }, { name: 'Smurf Account', type: 'C' }];
        const NewWorld = [{ name: 'Player Level', type: 'E' }, { name: 'Coins', type: 'F' }, { name: 'Trade Skill', type: 'G' }, { name: 'Gear Score', type: 'H' }, { name: 'Mutated Expeditions', type: 'E' }, { name: 'Weapon Mastery', type: 'I' }, { name: 'Farming Service', type: 'F' }];
        const Dota = [{ name: 'Placement Matches', type: 'A' }, { name: 'MMR Boost', type: 'B' }, { name: 'Ranked Net Win', type: 'C' }, { name: 'Low Priority', type: 'J' }];
        const BlackDesert = [{ name: 'Hourly Farm', type: 'F' }, { name: 'Questlines', type: 'J' }, { name: 'Energy Point', type: 'F' }, { name: 'Level Boost', type: 'E' }, { name: 'Contribution Points', type: 'F' }, { name: 'Adventure Logs', type: 'G' }];
        const CSGO = [{ name: 'Macthmaking Rank', type: 'A' }, { name: 'Matchmaking Net Rank', type: 'C' }, { name: 'Wingman Rank', type: 'B' }, { name: 'Dangerzone Rank', type: 'A' }, { name: 'Faceit Level', type: 'D' }];
        const GenshinImpact = [{ name: 'Daily Mission', type: 'F' }, { name: 'Enhance Weapon', type: 'J' }, { name: 'Adventure Rank', type: 'F' }];
        const CODColdWar = [{ name: 'Camo', type: 'G' }, { name: 'Weapon Level', type: 'J' }, { name: 'Player Level', type: 'F' }];

        if (Game === 'ApexLegend') {
            setService(ApexLegend);
        } else if (Game === 'Valorant') {
            setService(Valorant);
        } else if (Game === 'NewWorld') {
            setService(NewWorld);
        } else if (Game === 'Dota') {
            setService(Dota);
        } else if (Game === 'BlackDesert') {
            setService(BlackDesert);
        } else if (Game === 'CSGO') {
            setService(CSGO);
        } else if (Game === 'GenshinImpact') {
            setService(GenshinImpact);
        } else if (Game === 'CODColdWar') {
            setService(CODColdWar);
        }

        setSelectedGame(Game);
    }

    function getSelectedGame(game: any) {
        const select = game.replace(
            /[^a-zA-Z0-9,\-.?! ]/g,
            '',
        ).replace(/\s/g, '');
        getService(select);
    }

    async function newGame() {
        const data = {
            name: newGameName,
            logo_img: newGameLogo,
        };

        const url = 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/games';
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
        const url = `http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/games/${id}`;
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
                    <Col className="col-md-4 my-3 col-6">
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
                    </Col>
                    <Col className="col-md-4 my-3 col-6">
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
                    </Col>
                    <Col className="col-md-4 my-3 col-6">
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
                    </Col>
                    <Col className="col-md-4 my-3 col-6">
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
                    </Col>
                    <Col className="col-md-4 my-3 col-6">
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
                    </Col>
                    <Col className="col-md-4 my-3 col-6">
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
                    </Col>
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
                    <Row className="centered mt-4">
                        {games.map((game) => (
                            <GameCard data={game} key={game.id} getData={getSelectedGame} mini remove={removingGame} removeFunc={deleteGame} />
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
                    {service.length > 0 && (
                        <Row className="gap-2 px-3">
                            {service.map((i: any) => (
                                <Col key={i.name} className={`card centered fit-content ${removingService ? ('') : ('card-hovering')} relative-pos`}>
                                    <div>
                                        <span className={styles['service-name']}>{i.name}</span>
                                    </div>
                                    {removingService && (<button onClick={() => deleteService(i.name, selectedGame)} className={styles['remove-toogle']}>X</button>)}
                                </Col>
                            ))}
                        </Row>
                    )}
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
