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
import { GameCard, AccountCard } from '../../component';
import styles from '../../styles/Market.module.css';

function Market() {
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
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Server</Form.Label>
                                <Form.Select>
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
                        <Col>
                            <Form.Group>
                                <Form.Label>Min Price</Form.Label>
                                <h5>0</h5>
                                <Form.Range />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Max Price</Form.Label>
                                <h5>100</h5>
                                <Form.Range />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className={`${styles['rank-container']} centered mt-4`}>
                        <span className="card col-md-2">Unranked</span>
                        <span className="card col-md-2">Iron</span>
                        <span className="card col-md-2">Bronze</span>
                        <span className="card col-md-2">Silver</span>
                        <span className="card col-md-2">Gold</span>
                        <span className="card col-md-2">Platinum</span>
                        <span className="card col-md-2">Diamond</span>
                        <span className="card col-md-2">Immortal</span>
                        <span className="card col-md-2">Radiant</span>
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
