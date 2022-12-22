/* eslint-disable func-names */
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
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import AccountCard from './Account-Card';
import DetailModal from './Detail-Modal';
import styles from './styles/DetailPage.module.css';
import { encrypt, decrypt } from '../utils/crypto';

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

    const [newHighestRank, setNewHighestRank] = useState<any>(1);
    const [newAccountPrice, setNewAccountPrice] = useState('');
    const [newAccountServer, setNewAccountServer] = useState<any>(1);
    const [newCurrentRank, setNewCurrentRank] = useState<any>(1);
    const [newAccountDesc, setNewAccountDesc] = useState('');
    const [newScreenshoot, setNewScreenShoot] = useState<any>([]);
    const [currentScreenshoot, setCurrentScreenShoot] = useState<any>([]);
    const [showScreenshoot, setShowScreenShoot] = useState<any>([]);
    const [newSkins, setNewSkins] = useState<any>([]);
    const [newAgents, setNewAgents] = useState<any>([]);
    const [newId, setId] = useState<any>();

    // Credential
    const [accountEmail, setAccountEmail] = useState('');
    const [accountEmailPass, setAccountEmailPass] = useState('');
    const [accountUsername, setAccountUsername] = useState('');
    const [accountPass, setAccountPass] = useState('');

    const [addMoreSkins, setAddMoreSkins] = useState('');
    const [addMoreAgents, setAddMoreAgents] = useState('');

    const [paginationPage, setPaginationPage] = useState(1);
    const pagination: any = [];

    const fileForm = useRef<any>();

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
        const url = `${process.env.API}/ranks?game=valorant`;

        await axios.get(url).then((res) => setRanks(res.data.ranks.data)).catch((err) => console.log(err));
    }

    async function getAccount() {
        await axios.get(`${process.env.API}/accounts`)
            .then((res) => setAccounts(res.data.accounts))
            .catch((res) => console.log(res));
    }

    function setModal(type) {
        if (type === 'delete') {
            showModal2(true);
        } else {
            showModal(true);
        }
    }

    function clearData() {
        setNewHighestRank(1);
        setNewAccountPrice('');
        setNewAccountServer(1);
        setNewCurrentRank(1);
        setNewAccountDesc('');
        setNewScreenShoot([]);
        setNewCurrentRank([]);
        setShowScreenShoot([]);
        setNewSkins([]);
        setNewAgents([]);
    }

    async function newAccount() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const formData = new FormData();

        formData.append('current_rank_id', newCurrentRank);
        formData.append('highest_rank_id', newHighestRank);
        formData.append('server_id', newAccountServer);
        formData.append('price', newAccountPrice);
        formData.append('agent_list', newAgents);
        formData.append('skin_list', newSkins);
        formData.append('description', newAccountDesc);
        formData.append('in_stocks', '1');

        if (newScreenshoot?.length > 0) {
            newScreenshoot.forEach((SS) => {
                formData.append('screenshots[]', SS);
            });
        } else {
            formData.append('screenshots[]', ' ');
        }

        const url = `${process.env.API}/accounts`;

        formData.append('account_username', encrypt(accountUsername));
        formData.append('account_password', encrypt(accountPass));
        formData.append('account_email', encrypt(accountEmail));
        formData.append('account_email_password', encrypt(accountEmailPass));

        await axios.post(url, formData, config).then((res) => {
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

        const formData = new FormData();

        formData.append('current_rank_id', newCurrentRank);
        formData.append('highest_rank_id', newHighestRank);
        formData.append('server_id', newAccountServer);
        formData.append('price', newAccountPrice);
        formData.append('agent_list', newAgents);
        formData.append('skin_list', newSkins);
        formData.append('description', newAccountDesc);

        if (newScreenshoot?.length > 0) {
            newScreenshoot.forEach((SS) => {
                formData.append('screenshots[]', SS);
            });
        } else {
            formData.append('screenshots[]', ' ');
        }

        formData.append('account_username', encrypt(accountUsername));
        formData.append('account_password', encrypt(accountPass));
        formData.append('account_email', encrypt(accountEmail));
        formData.append('account_email_password', encrypt(accountEmailPass));

        const url = `${process.env.API}/accounts/${id}`;

        await axios.post(url, formData, config).then((res) => {
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
        clearData();
        setNewSkins(data.skin_list);
        setNewAgents(data.agent_list);
        setNewHighestRank(data.highest_rank_id);
        setNewAccountPrice(data.price);
        setNewAccountServer(data.server_id);
        setNewCurrentRank(data.current_rank_id);
        setNewAccountDesc(data.description);
        setCurrentScreenShoot(JSON.parse(data.screenshots));
        setId(data.id);
        setAccountEmail(decrypt(data.account_email));
        setAccountEmailPass(decrypt(data.account_email_password));
        setAccountUsername(decrypt(data.account_username));
        setAccountPass(decrypt(data.account_password));
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

    function addScreenshoot(e) {
        const file = e.target.files[0];
        setNewScreenShoot([...newScreenshoot, file]);

        if (file !== undefined) {
            const reader = new FileReader();
            reader.onload = function () {
                const { result } = reader;
                const detail = {
                    src: result,
                    name: file.name,
                };
                setShowScreenShoot([...showScreenshoot, detail]);
            };
            reader.readAsDataURL(file);
        }
    }

    async function deleteScreenshoot(link) {
        const name = link.slice(56).split('.')[0];
        const url = `${process.env.API}/accounts/${newId}/${name}`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        await axios.delete(url, config).then(async (res) => {
            setCurrentScreenShoot(JSON.parse(res.data.data.screenshots));
        }).catch((err) => console.log(err));
    }

    function deleteShowScreenshoot(name) {
        const showSS = showScreenshoot.filter((item) => item.name !== name);
        const showFile = newScreenshoot.filter((file) => file.name !== name);
        setNewScreenShoot(showFile);
        setShowScreenShoot(showSS);
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

                    {/* Edit Account on Market Modal */}
                    <DetailModal
                        show={modal}
                        onHide={() => showModal(false)}
                    >
                        <h3 className="sec-font">Edit Account</h3>
                        <Form.Group className=" fullwidth">
                            <Row className="gap-3">
                                <Col className="flex-down">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control className="form-layout mb-4" value={newAccountPrice} onChange={(e) => setNewAccountPrice(e.target.value)} />
                                </Col>
                                <Col className="flex-down">
                                    <Form.Label>Server</Form.Label>
                                    <Form.Select className="form-layout mb-4" value={newAccountServer} onChange={(e) => setNewAccountServer(e.target.value)}>
                                        {Servers.map((server) => (
                                            <option value={server.id} key={server.id}>{server.server_name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className="gap-3">
                                <Col className="flex-down">
                                    <Form.Label>Highest Rank</Form.Label>
                                    <Form.Select className="form-layout mb-4" value={newHighestRank} onChange={(e) => setNewHighestRank(e.target.value)}>
                                        {Ranks.map((rank) => (
                                            <option value={rank.id} key={rank.id}>{rank.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col className="flex-down">
                                    <Form.Label>Current Rank</Form.Label>
                                    <Form.Select className="form-layout mb-4" value={newCurrentRank} onChange={(e) => setNewCurrentRank(e.target.value)}>
                                        {Ranks.map((rank) => (
                                            <option value={rank.id} key={rank.id}>{rank.name}</option>
                                        ))}
                                    </Form.Select>
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
                                    <div className="flex-row gap-2 flex-wrap mb-2">
                                        {newSkins.map((e, i) => (
                                            <div className="list-skin">
                                                <span className="sec-font">
                                                    {e}
                                                </span>
                                                <div className="pointer centered" onClick={() => removeSkins(i)}>
                                                    <i className="fa-solid fa-xmark" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Skins Name"
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
                                    <div className="flex-row gap-2 flex-wrap mb-2">
                                        {newAgents.map((e, i) => (
                                            <div className="list-skin">
                                                <span className="sec-font">
                                                    {e}
                                                </span>

                                                <span className="pointer centered" onClick={() => removeAgents(i)}>
                                                    <i className="fa-solid fa-xmark" />
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Agents Name"
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
                                <Col className="flex-down mb-3">
                                    <Form.Label>Screenshoot</Form.Label>
                                    {currentScreenshoot?.map((link) => (
                                        <div className="spbetween-horizontal mb-3">
                                            <Image src={link} height="60px" width="90px" />
                                            <span>{link.slice(56)}</span>
                                            <button className={styles['delete-btn']} onClick={() => deleteScreenshoot(link)}>
                                                <i className="fa-solid fa-trash-can" />
                                            </button>
                                        </div>
                                    ))}
                                    {showScreenshoot?.map((image) => (
                                        <div className="spbetween-horizontal mb-3">
                                            <Image src={image.src} height="60px" width="90px" />
                                            <span>{image.name}</span>
                                            <button className={styles['delete-btn']} onClick={() => deleteShowScreenshoot(image.name)}>
                                                <i className="fa-solid fa-trash-can" />
                                            </button>
                                        </div>
                                    ))}
                                    <input type="file" onChange={(e) => { addScreenshoot(e); }} accept="image/png, image/jpg, image/jpeg" hidden ref={fileForm} />
                                    <button className="button-org-border capsule" onClick={() => fileForm.current?.click()}>
                                        Choose File
                                    </button>
                                </Col>
                            </Row>
                            <h5>Credential Account</h5>
                            <hr />
                            <Row>
                                <Col className="flex-down">
                                    <Form.Group className="flex-down mb-2">
                                        <Form.Label>Username Account</Form.Label>
                                        <Form.Control value={accountUsername} onChange={(e) => setAccountUsername(e.target.value)} className="form-layout" />
                                    </Form.Group>
                                    <Form.Group className="flex-down mb-2">
                                        <Form.Label>Password Account</Form.Label>
                                        <Form.Control value={accountPass} onChange={(e) => setAccountPass(e.target.value)} className="form-layout" />
                                    </Form.Group>
                                </Col>
                                <Col className="flex-down">
                                    <Form.Group className="flex-down mb-2">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control value={accountEmail} onChange={(e) => setAccountEmail(e.target.value)} className="form-layout" />
                                    </Form.Group>
                                    <Form.Group className="flex-down mb-2">
                                        <Form.Label>Password Email</Form.Label>
                                        <Form.Control value={accountEmailPass} onChange={(e) => setAccountEmailPass(e.target.value)} className="form-layout" />
                                    </Form.Group>
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

                    {/* Confirm to Delete Acoount on Market Modal */}
                    <DetailModal
                        show={modal2}
                        onHide={() => showModal2(false)}
                    >
                        <h3 className="text-center sec-font">
                            Delete Account
                        </h3>
                        <p className="text-center mt-4">Are you sure want to delete this account from market?</p>
                        <div className="centered mt-4 px-5">
                            <button className="button-org-border" onClick={() => showModal2(false)}>Cancel</button>
                            <button className="button-org" onClick={() => deleteAccount(newId)}>Delete Account</button>
                        </div>
                    </DetailModal>

                    {/* Add New Account on Market Modal */}
                    <DetailModal
                        show={modal3}
                        onHide={() => showModal3(false)}
                    >
                        <h3 className="sec-font">Add New Account</h3>
                        <Form.Group className="fullwidth">
                            {/* Price and Server Form */}
                            <Row className="gap-3">
                                <Col className="flex-down">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewAccountPrice(e.target.value)} />
                                </Col>
                                <Col className="flex-down">
                                    <Form.Label>Server</Form.Label>
                                    <Form.Select className="form-layout mb-4" defaultValue={newAccountServer} onChange={(e) => setNewAccountServer(e.target.value)}>
                                        {Servers.map((server) => (
                                            <option value={server.id} key={server.id}>{server.server_name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                            {/* Rank Form */}
                            <Row className="gap-3">
                                <Col className="flex-down">
                                    <Form.Label>Highest Rank</Form.Label>
                                    <Form.Select className="form-layout mb-4" value={newHighestRank} onChange={(e) => setNewHighestRank(e.target.value)}>
                                        {Ranks.map((rank) => (
                                            <option value={rank.id} key={rank.id}>{rank.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col className="flex-down">
                                    <Form.Label>Current Rank</Form.Label>
                                    <Form.Select className="form-layout mb-4" value={newCurrentRank} onChange={(e) => setNewCurrentRank(e.target.value)}>
                                        {Ranks.map((rank) => (
                                            <option value={rank.id} key={rank.id}>{rank.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                            {/* Description Form */}
                            <Row>
                                <Col className="flex-down">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control className="form-layout mb-4" onChange={(e) => setNewAccountDesc(e.target.value)} />
                                </Col>
                            </Row>
                            {/* Detail Skin List */}
                            <Row>
                                <Col className="flex-down space-between">
                                    <Form.Label>Skins</Form.Label>
                                    <div className="flex-row gap-2 flex-wrap mb-2">
                                        {newSkins.map((e, i) => (
                                            <div className="list-skin">
                                                <span className="sec-font">
                                                    {e}
                                                </span>
                                                <span className="pointer centered" onClick={() => removeSkins(i)}>
                                                    <i className="fa-solid fa-xmark" />
                                                </span>
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
                            {/* Detail Agent List */}
                            <Row>
                                <Col className="flex-down space-between">
                                    <Form.Label>Agents</Form.Label>
                                    <div className="flex-row gap-2 flex-wrap mb-2">
                                        {newAgents.map((e, i) => (
                                            <div className="list-skin">
                                                <span className="sec-font">
                                                    {e}
                                                </span>
                                                <span className="pointer centered" onClick={() => removeAgents(i)}>
                                                    <i className="fa-solid fa-xmark" />
                                                </span>
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
                            {/* Screenshoot Form */}
                            <Row>
                                <Col className="flex-down mb-3">
                                    <Form.Label>Screenshoot</Form.Label>
                                    {showScreenshoot?.map((image) => (
                                        <div className="spbetween-horizontal mb-3">
                                            <Image src={image.src} height="60px" width="90px" />
                                            <span>{image.name}</span>
                                            <button className={styles['delete-btn']} onClick={() => deleteShowScreenshoot(image.name)}>
                                                <i className="fa-solid fa-trash-can" />
                                            </button>
                                        </div>
                                    ))}
                                    <input type="file" onChange={(e) => { addScreenshoot(e); }} accept="image/png, image/jpg, image/jpeg" hidden ref={fileForm} />
                                    <button className="button-org-border capsule" onClick={() => fileForm.current?.click()}>
                                        Choose File
                                    </button>
                                </Col>
                            </Row>
                            {/* Credential Account */}
                            <h5>Credential Account</h5>
                            <hr />
                            <Row>
                                <Col className="flex-down">
                                    <Form.Group className="flex-down mb-2">
                                        <Form.Label>Username Account</Form.Label>
                                        <Form.Control value={accountUsername} onChange={(e) => setAccountUsername(e.target.value)} className="form-layout" />
                                    </Form.Group>
                                    <Form.Group className="flex-down mb-2">
                                        <Form.Label>Password Account</Form.Label>
                                        <Form.Control value={accountPass} onChange={(e) => setAccountPass(e.target.value)} className="form-layout" />
                                    </Form.Group>
                                </Col>
                                <Col className="flex-down">
                                    <Form.Group className="flex-down mb-2">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control value={accountEmail} onChange={(e) => setAccountEmail(e.target.value)} className="form-layout" />
                                    </Form.Group>
                                    <Form.Group className="flex-down mb-2">
                                        <Form.Label>Password Email</Form.Label>
                                        <Form.Control value={accountEmailPass} onChange={(e) => setAccountEmailPass(e.target.value)} className="form-layout" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            {/* Button Submit */}
                            <Row>
                                <Col className="flex-horizon-centered-right mt-3">
                                    <div>
                                        <button onClick={() => newAccount()} className="button capsule">Add</button>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                    </DetailModal>
                </div>
            )}
            {
                role !== 'admin' && (
                    <div className="error-container fullwidth">
                        <Image src="/Jett-Sticker.png" width="300" height="300" />
                        <span className="sec-font">Go Back to Home Page</span>
                        <Link href="/">
                            <button className="button capsule mt-3" type="button">Home</button>
                        </Link>
                    </div>
                )
            }
        </>
    );
}

export default DetailMarket;
