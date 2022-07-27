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

function Order(props) {
    const { games } = props;
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

    function getGame(game: any) {
        const select = game.replace(
            /[^a-zA-Z0-9,\-.?! ]/g,
            '',
        ).replace(/\s/g, '');
        getService(select);
    }

    function getService(Game: any) {
        const ApexLegend = [{ name: 'Rank Boosting', type: 'A' }, { name: 'Battlepass Boost', type: 'B' }, { name: 'Level Boost', type: 'C' }];

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
                addons: ['Appear Offline on Chat', 'Spesific Agents'],
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
                    max: 5,
                    min: 0,
                }],
                addons: ['Appear Offline on Chat', 'Spesific Agents'],
            },
        }, {
            name: 'Competitive Net Wins',
            require: {
                form: [
                    { type: 'includeRank', game: 'Valorant', title: 'Current Rank' }, {
                        type: 'numberGame', game: 'Valorant', title: 'Number of Wins', max: 5, min: 0,
                    },
                ],
                addons: ['Appear Offline on Chat', 'Spesific Agents'],
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
                addons: ['Appear Offline on Chat', 'Spesific Agents'],
            },
        }, {
            name: 'Unrated Wins',
            require: {
                form: [
                    {
                        type: 'numberGame',
                        game: 'valorant',
                        title: 'Number of Games',
                        max: 5,
                        min: 0,
                    },
                ],
                addons: ['Appear Offline on Chat', 'Net Wins', 'Spesific Agents'],
            },
        }, {
            name: 'Challenges',
            require: {
                form: [
                    {
                        type: 'numberGame',
                        game: 'valorant',
                        title: 'Number of Challenges',
                    },
                ],
                addons: ['Appear Offline on Chat', 'Spesific Agents'],
            },
        }];

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

    function getForm(type: string) {
        setFormType(type);
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
    }, [w]);

    return (
        <Container className="my-5 py-5 centered-down">
            <h1 className="section-title mt-5 text-center">Boost</h1>
            <span className="section-subtitle"></span>
            <Row className={`${styles['game-overview']} centered mt-5 mb-3`}>
                <div className={styles['game-container']}>
                    <GameCard name="Apex Legend" thumbnail="/apex.png" getData={getGame} mini />
                    <GameCard name="Valorant" thumbnail="/valo.png" getData={getGame} mini />
                    <GameCard name="New World" thumbnail="/newworld.png" getData={getGame} mini />
                    <GameCard name="Dota" thumbnail="/Dota.png" getData={getGame} mini />
                    <GameCard name="Black Desert" thumbnail="/Blackdesert.png" getData={getGame} mini />
                    <GameCard name="CS:GO" thumbnail="/csgo.png" getData={getGame} mini />
                    <GameCard name="Genshin Impact" thumbnail="/Genshin.png" getData={getGame} mini />
                    <GameCard name="COD Cold War" thumbnail="/coldwar.png" getData={getGame} mini />
                </div>
            </Row>
            <Row className={`${styles['service-slider']} centered mb-3`}>
                <div className={styles['service-slider-container']}>
                    {service.map((i: any) => (
                        <button className="card fit-content card-hovering mx-2" onClick={() => getForm(i.require)}>
                            <span className={styles['service-name']}>{i.name}</span>
                        </button>
                    ))}
                </div>
            </Row>
            <Row className="mt-3 flex-horizon-centered-start gap-3 px-3 fullwidth">
                <Col className="col-md-7 col-12 mx-3">
                    <FormBoost form={formType?.form} />
                </Col>
                <Col className="col-md-4 col-12 mr-3 flex-horizon-centered-start">
                    <Checkout form={formType?.addons} />
                </Col>
            </Row>
        </Container>
    );
}

export default Order;

export async function getStaticProps() {
    const games = await axios.get('http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/games').then((res) => res.data.data).catch((res) => console.log(res));

    return {
        props: {
            games,
        },
    };
}
