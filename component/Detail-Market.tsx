/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-useless-fragment */
import {
    Row, Col, Form, InputGroup, Pagination,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AccountCard from './Account-Card';
import DetailModal from './Detail-Modal';
import styles from './styles/DetailPage.module.css';

function DetailMarket(props: any) {
    const { role, token } = props;
    const [modal, showModal] = useState(false);
    const [modal2, showModal2] = useState(false);
    const [modal3, showModal3] = useState(false);

    const [accounts, setAccounts] = useState({ last_page: 0, data: [] });
    const [Ranks, setRanks] = useState([{ name: '', id: 0, badge: 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/storage/images/rank-badges/valorant/unranked.png' }]);
    const [Servers, setServers] = useState([{ id: 0, server_name: '' }]);

    const [filterRank, setFilterRank] = useState('99');
    const [filterServer, setFilterServer] = useState<any>('99');
    const [filterSort, setFilterSort] = useState('asc');

    const [newHighestRank, setNewHighestRank] = useState('');
    const [newAccountPrice, setNewAccountPrice] = useState('');
    const [newAccountServer, setNewAccountServer] = useState('');
    const [newCurrentRank, setNewCurrentRank] = useState('');
    const [newAccountDesc, setNewAccountDesc] = useState('');
    const [newScreenshoot, setNewScreenShoot] = useState('');
    const [newSkins, setNewSkins] = useState<any>([]);
    const [newAgents, setNewAgents] = useState<any>([]);
    const [newId, setId] = useState<any>();

    const [addMoreSkins, setAddMoreSkins] = useState('');
    const [addMoreAgents, setAddMoreAgents] = useState('');

    const [paginationPage, setPaginationPage] = useState(1);
    const pagination: any = [];

    useEffect(() => {
        getAccount();
        getServer();
        getRank();
    }, []);

    useEffect(() => {
        getAccountbyFilter();
    }, [filterRank, filterServer, filterSort]);

    async function getServer() {
        const url = `${process.env.API}/servers`;

        await axios.get(url).then((res) => setServers(res.data.data)).catch((err) => console.log(err));
    }

    async function getRank() {
        const url = `${process.env.API}/ranks`;

        await axios.get(url).then((res) => setRanks(res.data.ranks.data)).catch((err) => console.log(err));
    }

    async function getAccount() {
        await axios.get(`${process.env.API}/accounts`).then((res) => setAccounts(res.data.accounts)).catch((res) => console.log(res));
    }

    function setModal(type) {
        if (type === 'delete') {
            showModal2(true);
        } else {
            showModal(true);
        }
    }

    function clearData() {
        setNewHighestRank('');
        setNewAccountPrice('');
        setNewAccountServer('');
        setNewCurrentRank('');
        setNewAccountDesc('');
        setNewScreenShoot('');
        setNewSkins([]);
        setNewAgents([]);
    }

    // Masih Error API - nya
    async function newAccount() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const data = {
            current_rank_id: newCurrentRank,
            highest_rank_id: newHighestRank,
            server_id: newAccountServer,
            price: newAccountPrice,
            agent_list: newAgents.join(' '),
            skin_list: newSkins.join(' '),
            description: newAccountDesc,
            screenshots: newScreenshoot,
            in_stocks: '1',
        };

        const url = `${process.env.API}/accounts`;

        await axios.post(url, data, config).then((res) => {
            clearData();
            showModal3(false);
            getAccount();
        }).catch((err) => console.log(err));
    }

    async function updateAccount(id) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const data = {
            current_rank_id: newCurrentRank,
            highest_rank_id: newHighestRank,
            server_id: newAccountServer,
            price: newAccountPrice,
            agent_list: newAgents.join(' '),
            skin_list: newSkins.join(' '),
            description: newAccountDesc,
            screenshots: newScreenshoot,
        };

        const url = `${process.env.API}/accounts/${id}`;

        await axios.put(url, data, config).then((res) => {
            showModal(false);
            clearData();
            getAccount();
        }).catch((err) => console.log(err));
    }

    async function deleteAccount(id) {
        const url = `${process.env.API}/accounts/${id}`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        await axios.delete(url, config).then((res) => {
            showModal2(false);
            getAccount();
        });
    }

    function getCurrentAccount(data) {
        setNewSkins(data.skin_list.split(' '));
        setNewAgents(data.agent_list.split(' '));
        setNewHighestRank(data.highest_rank_id);
        setNewAccountPrice(data.price);
        setNewAccountServer(data.server_id);
        setNewCurrentRank(data.current_rank_id);
        setNewAccountDesc(data.description);
        setNewScreenShoot(data.screenshots);
        setId(data.id);
    }

    async function getAccountbyFilter() {
        let url = `${process.env.API}/accounts/?sortOrder=${filterSort}`;

        if (filterRank === '99' || filterServer === '99') {
            getAccount();
            setFilterRank('0');
            setFilterServer('0');
        } else {
            if (filterRank !== '99') {
                url += `&rank=${filterRank}`;
            }
            if (filterServer !== '99') {
                url += `&server_region=${filterServer}`;
            }

            const response = await axios.get(url).then((res) => res.data.accounts).catch((res) => console.log(res));
            setAccounts(response);
            setPaginationPage(1);
        }
    }

    function removeSkins(index) {
        newSkins.splice(index, 1);
        const [...arrSkins] = newSkins;
        setNewSkins(arrSkins);
    }

    function removeAgents(index) {
        newAgents.splice(index, 1);
        const [...arrAgents] = newAgents;
        setNewAgents(arrAgents);
    }

    function addOnSkin(skins) {
        newSkins.push(skins);
        const [...arrSkins] = newSkins;
        setNewSkins(arrSkins);
        setAddMoreSkins('');
    }

    function addOnAgent(agent) {
        newAgents.push(agent);
        const [...arrAgents] = newAgents;
        setNewAgents(arrAgents);
        setAddMoreAgents('');
    }

    async function handlePagination(page) {
        const url = `${process.env.API}/accounts?page=${page}`;

        await axios.get(url).then((res) => setAccounts(res.data.accounts)).catch((res) => console.log(res));

        setPaginationPage(page);
    }

    for (let i = 1; i <= accounts.last_page; i++) {
        pagination.push(
            <Pagination.Item className="pagination-items mx-1" key={i} active={i === paginationPage} onClick={() => handlePagination(i)}>
                {i}
            </Pagination.Item>,
        );
    }

    return (
        <>
            {role === 'admin' && (
                <div className="centered-down">
                    <Row className="fullwidth mt-3">
                        <Col className="flex-horizon-centered-right">
                            <button onClick={() => { showModal3(true); clearData(); }} className="button-border">+ Add Account</button>
                        </Col>
                    </Row>
                    <Row className={`${styles['filter-container']} mt-5 py-4 px-2`}>
                        <Form>
                            <Row className="px-3">
                                <Col className="col-12 col-sm-4 px-4 col-md-6">
                                    <Form.Group className="mb-3 fullwidth ">
                                        <Form.Label>Server</Form.Label>
                                        <Form.Select className="form-layout" value={filterServer} onChange={(e) => setFilterServer(e.target.value)}>
                                            <option value="99">All</option>
                                            {Servers.map((server) => (
                                                <option value={server.id} key={server.id}>{server.server_name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col className="col-12 col-sm-4 px-4 col-md-6">
                                    <Form.Group className="mb-3 fullwidth ">
                                        <Form.Label>Rank</Form.Label>
                                        <Form.Select className="form-layout" value={filterRank} onChange={(e) => setFilterRank(e.target.value)}>
                                            <option value="99">All</option>
                                            {Ranks.map((rank) => (
                                                <option value={rank.id} key={rank.id}>{rank.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                    <Row className="fullwidth my-4">
                        <Col className="gap-4 debug fullwidth flex-horizon-centered-right">
                            <span>Sort By</span>
                            <span className={filterSort === 'asc' ? ('active-org') : ('')} onClick={() => { setFilterSort('asc'); getAccountbyFilter(); }}>ASC</span>
                            <span>||</span>
                            <span className={filterSort === 'desc' ? ('active-org') : ('')} onClick={() => { setFilterSort('desc'); getAccountbyFilter(); }}>DESC</span>
                        </Col>
                    </Row>
                    <Row className={`${styles['card-container']} centered`}>
                        {accounts.data.map((i: any, index) => (
                            <AccountCard data={i} key={index} setModal={setModal} getCurrent={getCurrentAccount} manage />
                        ))}
                    </Row>
                    <Row className="mt-4 mb-3">
                        {accounts.last_page && (
                            <Col>
                                <Pagination className={styles['pagination-container']}>
                                    {paginationPage > 1 && (
                                        <Pagination.Prev className="mx-1" onClick={() => handlePagination(paginationPage - 1)} />
                                    )}

                                    {pagination}

                                    {paginationPage !== accounts.last_page && (
                                        <Pagination.Next className="mx-1" onClick={() => handlePagination(paginationPage + 1)} />
                                    )}
                                </Pagination>
                            </Col>
                        )}
                    </Row>
                    <DetailModal
                        show={modal}
                        onHide={() => showModal(false)}
                    >
                        <h1>Edit Account</h1>
                        <Form.Group className="mb-3 fullwidth">
                            <Row className="gap-3">
                                <Col className="flex-down">
                                    <Form.Label>Server</Form.Label>
                                    <Form.Control className="form-layout mb-4" value={newAccountServer} onChange={(e) => setNewAccountServer(e.target.value)} />
                                </Col>
                                <Col className="flex-down">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control className="form-layout mb-4" value={newAccountPrice} onChange={(e) => setNewAccountPrice(e.target.value)} />
                                </Col>
                            </Row>
                            <Row className="gap-3">
                                <Col className="flex-down">
                                    <Form.Label>Highest Rank</Form.Label>
                                    <Form.Control className="form-layout mb-4" value={newHighestRank} onChange={(e) => setNewHighestRank(e.target.value)} />
                                </Col>
                                <Col className="flex-down">
                                    <Form.Label>Current Rank</Form.Label>
                                    <Form.Control className="form-layout mb-4" value={newCurrentRank} onChange={(e) => setNewCurrentRank(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-down">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control className="form-layout mb-4" value={newAccountDesc} onChange={(e) => setNewAccountDesc(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-down space-between">
                                    <Form.Label>Skins</Form.Label>
                                    <div className="flex-row gap-2 flex-wrap">
                                        {newSkins.map((e, i) => (
                                            <div className="list-skin px-1">
                                                {e}
                                                <span className="pointer mx-1" onClick={() => removeSkins(i)}>x</span>
                                            </div>
                                        ))}
                                    </div>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Skins"
                                            className="form-layout"
                                            onChange={(e) => setAddMoreSkins(e.target.value)}
                                            value={addMoreSkins}
                                        />
                                        <button className="button" onClick={() => addOnSkin(addMoreSkins)}>
                                            +
                                        </button>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-down space-between">
                                    <Form.Label>Agents</Form.Label>
                                    <div className="flex-row gap-2 flex-wrap">
                                        {newAgents.map((e, i) => (
                                            <div className="list-skin px-1">
                                                {e}
                                                <span className="pointer mx-1" onClick={() => removeAgents(i)}>x</span>
                                            </div>
                                        ))}
                                    </div>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Agents"
                                            className="form-layout"
                                            onChange={(e) => setAddMoreAgents(e.target.value)}
                                            value={addMoreAgents}
                                        />
                                        <button className="button" onClick={() => addOnAgent(addMoreAgents)}>
                                            +
                                        </button>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-down">
                                    <Form.Label>Screenshoot</Form.Label>
                                    <Form.Control className="form-layout mb-4" value={newScreenshoot} onChange={(e) => setNewScreenShoot(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-horizon-centered-right">
                                    <div>
                                        <button onClick={() => updateAccount(newId)} className="button capsule">Update</button>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                    </DetailModal>
                    <DetailModal
                        show={modal2}
                        onHide={() => showModal2(false)}
                    >
                        <h1 className="text-center">
                            Delete Account
                        </h1>
                        <p className="text-center">Are you sure want to delete this account from market?</p>
                        <div className="centered mt-5 px-5">
                            <button className="button-org-border" onClick={() => showModal2(false)}>Cancel</button>
                            <button className="button-org" onClick={() => deleteAccount(newId)}>Delete Account</button>
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
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewAccountPrice(e.target.value)} />
                                </Col>
                                <Col className="flex-down">
                                    <Form.Label>Server</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewAccountServer(e.target.value)} />
                                </Col>
                            </Row>
                            <Row className="gap-3">
                                <Col className="flex-down">
                                    <Form.Label>Highest Rank</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewHighestRank(e.target.value)} />
                                </Col>
                                <Col className="flex-down">
                                    <Form.Label>Current Rank</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewCurrentRank(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-down">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewAccountDesc(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-down space-between">
                                    <Form.Label>Skins</Form.Label>
                                    <div className="flex-row gap-2 flex-wrap">
                                        {newSkins.map((e, i) => (
                                            <div className="list-skin px-1">
                                                {e}
                                                <span className="pointer mx-1" onClick={() => removeSkins(i)}>x</span>
                                            </div>
                                        ))}
                                    </div>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Skins"
                                            className="form-layout"
                                            onChange={(e) => setAddMoreSkins(e.target.value)}
                                            value={addMoreSkins}
                                        />
                                        <button className="button" onClick={() => addOnSkin(addMoreSkins)}>
                                            +
                                        </button>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-down space-between">
                                    <Form.Label>Agents</Form.Label>
                                    <div className="flex-row gap-2 flex-wrap">
                                        {newAgents.map((e, i) => (
                                            <div className="list-skin px-1">
                                                {e}
                                                <span className="pointer mx-1" onClick={() => removeAgents(i)}>x</span>
                                            </div>
                                        ))}
                                    </div>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Agents"
                                            className="form-layout"
                                            onChange={(e) => setAddMoreAgents(e.target.value)}
                                            value={addMoreAgents}
                                        />
                                        <button className="button" onClick={() => addOnAgent(addMoreAgents)}>
                                            +
                                        </button>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="flex-down">
                                    <Form.Label>Screenshoot</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewScreenShoot(e.target.value)} />
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
