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
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import { SDetailAccount } from '../../component/Skeleton-Loading';
import styles from '../../styles/Market.module.css';

function AccountDetails() {
    const [Details, setDetails] = useState<any>({
        price: 0,
        server: {
            name: '',
        },
        description: '',
        id: '',
    });

    const [agents, setAgents] = useState<any>([]);
    const [skins, setSkins] = useState<any>([]);
    const [screenshots, setScreenshots] = useState<any>([]);

    function storingData() {
        const transaction = {
            id_account: Details.id,
            total_price: Details.price,
            service: 'Market',
            type: 'Valorant Account',
            rank: Details.current_rank.id,
            game: {
                id: 2,
                name: 'Valorant',
                logo_url: 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/storage/images/game-logo/valo.png',
            },
        };

        localStorage.setItem('data', JSON.stringify(transaction));
    }

    useEffect(() => {
        const preData = localStorage.getItem('account') || '';
        setDetails(JSON.parse(preData));
        console.log(JSON.parse(preData));
        setScreenshots(JSON.parse(JSON.parse(preData).screenshots));
        setAgents(JSON.parse(preData).agent_list.split(' '));
        setSkins(JSON.parse(preData).skin_list.split(' '));
        localStorage.setItem('data', '');
    }, []);

    return (
        <Container className="my-5 py-3">
            <h1 className="text-center mt-5 section-title">Account Details</h1>
            <h2 className="section-subtitle text-center mb-5 px-3">Know about the details before make decision</h2>
            <Row>
                <Col className="flex-down col-md-8 px-4 col-12">
                    <h1 className={styles['server-name']}>
                        {Details.server.name}
                        {' '}
                        <span className={styles['id-account']}>
                            /
                            Server
                        </span>
                    </h1>
                    <p className={styles['account-desc']}>{Details.description}</p>
                </Col>
                <Col className="flex-down-centered-right px-4 col-md-4 col-12">
                    <h2 className={styles['price-tag']}>
                        $
                        {Details.price}
                    </h2>
                    <Link href="/payment">
                        <button onClick={() => { storingData(); }} className="button capsule">Pay Now</button>
                    </Link>
                </Col>
            </Row>
            {Details.price > 0 ? (
                <Row className="mt-4 px-4">
                    {agents.length > 0 && (
                        <Col className="col-6 col-md-4 mb-3 pad-right-1-res">
                            <div className="w-95-res center-start card">
                                <h2 className={styles['detail-account-title']}>Agent</h2>
                                {agents.length > 5 ? (
                                    <Row className="full-width">
                                        <Col className="col-md-6 col-12 centered-start">
                                            <div className="text-center">
                                                {agents.map((i, key) => key % 2 === 0 && (<li key={i} className={styles['detail-list']}>{i}</li>))}
                                            </div>
                                        </Col>
                                        <Col className="col-md-6 col-12 centered-start">
                                            <div className="text-center">
                                                {agents.map((i, key) => key % 2 === 1 && (<li key={i} className={styles['detail-list']}>{i}</li>))}

                                            </div>
                                        </Col>
                                    </Row>
                                ) : (
                                    <>
                                        {agents.map((i) => <li key={i} className={styles['detail-list']}>{i}</li>)}
                                    </>
                                )}
                            </div>
                        </Col>
                    )}
                    {skins.length > 0 && (
                        <Col className="col-6 col-md-4 mb-3 pad-left-1-res">
                            <div className="w-95-res center-start card">
                                <h2 className={styles['detail-account-title']}>Skin</h2>
                                {skins.length > 5 ? (
                                    <Row className="full-width">
                                        <Col className="col-md-6 col-12 centered-start">
                                            <div className="text-center">
                                                {skins.map((i, key) => key % 2 === 0 && (<li key={i} className={styles['detail-list']}>{i}</li>))}
                                            </div>
                                        </Col>
                                        <Col className="col-md-6 col-12 centered-start">
                                            <div className="text-center">
                                                {skins.map((i, key) => key % 2 === 1 && (<li key={i} className={styles['detail-list']}>{i}</li>))}

                                            </div>
                                        </Col>
                                    </Row>
                                ) : (
                                    <>
                                        {skins.map((i) => <li key={i} className={styles['detail-list']}>{i}</li>)}
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
                                    <span className={styles['stats-card-subtitle']}>{Details.current_rank.name}</span>
                                </Col>
                                <Col className="col-4">
                                    <Image src={Details.current_rank.badge} width="100%" height="100%" />
                                </Col>
                            </Row>
                            <Row className={styles['stats-card']}>
                                <Col className="flex-down col-8">
                                    <h3 className={styles['stats-card-title']}>Highest Rank</h3>
                                    <span className={styles['stats-card-subtitle']}>{Details.highest_rank.name}</span>
                                </Col>
                                <Col className="col-4">
                                    <Image src={Details.highest_rank.badge} width="100%" height="100%" />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            ) : (
                <SDetailAccount />
            )}
            {screenshots.length > 0 ? (
                <Row className="mt-4 px-4">
                    <Col>
                        <Image src={screenshots[0]} width="350%" height="200%" />
                    </Col>
                </Row>
            ) : null}
        </Container>

    );
}

export default AccountDetails;
