/* eslint-disable react/button-has-type */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { GameCard } from '../component';

function Order() {
    const [service, setService] = useState<any>([]);

    function getGame(game: any) {
        const select = game.replace(
            /[^a-zA-Z0-9,\-.?! ]/g,
            '',
        ).replace(/\s/g, '');
        getService(select);
    }

    function getService(Game: any) {
        const ApexLegend = ['Rank Boosting', 'Battlepass Boost', 'Level Boost'];
        const Valorant = ['Rank Boosting', 'Placement', 'Competitive Net Wins', 'Derank', 'Unrated Wins', 'Challenges', 'Smurf Account'];
        const NewWorld = ['Player Level', 'Coins', 'Trade Skill', 'Gear Score', 'Mutated Expeditions', 'Weapon Mastery', 'Farming Service'];
        const Dota = ['Placement Matches', 'MMR Boost', 'Ranked Net Win', 'Low Priority'];
        const BlackDesert = ['Hourly Farm', 'Questlines', 'Energy Point', 'Level Boost', 'Contribution Points', 'Adventure Logs'];
        const CSGO = ['Macthmaking Rank', 'Matchmaking Net Rank', 'Wingman Rank', 'Dangerzone Rank', 'Faceit Level'];
        const GenshinImpact = [null];
        const CODColdWar = ['Camo', 'Weapon Level', 'Player Level'];

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
        <Container className="my-5 py-5 centered-down">
            <h1 className="section-title mt-5 text-center">Boost</h1>
            <span className="section-subtitle">Choose Your Game</span>
            <Row className="centered my-5">
                <GameCard name="Apex Legend" thumbnail="/apex.png" getData={getGame} />
                <GameCard name="Valorant" thumbnail="/valo.png" getData={getGame} />
                <GameCard name="New World" thumbnail="/newworld.png" getData={getGame} />
                <GameCard name="Dota" thumbnail="/Dota.png" getData={getGame} />
                <GameCard name="Black Desert" thumbnail="/Blackdesert.png" getData={getGame} />
                <GameCard name="CS:GO" thumbnail="/csgo.png" getData={getGame} />
                <GameCard name="Genshin Impact" thumbnail="/Genshin.png" getData={getGame} />
                <GameCard name="COD Cold War" thumbnail="/coldwar.png" getData={getGame} />
            </Row>
            <Row className="centered my-5">
                {service.map((i: any) => (
                    <Col className="card fit-content mx-2">
                        {i}
                    </Col>
                ))}
            </Row>
            <Row>
                <Col className="col-md-7 mx-3 card">
                    <h1>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, maiores!
                    </h1>
                </Col>
                <Col className="col-md-4 mr-3 card">
                    <h3 className="text-center">
                        Checkout
                    </h3>
                    <h4>Total Amount</h4>
                    <h4> $50.00</h4>
                    <button className="button capsule">Pay Now</button>
                </Col>
            </Row>
        </Container>
    );
}

export default Order;
