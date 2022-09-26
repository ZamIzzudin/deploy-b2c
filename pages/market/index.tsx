/* eslint-disable no-constant-condition */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
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
    Container, Row, Col, Form, Pagination,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AccountCard } from '../../component';
import styles from '../../styles/Market.module.css';

function Market() {
    const [accounts, setAccounts] = useState({ last_page: 0, data: [] });
    const [Ranks, setRanks] = useState([{ name: '', id: 0, badge: 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/storage/images/rank-badges/valorant/unranked.png' }]);
    const [Servers, setServers] = useState([{ id: 0, server_name: '' }]);

    const [filterRank, setFilterRank] = useState('99');
    const [filterServer, setFilterServer] = useState<any>('99');
    const [filterSort, setFilterSort] = useState('asc');

    const [paginationPage, setPaginationPage] = useState(1);
    const pagination: any = [];

    async function getAccount() {
        const url = 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/accounts';

        await axios.get(url).then((res) => setAccounts(res.data.accounts)).catch((err) => console.log(err));
    }

    async function getRank() {
        const url = 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/ranks';

        await axios.get(url).then((res) => setRanks(res.data.ranks.data)).catch((err) => console.log(err));
    }

    async function getServer() {
        const url = 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/servers';

        await axios.get(url).then((res) => setServers(res.data.data)).catch((err) => console.log(err));
    }

    async function getAccountbyFilter() {
        let url = `http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/accounts/?sortOrder=${filterSort}`;

        console.log(filterRank);
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

    async function handlePagination(page) {
        const url = `http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/accounts?page=${page}`;

        await axios.get(url).then((res) => setAccounts(res.data.accounts)).catch((res) => console.log(res));

        setPaginationPage(page);
    }

    if (accounts.last_page > 0) {
        for (let i = 1; i <= accounts.last_page; i++) {
            pagination.push(
                <Pagination.Item className="pagination-items mx-1" key={i} active={i === paginationPage} onClick={() => handlePagination(i)}>
                    {i}
                </Pagination.Item>,
            );
        }
    }

    useEffect(() => {
        getAccount();
        getServer();
        getRank();
    }, []);

    useEffect(() => {
        getAccountbyFilter();
    }, [filterRank, filterServer, filterSort]);

    return (
        <Container className="mt-5 pt-5 centered-down">
            <h1 className="section-title mt-5 text-center">Market</h1>
            <span className="section-subtitle">You don't have to start from scratch</span>
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

                        {/* <Col className="col-6 col-sm-3 px-4 col-md-6">
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
                        <Col className="col-6 col-sm-3 px-4 col-md-6">
                            <Form.Group className="fullwidth">
                                <Form.Label>Max Price</Form.Label>
                                <h5>
                                    $
                                    {' '}
                                    {maxPrice}
                                </h5>
                                <Form.Range min="0" max="1000" onChange={(e: any) => { getMaxValue(e.target.value); }} value={maxPrice} />
                            </Form.Group>
                        </Col> */}
                    </Row>

                    {/* <Row className={`${styles['rank-container']} centered mt-4`}>
                        {Ranks.map((rank) => (
                            <span className={`inside-card col-md-2 col-3 card-hovering flex-row centered mb-3 ${filterRank === rank.id ? ('active') : ('')}`} onClick={() => setFilterRank(rank.id)} key={rank.id}>
                                <Image src={rank.badge} width="35" height="35" />
                                {rank.name}
                            </span>
                        ))}
                    </Row> */}
                </Form>
                {/* <Row className="my-4">
                    <Col>
                        <button className="capsule button mx-3" onClick={() => getAccountbyFilter()}>Search</button>
                        <button className="capsule button-org" onClick={() => clearFilter()}>Clear</button>
                    </Col>
                </Row> */}
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
                    <AccountCard data={i} key={index} />
                ))}
            </Row>
            <Row className="mt-4 mb-3">
                {accounts.last_page && (
                    <Col>
                        <Pagination className={styles['pagination-container']}>
                            {paginationPage !== 1 && (
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
        </Container>
    );
}

export default Market;
