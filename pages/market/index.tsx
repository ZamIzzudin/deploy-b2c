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
import Head from 'next/head';

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';

import { AccountCard } from '../../component';
import { SAccountList } from '../../component/Skeleton-Loading';

import styles from '../../styles/Market.module.css';

import { asyncGetAllAccountByFilter, asyncShowAccountsWithPagination } from '../../state/accounts/action';

function Market() {
    const { accounts = {}, ranks = [], servers = [] } = useAppSelector((states) => states);
    const dispatch = useAppDispatch();

    const [filterRank, setFilterRank] = useState('All');
    const [filterServer, setFilterServer] = useState<any>('All');
    const [filterSort, setFilterSort] = useState('asc');

    const [paginationPage, setPaginationPage] = useState(1);
    const pagination: any = [];

    if (accounts.last_page > 0) {
        for (let i = 1; i <= accounts.last_page; i++) {
            pagination.push(
                <Pagination.Item className="pagination-items mx-1" key={i} active={i === paginationPage} onClick={() => setPaginationPage(i)}>
                    {i}
                </Pagination.Item>,
            );
        }
    }

    useEffect(() => {
        dispatch(asyncGetAllAccountByFilter(filterSort, filterRank, filterServer));
        setPaginationPage(1);
    }, [filterRank, filterServer, filterSort]);

    useEffect(() => {
        dispatch(asyncShowAccountsWithPagination(paginationPage));
    }, [paginationPage]);

    return (
        <Container className="mt-5 pt-5 centered-down">
            <Head>
                <title>Lunar Boost | Market</title>
            </Head>
            <h1 className="section-title mt-5 text-center">Market</h1>
            <span className="section-subtitle">You don't have to start from scratch</span>
            <Row className={`${styles['filter-container']} mt-5 py-4 px-2`}>
                <Form>
                    <Row className="px-3">
                        <Col className="col-12 col-sm-4 px-4 col-md-6">
                            <Form.Group className="mb-3 fullwidth ">
                                <Form.Label>Server</Form.Label>
                                <Form.Select className="form-layout" value={filterServer} onChange={(e) => setFilterServer(e.target.value)}>
                                    <option value="All">All</option>
                                    {servers?.map((server) => (
                                        <option value={server.id} key={server.id}>{server.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col className="col-12 col-sm-4 px-4 col-md-6">
                            <Form.Group className="mb-3 fullwidth ">
                                <Form.Label>Rank</Form.Label>
                                <Form.Select className="form-layout" value={filterRank} onChange={(e) => setFilterRank(e.target.value)}>
                                    <option value="All">All</option>
                                    {ranks?.map((rank) => (
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
                    <span className={filterSort === 'asc' ? ('active-org') : ('none')} onClick={() => { setFilterSort('asc'); }}>ASC</span>
                    <span>||</span>
                    <span className={filterSort === 'desc' ? ('active-org') : ('none')} onClick={() => { setFilterSort('desc'); }}>DESC</span>
                </Col>
            </Row>
            {accounts.data !== undefined ? (
                <Row className={`${styles['card-container']} centered`}>
                    {accounts.data.map((i: any, index) => (
                        <AccountCard data={i} key={index} />
                    ))}
                </Row>
            ) : (
                <SAccountList />
            )}
            <Row className="mt-4 mb-3">
                {accounts.last_page && (
                    <Col>
                        <Pagination className={styles['pagination-container']}>
                            {paginationPage !== 1 && (
                                <Pagination.Prev className="mx-1" onClick={() => setPaginationPage(paginationPage - 1)} />
                            )}

                            {pagination}

                            {paginationPage !== accounts.last_page && (
                                <Pagination.Next className="mx-1" onClick={() => setPaginationPage(paginationPage + 1)} />
                            )}
                        </Pagination>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default Market;
