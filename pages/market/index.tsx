/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
    Container, Row, Col, Form,
} from 'react-bootstrap';
import { GameCard, AccountCard } from '../../component';
import styles from '../../styles/Market.module.css';

function Market() {
    const dataAccount = [
        {
            id: 15345,
            current_rank: 'Diamond 2',
            highest_rank: 'Diamond 1',
            server_region: 'Asia',
            champions: [1, 3, 4, 2, 2, 5, 6],
            skins: [1, 5, 6, 7, 4, 3, 4, 6, 3, 2, 2],
            price: 100.3,
            rank_emb: '/diamond.png',
        }, {
            id: 12543,
            current_rank: 'Diamond 2',
            highest_rank: 'Diamond 1',
            server_region: 'Asia',
            champions: [1, 3, 4, 2, 2, 5, 6],
            skins: [1, 5, 6, 7, 4, 3, 4, 6, 3, 2, 2],
            price: 100.3,
            rank_emb: '/diamond.png',
        }, {
            id: 23654,
            current_rank: 'Diamond 2',
            highest_rank: 'Diamond 1',
            server_region: 'Asia',
            champions: [1, 3, 4, 2, 2, 5, 6],
            skins: [1, 5, 6, 7, 4, 3, 4, 6, 3, 2, 2],
            price: 100.3,
            rank_emb: '/diamond.png',
        },
    ];
    return (
        <Container className="my-5 py-5 centered-down">
            <h1 className="section-title mt-5 text-center">Marketplace</h1>
            <span className="section-subtitle">Find Your Dream Stuff Here</span>
            <Row className="centered my-5">
                <GameCard name="Apex Legend" thumbnail="/apex.png" />
                <GameCard name="Valorant" thumbnail="/valo.png" />
                <GameCard name="New World" thumbnail="/newworld.png" />
                <GameCard name="Dota" thumbnail="/Dota.png" />
                <GameCard name="Black Desert" thumbnail="/Blackdesert.png" />
                <GameCard name="CS:GO" thumbnail="/csgo.png" />
                <GameCard name="Genshin Impact" thumbnail="/Genshin.png" />
                <GameCard name="COD Cold War" thumbnail="/coldwar.png" />
            </Row>
            <Row className={`${styles['filter-container']} py-5 px-3 mb-5`}>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Game</Form.Label>
                                <Form.Select>
                                    <option>option 1</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Server</Form.Label>
                                <Form.Select>
                                    <option>option 1</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select>
                                    <option>option 1</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Champion</Form.Label>
                                <Form.Select>
                                    <option>option 1</option>
                                </Form.Select>
                                <Form.Range />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Skin</Form.Label>
                                <Form.Control />
                                <Form.Range />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Range</Form.Label>
                                <Form.Range />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Range</Form.Label>
                                <Form.Range />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Range</Form.Label>
                                <Form.Range />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className={`${styles['rank-container']} centered`}>
                        <span className="card col-md-2">rank 1</span>
                        <span className="card col-md-2">rank 2</span>
                        <span className="card col-md-2">rank 3</span>
                        <span className="card col-md-2">rank 4</span>
                        <span className="card col-md-2">rank 5</span>
                        <span className="card col-md-2">rank 6</span>
                        <span className="card col-md-2">rank 7</span>
                        <span className="card col-md-2">rank 8</span>
                        <span className="card col-md-2">rank 9</span>
                    </Row>
                </Form>
            </Row>
            <Row className={styles['card-container']}>
                {dataAccount.map((i: any) => (
                    <AccountCard data={i} />
                ))}
            </Row>
        </Container>
    );
}

export default Market;
