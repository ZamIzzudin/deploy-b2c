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
import { useState } from 'react';
import axios from 'axios';
import { GameCard, FormBoost, Checkout } from '../component';
import styles from '../styles/Boost.module.css';

function Order(props) {
    const { games } = props;
    const [service, setService] = useState<any>([]);
    const [formType, setFormType] = useState<string>('');

    function getGame(game: any) {
        const select = game.replace(
            /[^a-zA-Z0-9,\-.?! ]/g,
            '',
        ).replace(/\s/g, '');
        getService(select);
        setFormType('');
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

    function getForm(type: string) {
        setFormType(type);
    }

    return (
        <Container className="my-5 py-5 centered-down">
            <h1 className="section-title mt-5 text-center">Boost</h1>
            <span className="section-subtitle"></span>
            <Row className="centered mt-5 mb-3">
                <GameCard name="Apex Legend" thumbnail="/apex.png" getData={getGame} mini />
                <GameCard name="Valorant" thumbnail="/valo.png" getData={getGame} mini />
                <GameCard name="New World" thumbnail="/newworld.png" getData={getGame} mini />
                <GameCard name="Dota" thumbnail="/Dota.png" getData={getGame} mini />
                <GameCard name="Black Desert" thumbnail="/Blackdesert.png" getData={getGame} mini />
                <GameCard name="CS:GO" thumbnail="/csgo.png" getData={getGame} mini />
                <GameCard name="Genshin Impact" thumbnail="/Genshin.png" getData={getGame} mini />
                <GameCard name="COD Cold War" thumbnail="/coldwar.png" getData={getGame} mini />
            </Row>
            <Row className="centered mb-3">
                {service.map((i: any) => (
                    <Col className="card fit-content card-hovering mx-2" onClick={() => getForm(i.type)}>
                        <span className={styles['service-name']}>{i.name}</span>
                    </Col>
                ))}
            </Row>
            <Row className="mt-3">
                <Col className="col-md-7 mx-3 card">
                    <FormBoost type={formType} />
                </Col>
                <Col className="col-md-4 mr-3 card">
                    <Checkout type={formType} />
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
