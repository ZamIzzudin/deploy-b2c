/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-useless-fragment */
import { Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import Image from 'next/image';
import AccountCard from './Account-Card';
import DetailModal from './Detail-Modal';
import styles from './styles/DetailPage.module.css';

function DetailMarket(props: any) {
    const { role } = props;
    const [modal, showModal] = useState(false);
    const [modal2, showModal2] = useState(false);
    const [modal3, showModal3] = useState(false);

    const [minPrice, setMin] = useState(0);
    const [maxPrice, setMax] = useState(1000);

    const [newAccountName, setNewAccountName] = useState('');
    const [newAccountPrice, setNewAccountPrice] = useState('');
    const [newAccountServer, setNewAccountServer] = useState('');
    const [newAccountRank, setNewAccountRank] = useState('');
    const [newAccountDesc, setNewAccountDesc] = useState('');

    const plain = {
        id: '',
        current_rank: '',
        highest_rank: '',
        server: '',
        agents_count: '',
        skins_count: '',
        price: '',
        rank_emb: '',
        name: '',
        description: '',
    };

    const [currentAccount, setCurrentAccount] = useState(plain);

    function setModal(type) {
        if (type === 'delete') {
            showModal2(true);
        } else {
            showModal(true);
        }
    }

    function clearData() {
        setNewAccountName('');
        setNewAccountPrice('');
        setNewAccountServer('');
        setNewAccountRank('');
        setNewAccountDesc('');
    }

    function getMaxValue(value: any) {
        setMax(value);
    }

    function getMinValue(value: any) {
        setMin(value);
    }

    function newAccount() {
        const data = {
            name: newAccountName,
            server_id: newAccountServer,
            rank_id: newAccountRank,
            price: newAccountPrice,
            description: newAccountDesc,
        };

        console.log(data);
        showModal3(false);
        clearData();
    }

    async function getCurrentAccount(data) {
        await setCurrentAccount(data);
        console.log(currentAccount);
    }

    const data = [
        {
            id: 15345,
            current_rank: 'Gold 3',
            highest_rank: 'Platinum 1',
            server: 'South East Asia',
            agents_count: 9,
            skins_count: 6,
            price: 210.3,
            rank_emb: '/gold_valo.png',
            description: 'lorem ipsum segala macem',
            name: 'valorant account',
        }, {
            id: 12543,
            current_rank: 'Gold 1',
            highest_rank: 'Gold 1',
            server: 'China',
            agents_count: 8,
            skins_count: 7,
            price: 160.3,
            rank_emb: '/gold_valo.png',
            description: 'lorem ipsum segala macem',
            name: 'valorant account',
        }, {
            id: 32345,
            current_rank: 'Diamond 3',
            highest_rank: 'Immortal 1',
            server: 'South East Asia',
            agents_count: 7,
            skins_count: 9,
            price: 403.4,
            rank_emb: '/diamond_valo.webp',
            description: 'lorem ipsum segala macem',
            name: 'valorant account',
        }];

    return (
        <>
            {role === 'admin' && (
                <div className="centered-down">
                    <Row className="fullwidth mt-3">
                        <Col className="flex-horizon-centered-right">
                            <button onClick={() => { showModal3(true); clearData(); }} className="button-border">+ Add Account</button>
                        </Col>
                    </Row>
                    <Row className={`${styles['filter-container']} my-4 py-5 px-3`}>
                        <Form>
                            <Row className="px-3">
                                <Col className="col-12 col-sm-6 col-md-4">
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
                                <Col className="col-6 col-sm-3 px-4 col-md-4">
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
                                <Col className="col-6 col-sm-3 px-4 col-md-4">
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
                                <span className="inside-card col-md-2 col-3 card-hovering flex-row centered mb-3">
                                    <Image src="/unranked_mini_valo.png" width="35" height="35" />
                                    Unranked
                                </span>
                                <span className="inside-card col-md-2 col-3 card-hovering flex-row centered mb-3">
                                    <Image src="/iron_mini_valo.png" width="35" height="35" />
                                    Iron
                                </span>
                                <span className="inside-card col-md-2 col-3 card-hovering flex-row centered mb-3">
                                    <Image src="/bronze_mini_valo.png" width="35" height="35" />
                                    Bronze
                                </span>
                                <span className="inside-card col-md-2 col-3 card-hovering flex-row centered mb-3">
                                    <Image src="/silver_mini_valo.png" width="35" height="35" />
                                    Silver
                                </span>
                                <span className="inside-card col-md-2 col-3 card-hovering flex-row centered mb-3">
                                    <Image src="/gold_mini_valo.png" width="35" height="35" />
                                    Gold
                                </span>
                                <span className="inside-card col-md-2 col-3 card-hovering flex-row centered mb-3">
                                    <Image src="/platinum_mini_valo.png" width="35" height="35" />
                                    Platinum
                                </span>
                                <span className="inside-card col-md-2 col-3 card-hovering flex-row centered mb-3">
                                    <Image src="/diamond_mini_valo.png" width="35" height="35" />
                                    Diamond
                                </span>
                                <span className="inside-card col-md-2 col-3 card-hovering flex-row centered mb-3">
                                    <Image src="/immortal_mini_valo.png" width="35" height="35" />
                                    Immortal
                                </span>
                                <span className="inside-card col-md-2 col-3 card-hovering flex-row centered mb-3">
                                    <Image src="/radiant_mini_valo.png" width="35" height="35" />
                                    Radiant
                                </span>
                            </Row>
                        </Form>
                    </Row>
                    <Row className={`${styles['card-container']} centered`}>
                        {data.map((i: any, index) => (
                            <AccountCard data={i} manage setModal={setModal} key={index} getCurrent={getCurrentAccount} />
                        ))}
                    </Row>
                    <DetailModal
                        show={modal}
                        onHide={() => showModal(false)}
                    >
                        <h1>Edit Account</h1>
                        <Form.Group className="mb-3 fullwidth">
                            <Row className="gap-3">
                                <Col className="flex-down">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control className="form-layout mb-4" value={currentAccount.name} onChange={(e) => setNewAccountName(e.target.value)} />
                                </Col>
                                <Col className="flex-down">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control className="form-layout mb-4" value={currentAccount.price} onChange={(e) => setNewAccountPrice(e.target.value)} />
                                </Col>
                            </Row>
                            <Row className="gap-3">
                                <Col className="flex-down">
                                    <Form.Label>Server</Form.Label>
                                    <Form.Control className="form-layout mb-4" value={currentAccount.server} onChange={(e) => setNewAccountServer(e.target.value)} />
                                </Col>
                                <Col className="flex-down">
                                    <Form.Label>Rank</Form.Label>
                                    <Form.Control className="form-layout mb-4" value={currentAccount.current_rank} onChange={(e) => setNewAccountRank(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-down">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control className="form-layout mb-4" value={currentAccount.description} onChange={(e) => setNewAccountDesc(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-horizon-centered-right">
                                    <div>
                                        <button onClick={() => newAccount()} className="button capsule">Add</button>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                    </DetailModal>
                    <DetailModal
                        show={modal2}
                        onHide={() => showModal2(false)}
                    >
                        <h1 className="text-center">Delete</h1>
                        <p className="text-center">Are you sure want to delete this account from market?</p>
                        <div className="centered mt-5 px-5">
                            <button className="button-org-border">Cancel</button>
                            <button className="button-org">Delete Account</button>
                        </div>
                    </DetailModal>
                    <DetailModal
                        show={modal3}
                        onHide={() => showModal3(false)}
                    >
                        <h1>Add New Account</h1>
                        <Form.Group className="mb-3 fullwidth">
                            <Row className="gap-3">
                                <Col className="flex-down">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewAccountName(e.target.value)} />
                                </Col>
                                <Col className="flex-down">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewAccountPrice(e.target.value)} />
                                </Col>
                            </Row>
                            <Row className="gap-3">
                                <Col className="flex-down">
                                    <Form.Label>Server</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewAccountServer(e.target.value)} />
                                </Col>
                                <Col className="flex-down">
                                    <Form.Label>Rank</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewAccountRank(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-down">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewAccountDesc(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-horizon-centered-right">
                                    <div>
                                        <button onClick={() => newAccount()} className="button capsule">Add</button>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                    </DetailModal>
                </div>
            )}
            {role !== 'admin' && (<h1>404 Error</h1>)}
        </>
    );
}

export default DetailMarket;
