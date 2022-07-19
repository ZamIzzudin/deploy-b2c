/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../../../styles/Market.module.css';

function AccountDetails(props) {
    const { Details } = props;
    const agents = Details.agent_list.split(' ');
    const skins = Details.skin_list.split(' ');

    const transaction = {
        id_account: Details.id,
        id_user: '123B',
        total_price: Details.price,
        service: 'Market',
        type: 'Valorant Account',
        rank: Details.current_rank,
        picture: '/valorant.png',
    };

    function storingData() {
        localStorage.clear();
        localStorage.setItem('data', JSON.stringify(transaction));
    }

    return (
        <Container className="my-5 py-5 ">
            <h1 className="text-center mt-5 title">Account Details</h1>
            <h2 className="section-subtitle text-center mb-5">Know about the details before make decision</h2>
            <Row>
                <Col className="flex-down col-md-8">
                    <h1 className={styles['server-name']}>
                        {Details.server}
                        {' '}
                        <span className={styles['id-account']}>
                            #
                            {Details.id}
                        </span>
                    </h1>
                    <p className={styles['account-desc']}>{Details.description}</p>
                </Col>
                <Col className="flex-down-centered-right px-4">
                    <h2 className={styles['price-tag']}>
                        $
                        {Details.price}
                    </h2>
                    <Link href="/payment">
                        <button onClick={() => { storingData(); }} className="button capsule">Pay Now</button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="card mx-2 center-start">
                    <h2 className={styles['detail-account-title']}>Agent</h2>
                    {agents.length > 5 ? (
                        <Row className="full-width">
                            <Col className="col-md-6 centered-start">
                                <div className="text-center">
                                    {agents.map((i, key) => key % 2 === 0 && (<li className={styles['detail-list']}>{i}</li>))}
                                </div>
                            </Col>
                            <Col className="col-md-6 centered-start">
                                <div className="text-center">
                                    {agents.map((i, key) => key % 2 === 1 && (<li className={styles['detail-list']}>{i}</li>))}

                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <>
                            {agents.map((i) => <li className={styles['detail-list']}>{i}</li>)}
                        </>
                    )}
                </Col>
                <Col className="card mx-2 center-start">
                    <h2 className={styles['detail-account-title']}>Skin</h2>
                    {skins.length > 5 ? (
                        <Row className="full-width">
                            <Col className="col-md-6 centered-start">
                                <div className="text-center">
                                    {skins.map((i, key) => key % 2 === 0 && (<li className={styles['detail-list']}>{i}</li>))}
                                </div>
                            </Col>
                            <Col className="col-md-6 centered-start">
                                <div className="text-center">
                                    {skins.map((i, key) => key % 2 === 1 && (<li className={styles['detail-list']}>{i}</li>))}

                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <>
                            {skins.map((i) => <li className={styles['detail-list']}>{i}</li>)}
                        </>
                    )}
                </Col>
                <Col className="card mx-2">
                    <h2 className={styles['detail-account-title']}>Ranked Stats</h2>
                    <Row className={styles['stats-card']}>
                        <Col className="flex-down">
                            <h3 className={styles['stats-card-title']}>Current Rank</h3>
                            <span className={styles['stats-card-subtitle']}>{Details.current_rank}</span>
                        </Col>
                        <Col>
                            <Image src="/gold_valo.png" width="100%" height="100%" />
                        </Col>
                    </Row>
                    <Row className={styles['stats-card']}>
                        <Col className="flex-down">
                            <h3 className={styles['stats-card-title']}>Highest Rank</h3>
                            <span className={styles['stats-card-subtitle']}>{Details.highest_rank}</span>
                        </Col>
                        <Col>
                            <Image src="/diamond_valo.webp" width="100%" height="100%" />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

    );
}

export default AccountDetails;

export async function getStaticPaths() {
    const Accounts = await axios.get('http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/accounts').then((res) => res.data.data).catch((res) => console.log(res));

    const paths = Accounts.map((account) => ({
        params: { id: account.href.link.slice(71) },
    }));

    return {
        paths, fallback: false,
    };
}

export async function getStaticProps(context) {
    const { id } = context.params;
    const Details = await axios.get(`http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/accounts/${id}`).then((res) => res.data.data).catch((res) => console.log(res));
    return {
        props: {
            Details,
        },
    };
}
