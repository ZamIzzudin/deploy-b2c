/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-use-before-define */
/* eslint-disable no-trailing-spaces */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import GameCard from './Game-Card';
import styles from './styles/DetailPage.module.css';

function DetailBooster(props: any) {
    const { role } = props;

    const [service, setService] = useState<any>([]);

    function getGame(game: any) {
        const select = game.replace(
            /[^a-zA-Z0-9,\-.?! ]/g,
            '',
        ).replace(/\s/g, '');
        getService(select);
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
    }

    return (
        <div>
            {role === 'user' && (
                <h1>404 error</h1>
            )}
            {role === 'booster' && (
                <Row className="mt-3 centered">
                    <Col className="col-md-4 my-3">
                        <Row className="card width90">
                            <h2 className={styles['booster-card-title']}>Genshin Impact</h2>
                            <h3 className={styles['booster-card-subtitle']}>Daily Mission</h3>
                            <Row className="centered gap-3 mt-3">
                                <Col className="centered">
                                    <span className={styles['booster-card-price']}>$47.0</span>
                                </Col>
                                <Col className="centered">
                                    <button className="button capsule">Details</button>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col className="col-md-4 my-3">
                        <Row className="card width90">
                            <h2 className={styles['booster-card-title']}>Genshin Impact</h2>
                            <h3 className={styles['booster-card-subtitle']}>Daily Mission</h3>
                            <Row className="centered gap-3 mt-3">
                                <Col className="centered">
                                    <span className={styles['booster-card-price']}>$47.0</span>
                                </Col>
                                <Col className="centered">
                                    <button className="button capsule">Details</button>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col className="col-md-4 my-3">
                        <Row className="card width90">
                            <h2 className={styles['booster-card-title']}>Genshin Impact</h2>
                            <h3 className={styles['booster-card-subtitle']}>Daily Mission</h3>
                            <Row className="centered gap-3 mt-3">
                                <Col className="centered">
                                    <span className={styles['booster-card-price']}>$47.0</span>
                                </Col>
                                <Col className="centered">
                                    <button className="button capsule">Details</button>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col className="col-md-4 my-3">
                        <Row className="card width90">
                            <h2 className={styles['booster-card-title']}>Genshin Impact</h2>
                            <h3 className={styles['booster-card-subtitle']}>Daily Mission</h3>
                            <Row className="centered gap-3 mt-3">
                                <Col className="centered">
                                    <span className={styles['booster-card-price']}>$47.0</span>
                                </Col>
                                <Col className="centered">
                                    <button className="button capsule">Details</button>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col className="col-md-4 my-3">
                        <Row className="card width90">
                            <h2 className={styles['booster-card-title']}>Genshin Impact</h2>
                            <h3 className={styles['booster-card-subtitle']}>Daily Mission</h3>
                            <Row className="centered gap-3 mt-3">
                                <Col className="centered">
                                    <span className={styles['booster-card-price']}>$47.0</span>
                                </Col>
                                <Col className="centered">
                                    <button className="button capsule">Details</button>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col className="col-md-4 my-3">
                        <Row className="card width90">
                            <h2 className={styles['booster-card-title']}>Genshin Impact</h2>
                            <h3 className={styles['booster-card-subtitle']}>Daily Mission</h3>
                            <Row className="centered gap-3 mt-3">
                                <Col className="centered">
                                    <span className={styles['booster-card-price']}>$47.0</span>
                                </Col>
                                <Col className="centered">
                                    <button className="button capsule">Details</button>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            )}
            {role === 'admin' && (
                <div className="centered-down">
                    <Row className="my-4">
                        <Col>
                            <button className="button">+ Add Game</button>
                        </Col>
                    </Row>
                    <Row className="centered mt-4">
                        <GameCard name="Apex Legend" thumbnail="/apex.png" getData={getGame} mini />
                        <GameCard name="Valorant" thumbnail="/valo.png" getData={getGame} mini />
                        <GameCard name="New World" thumbnail="/newworld.png" getData={getGame} mini />
                        <GameCard name="Dota" thumbnail="/Dota.png" getData={getGame} mini />
                        <GameCard name="Black Desert" thumbnail="/Blackdesert.png" getData={getGame} mini />
                        <GameCard name="CS:GO" thumbnail="/csgo.png" getData={getGame} mini />
                        <GameCard name="Genshin Impact" thumbnail="/Genshin.png" getData={getGame} mini />
                        <GameCard name="COD Cold War" thumbnail="/coldwar.png" getData={getGame} mini />
                    </Row>
                    {service.length > 0 && (
                        <Row Row className="centeredfullwidth">
                            <Row className="my-4">
                                <Col>
                                    <button className="button">Add Service</button>
                                </Col>
                            </Row>
                            {service.map((i: any) => (
                                <Col className="card centered fit-content card-hovering mx-2">
                                    <span className={styles['service-name']}>{i.name}</span>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            )}
        </div>
    );
}

export default DetailBooster;
