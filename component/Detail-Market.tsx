/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-useless-fragment */
import { Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import Image from 'next/image';
import AccountCard from './Account-Card';
import styles from './styles/DetailPage.module.css';

function DetailMarket(props: any) {
    const { role } = props;
    const [minPrice, setMin] = useState(0);
    const [maxPrice, setMax] = useState(1000);

    function getMaxValue(value: any) {
        setMax(value);
    }

    function getMinValue(value: any) {
        setMin(value);
    }

    const data = [
        {
            id: 15345,
            current_rank: 'Gold 3',
            highest_rank: 'Platinum 1',
            server_region: 'South East Asia',
            agent: [1, 3, 4, 2, 2, 5, 6],
            skins: [1, 5, 6, 7, 4, 3, 4, 6, 3, 2, 2],
            price: 210.3,
            rank_emb: '/gold_valo.png',
        }, {
            id: 12543,
            current_rank: 'Gold 1',
            highest_rank: 'Gold 1',
            server_region: 'China',
            agent: [1, 3, 4, 2, 2, 5, 6],
            skins: [1, 5, 6, 7, 4, 3, 4, 6, 3, 2, 2],
            price: 160.3,
            rank_emb: '/gold_valo.png',
        }, {
            id: 32345,
            current_rank: 'Diamond 3',
            highest_rank: 'Immortal 1',
            server_region: 'South East Asia',
            agent: [1, 3, 4, 2, 2, 5, 6],
            skins: [1, 5, 6, 7, 4, 3, 4, 6, 3, 2, 2],
            price: 403.4,
            rank_emb: '/diamond_valo.webp',
        }];

    return (
        <>
            {role === 'admin' && (
                <div>
                    <Row>
                        <Col>
                            <button className="button">+ Add Account</button>
                        </Col>
                    </Row>
                    <Row className={`${styles['filter-container']} my-4 py-5 px-3`}>
                        <Form>
                            <Row>
                                <Col className="px-5">
                                    <Form.Group className="mb-3 fullwidth">
                                        <Form.Label>Server</Form.Label>
                                        <Form.Select className="form-layout">
                                            <option>All</option>
                                            <option>EU-West</option>
                                            <option>EU-Nordic & East</option>
                                            <option>North America</option>
                                            <option>Oceania</option>
                                            <option>Turkey</option>
                                            <option>Russia</option>
                                            <option>Brazil</option>
                                            <option>Latin America North</option>
                                            <option>Latin America South</option>
                                            <option>Korea</option>
                                            <option>Japan</option>
                                            <option>China</option>
                                            <option>South East Asia (SEA)</option>
                                            <option>PBE</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col className="px-5">
                                    <Form.Group className="fullwidth">
                                        <Form.Label>Min Price</Form.Label>
                                        <h5>
                                            $
                                            {' '}
                                            {minPrice}
                                        </h5>
                                        <Form.Range className="form-range" min="0" max="1000" onChange={(e: any) => { getMinValue(e.target.value); }} value={minPrice} />
                                    </Form.Group>
                                </Col>
                                <Col className="px-5">
                                    <Form.Group className="fullwidth">
                                        <Form.Label>Max Price</Form.Label>
                                        <h5>
                                            $
                                            {' '}
                                            {maxPrice}
                                        </h5>
                                        <Form.Range min="0" max="1000" onChange={(e: any) => { getMaxValue(e.target.value); }} value={maxPrice} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className={`${styles['rank-container']} centered mt-4`}>
                                <span className="inside-card col-md-2 card-hovering flex-row centered mb-3">
                                    <Image src="/unranked_mini_valo.png" width="35" height="35" />
                                    Unranked
                                </span>
                                <span className="inside-card col-md-2 card-hovering flex-row centered mb-3">
                                    <Image src="/iron_mini_valo.png" width="35" height="35" />
                                    Iron
                                </span>
                                <span className="inside-card col-md-2 card-hovering flex-row centered mb-3">
                                    <Image src="/bronze_mini_valo.png" width="35" height="35" />
                                    Bronze
                                </span>
                                <span className="inside-card col-md-2 card-hovering flex-row centered mb-3">
                                    <Image src="/silver_mini_valo.png" width="35" height="35" />
                                    Silver
                                </span>
                                <span className="inside-card col-md-2 card-hovering flex-row centered mb-3">
                                    <Image src="/gold_mini_valo.png" width="35" height="35" />
                                    Gold
                                </span>
                                <span className="inside-card col-md-2 card-hovering flex-row centered mb-3">
                                    <Image src="/platinum_mini_valo.png" width="35" height="35" />
                                    Platinum
                                </span>
                                <span className="inside-card col-md-2 card-hovering flex-row centered mb-3">
                                    <Image src="/diamond_mini_valo.png" width="35" height="35" />
                                    Diamond
                                </span>
                                <span className="inside-card col-md-2 card-hovering flex-row centered mb-3">
                                    <Image src="/immortal_mini_valo.png" width="35" height="35" />
                                    Immortal
                                </span>
                                <span className="inside-card col-md-2 card-hovering flex-row centered mb-3">
                                    <Image src="/radiant_mini_valo.png" width="35" height="35" />
                                    Radiant
                                </span>
                            </Row>
                        </Form>
                    </Row>
                    <Row className="centered">
                        {data.map((i: any) => (
                            <AccountCard data={i} manage />
                        ))}
                    </Row>
                </div>
            )}
            {role !== 'admin' && (<h1>404 Error</h1>)}
        </>
    );
}

export default DetailMarket;
