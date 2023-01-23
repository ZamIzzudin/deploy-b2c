/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SDetailAccount } from '../../component/Skeleton-Loading';
import { ImageGalery } from '../../component';
import styles from '../../styles/Market.module.css';

import { setCheckoutAccount } from '../../state/checkoutDetail/action';

function AccountDetails() {
    const { accountDetail } = useAppSelector((states) => states);
    const dispatch = useAppDispatch();

    function storingData() {
        dispatch(setCheckoutAccount(accountDetail));
    }

    const screenshoot = accountDetail?.screenshots || '[]';

    return (
        <Container className="my-5 py-3">
            <Head>
                <title>Lunar Boost | Detail</title>
            </Head>
            <h1 className="text-center mt-5 section-title">Account Details</h1>
            <h2 className="section-subtitle text-center mb-5 px-3">Know about the details before make decision</h2>
            <Row>
                <Col className="flex-down col-md-8 px-4 col-12">
                    <h1 className={styles['server-name']}>
                        {accountDetail?.server.name}
                        {' '}
                        <span className={styles['id-account']}>
                            /
                            Server
                        </span>
                    </h1>
                    <p className={styles['account-desc']}>{accountDetail?.description}</p>
                </Col>
                <Col className="flex-down-centered-right px-4 col-md-4 col-12">
                    <h2 className={styles['price-tag']}>
                        $
                        {accountDetail?.price}
                    </h2>
                    <Link href="/payment">
                        <button onClick={() => storingData()} className="button capsule">Pay Now</button>
                    </Link>
                </Col>
            </Row>
            {accountDetail?.price > 0 ? (
                <Row className="mt-4 px-4">
                    {accountDetail?.agent_list.length > 0 && (
                        <Col className="col-6 col-md-4 mb-3 pad-right-1-res">
                            <div className="w-95-res center-start card">
                                <h2 className={styles['detail-account-title']}>Agent</h2>
                                {accountDetail.agent_list.length > 5 ? (
                                    <Row className="full-width">
                                        <Col className="col-md-6 col-12 centered-start">
                                            <div className="text-center">
                                                {accountDetail.agent_list.map((i, key) => key % 2 === 0 && (<li key={i} className={styles['detail-list']}>{i.replace(',', ' ')}</li>))}
                                            </div>
                                        </Col>
                                        <Col className="col-md-6 col-12 centered-start">
                                            <div className="text-center">
                                                {accountDetail.agent_list.map((i, key) => key % 2 === 1 && (<li key={i} className={styles['detail-list']}>{i.replace(',', ' ')}</li>))}
                                            </div>
                                        </Col>
                                    </Row>
                                ) : (
                                    <>
                                        {accountDetail.agent_list.map((i) => <li key={i} className={styles['detail-list']}>{i.replace(',', ' ')}</li>)}
                                    </>
                                )}
                            </div>
                        </Col>
                    )}
                    {accountDetail.skin_list.length > 0 && (
                        <Col className="col-6 col-md-4 mb-3 pad-left-1-res">
                            <div className="w-95-res center-start card">
                                <h2 className={styles['detail-account-title']}>Skin</h2>
                                {accountDetail.skin_list.length > 5 ? (
                                    <Row className="full-width">
                                        <Col className="col-md-6 col-12 centered-start">
                                            <div className="text-center">
                                                {accountDetail.skin_list.map((i, key) => key % 2 === 0 && (<li key={i} className={styles['detail-list']}>{i.replace(',', ' ')}</li>))}
                                            </div>
                                        </Col>
                                        <Col className="col-md-6 col-12 centered-start">
                                            <div className="text-center">
                                                {accountDetail.skin_list.map((i, key) => key % 2 === 1 && (<li key={i} className={styles['detail-list']}>{i.replace(',', ' ')}</li>))}
                                            </div>
                                        </Col>
                                    </Row>
                                ) : (
                                    <>
                                        {accountDetail.skin_list.map((i) => <li key={i} className={styles['detail-list']}>{i.replace(',', ' ')}</li>)}
                                    </>
                                )}
                            </div>
                        </Col>
                    )}
                    <Col className="col-12 col-md-4 mb-3">
                        <div className="w-95-res center-start card">
                            <h2 className={styles['detail-account-title']}>Ranked Stats</h2>
                            <Row className={styles['stats-card']}>
                                <Col className="flex-down col-8">
                                    <h3 className={styles['stats-card-title']}>Current Rank</h3>
                                    <span className={styles['stats-card-subtitle']}>{accountDetail.current_rank.name}</span>
                                </Col>
                                <Col className="col-4">
                                    <Image src={accountDetail.current_rank.badge} width="100%" height="100%" />
                                </Col>
                            </Row>
                            <Row className={styles['stats-card']}>
                                <Col className="flex-down col-8">
                                    <h3 className={styles['stats-card-title']}>Highest Rank</h3>
                                    <span className={styles['stats-card-subtitle']}>{accountDetail.highest_rank.name}</span>
                                </Col>
                                <Col className="col-4">
                                    <Image src={accountDetail.highest_rank.badge} width="100%" height="100%" />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            ) : (
                <SDetailAccount />
            )}
            {screenshoot.length > 0 ? (
                <Row className="mt-4 px-4">
                    <ImageGalery images={screenshoot} />
                </Row>
            ) : null}
        </Container>
    );
}

export default AccountDetails;
