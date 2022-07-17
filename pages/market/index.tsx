/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-use-before-define */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-whitespace-before-property */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
    Container, Row, Col, Form,
} from 'react-bootstrap';
import { useState } from 'react';
import Image from 'next/image';
import { AccountCard } from '../../component';
import styles from '../../styles/Market.module.css';

function Market() {
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
            server_region: 'Asia',
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
        }];

    return (
        <Container className="my-5 py-5 centered-down">
            <h1 className="section-title mt-5 text-center">Market</h1>
            <span className="section-subtitle">You don't have to start from scratch</span>
            <Row className={`${styles['filter-container']} my-5 py-5 px-3`}>
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
            <Row className={styles['card-container']}>
                {data.map((i: any) => (
                    <AccountCard data={i} />
                ))}
            </Row>
        </Container>
    );
}

export default Market;
