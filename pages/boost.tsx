/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GameCard, FormBoost, Checkout } from '../component';
import styles from '../styles/Boost.module.css';

function Order() {
    const [games, setGames] = useState([
        {
            name: null,
            logo_url: '/valo.png',
            id: null,
        },
    ]);

    const [service, setService] = useState<any>([]);
    const [formType, setFormType] = useState<any>({
        form: [
            {
                type: 'includeRank',
                game: 'valorant',
                title: 'Current Rank',
            },
            {
                type: 'includeRank',
                game: 'valorant',
                title: 'Desire Rank',
            },
        ],
        addons: [],
    });

    const [orderForm, setOrderForm] = useState<any>([]);

    async function getGames() {
        await axios.get('http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/games').then((res) => setGames(res.data.data)).catch((res) => console.log(res));
    }

    function getGame(game: any) {
        const select = game.replace(
            /[^a-zA-Z0-9,\-.?! ]/g,
            '',
        ).replace(/\s/g, '');
        getService(select);
    }

    function getService(Game: any) {
        const ApexLegend = [{
            name: 'Rank Boosting',
            require: {
                form: [
                    {
                        type: 'points',
                        game: 'Apex Legend',
                        title: 'Desire Options',
                        unit: 'rank',
                        start: 1,
                        to: 2000,
                    },
                    {
                        type: 'platformSelect',
                        game: 'Apex Legend',
                        title: 'Select Your Platform',
                        platform: ['PC', 'PSN', 'XBOX', 'MOBILE'],
                    },
                ],
            },
        }, { name: 'Battlepass Boost', type: 'B' }, {
            name: 'Level Boost',
            require: {
                form: [
                    {
                        type: 'points',
                        game: 'Apex Legend',
                        title: 'Desire Options',
                        unit: 'level',
                        start: 1,
                        to: 500,
                    },
                    {
                        type: 'platformSelect',
                        game: 'Apex Legend',
                        title: 'Select Your Platform',
                        platform: ['PC', 'PSN', 'XBOX', 'MOBILE'],
                    },
                ],
            },
        }];

        const Valorant = [{
            name: 'Rank Boosting',
            require: {
                form: [
                    {
                        type: 'includeRank',
                        game: 'valorant',
                        title: 'Current Rank',
                    },
                    {
                        type: 'includeRank',
                        game: 'valorant',
                        title: 'Desire Rank',
                    },
                ],
            },
        }, {
            name: 'Placement',
            require: {
                form: [{
                    type: 'includeRank',
                    game: 'Valorant',
                    title: 'Season End Rank',
                },
                {
                    type: 'numberGame',
                    game: 'Valorant',
                    title: 'Number of Games',
                    servers: [],
                    max: 5,
                    min: 1,
                }],
            },
        }, {
            name: 'Competitive Net Wins',
            require: {
                form: [
                    { type: 'includeRank', game: 'Valorant', title: 'Current Rank' }, {
                        type: 'numberGame', servers: [], game: 'Valorant', title: 'Number of Wins', max: 5, min: 1,
                    },
                ],
            },
        }, {
            name: 'Derank',
            require: {
                form: [
                    {
                        type: 'includeRank',
                        game: 'valorant',
                        title: 'Current Rank',
                    },
                    {
                        type: 'includeRank',
                        game: 'valorant',
                        title: 'Desire Rank',
                    },
                ],
            },
        }, {
            name: 'Unrated Wins',
            require: {
                form: [
                    {
                        type: 'numberGame',
                        game: 'valorant',
                        title: 'Number of Games',
                        servers: [],
                        max: 5,
                        min: 1,
                    },
                ],
            },
        }, {
            name: 'Challenges',
            require: {
                form: [
                    {
                        type: 'numberGame',
                        game: 'valorant',
                        title: 'Number of Challenges',
                        max: 5,
                        min: 1,
                        servers: [],
                    },
                ],
            },
        }];

        const NewWorld = [{ name: 'Player Level', type: 'E' }, { name: 'Coins', type: 'F' }, { name: 'Trade Skill', type: 'G' }, { name: 'Gear Score', type: 'H' }, { name: 'Mutated Expeditions', type: 'E' }, { name: 'Weapon Mastery', type: 'I' }, { name: 'Farming Service', type: 'F' }];

        const Dota = [{ name: 'Placement Matches', type: 'A' }, { name: 'MMR Boost', type: 'B' }, { name: 'Ranked Net Win', type: 'C' }, {
            name: 'Low Priority',
            require: {
                form: [
                    {
                        type: 'numberGame',
                        game: 'valorant',
                        servers: ['Americas', 'Europe', 'Asia', 'Oceania'],
                        title: 'Number Of Game',
                        min: 1,
                        max: 10,
                    },
                ],
                addons: ['Appear Offline on Chat'],
            },
        }];

        const BlackDesert = [{ name: 'Hourly Farm', type: 'F' }, { name: 'Questlines', type: 'J' }, { name: 'Energy Point', type: 'F' }, { name: 'Level Boost', type: 'E' }, { name: 'Contribution Points', type: 'F' }, { name: 'Adventure Logs', type: 'G' }];

        const CSGO = [{
            name: 'Macthmaking Rank',
            require: {
                form: [
                    {
                        type: 'includeRank',
                        game: 'CS:GO',
                        title: 'Current Rank',
                    },
                    {
                        type: 'includeRank',
                        game: 'CS:GO',
                        title: 'Desire Rank',
                    },
                ],
            },
        }, {
            name: 'Matchmaking Net Rank',
            require: {
                form: [
                    {
                        type: 'includeRank',
                        game: 'CS:GO',
                        title: 'Current Rank',
                    },
                    {
                        type: 'numberGame',
                        game: 'CS:GO',
                        title: 'Number of Wins',
                        min: 1,
                        max: 10,
                    },
                ],
            },
        }, {
            name: 'Wingman Rank',
            require: {
                form: [
                    {
                        type: 'includeRank',
                        game: 'CS:GO',
                        title: 'Current Rank',
                    },
                    {
                        type: 'includeRank',
                        game: 'CS:GO',
                        title: 'Desire Rank',
                    },
                ],
            },
        }, { name: 'Dangerzone Rank', type: 'A' }, {
            name: 'Faceit Level',
            require: {
                form: [
                    {
                        type: 'points',
                        game: 'CS:GO',
                        title: 'Desire Options',
                        unit: 'level',
                        max: 10,
                        min: 1,
                    },
                ],
            },
        }];

        const GenshinImpact = [{ name: 'Daily Mission', type: 'F' }, { name: 'Enhance Weapon', type: 'J' }, { name: 'Adventure Rank', type: 'F' }];
        const CODColdWar = [{ name: 'Camo', type: 'G' }, { name: 'Weapon Level', type: 'J' }, { name: 'Player Level', type: 'F' }];

        if (Game === 'ApexLegends') {
            setService(ApexLegend);
        } else if (Game === 'Valorant') {
            setService(Valorant);
        } else if (Game === 'NewWorld') {
            setService(NewWorld);
        } else if (Game === 'DOTA2') {
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

    function getForm(type: string) {
        setFormType(type);
    }

    function getDataForm(data) {
        setOrderForm(data);
    }

    const [w, setW] = useState(1);

    useEffect(() => {
        if (window.innerWidth < 700) {
            setW(2);
        } else if (window.innerWidth < 1200) {
            setW(3);
        } else {
            setW(4);
        }
        getGames();
    }, [w]);

    return (
        <Container className="my-5 py-5 centered-down">
            <h1 className="section-title mt-5 text-center">Boost</h1>
            <span className="section-subtitle">What we can help you</span>
            <span className="section-subtitle"></span>
            {/* Game Filter */}
            <Row className={`${styles['game-overview']} centered mt-5 mb-3`}>
                <div className={styles['game-container']}>
                    {games.map((game) => (
                        <GameCard data={game} key={game.id} getData={getGame} mini />
                    ))}
                </div>
            </Row>
            {/* Service Filter */}
            <Row className={`${styles['service-slider']} centered mb-3`}>
                <div className={styles['service-slider-container']}>
                    {service.map((i: any) => (
                        <button className="card fit-content card-hovering mx-2" onClick={() => getForm(i.require)}>
                            <span className={styles['service-name']}>{i.name}</span>
                        </button>
                    ))}
                </div>
            </Row>
            {/* Form */}
            <Row className="mt-3 flex-horizon-centered-start gap-3 px-3 fullwidth">
                {/* Isi Form */}
                <Col className="col-md-7 col-12 mx-3">
                    <FormBoost form={formType?.form} getData={getDataForm} />
                </Col>
                {/* View Form */}
                <Col className="col-md-4 col-12 mr-3 flex-horizon-centered-start">
                    <Checkout form={formType?.addons} orderForm={orderForm} />
                </Col>
            </Row>
        </Container>
    );
}

export default Order;
