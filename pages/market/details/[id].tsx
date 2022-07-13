/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../../../styles/Market.module.css';

function AccountDetails() {
    const router = useRouter();
    const { id } = router.query;

    const data = {
        agents: ['Sage', 'Brimstone', 'Viper', 'Raze', 'Omen', 'Neon', 'Chamber', 'Killjoy', 'Jett', 'Reyna'],
        skins: ['Elderflame [Operator]', 'Elderflame [Vandal]', 'Ruination [Knife]', 'Singularity [Spectre]'],
        current_rank: 'Gold 3',
        highest_rank: 'Diamond 3',
        price: '500.00',
    };

    const transaction = {
        id_account: id,
        id_user: '123B',
        total_price: data.price,
        service: 'Market',
        type: 'Valorant Account',
        rank: data.current_rank,
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
                        North America
                        {' '}
                        <span className={styles['id-account']}>
                            #
                            {id}
                        </span>
                    </h1>
                    <p className={styles['account-desc']}>Master Queue (Master-GM mmr)125 emotes (2 challenger emote, 1 GM, 3 master) all champs (no yummi) ,legacy icons and skins, NEVER BANNED, huge loot hextech, a lot of mastery, tokens and also a lot of skins in Valorant ,high mmr account with 2018 Master icon, 2019 Challenger Icon, lvl 367. Right now D2, but if you check another day maybe it's in Master 2015 Acc ( hit chall 4 years) I have all the info. Verified seller:)</p>
                </Col>
                <Col className="flex-down-centered-right px-4">
                    <h2 className={styles['price-tag']}>
                        $
                        {data.price}
                    </h2>
                    <Link href="/payment">
                        <button onClick={() => { storingData(); }} className="button capsule">Pay Now</button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="card mx-2 center-start">
                    <h2 className={styles['detail-account-title']}>Agent</h2>
                    {data.agents.length > 5 ? (
                        <Row className="full-width">
                            <Col className="col-md-6 centered-start">
                                <div className="text-center">
                                    {data.agents.map((i, key) => key % 2 === 0 && (<li className={styles['detail-list']}>{i}</li>))}
                                </div>
                            </Col>
                            <Col className="col-md-6 centered-start">
                                <div className="text-center">
                                    {data.agents.map((i, key) => key % 2 === 1 && (<li className={styles['detail-list']}>{i}</li>))}

                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <>
                            {data.agents.map((i) => <li className={styles['detail-list']}>{i}</li>)}
                        </>
                    )}
                </Col>
                <Col className="card mx-2 center-start">
                    <h2 className={styles['detail-account-title']}>Skin</h2>
                    {data.skins.map((i) => <li className={styles['detail-list']}>{i}</li>)}
                </Col>
                <Col className="card mx-2">
                    <h2 className={styles['detail-account-title']}>Ranked Stats</h2>
                    <Row className={styles['stats-card']}>
                        <Col className="flex-down">
                            <h3 className={styles['stats-card-title']}>Current Rank</h3>
                            <span className={styles['stats-card-subtitle']}>{data.current_rank}</span>
                        </Col>
                        <Col>
                            <Image src="/gold_valo.png" width="100%" height="100%" />
                        </Col>
                    </Row>
                    <Row className={styles['stats-card']}>
                        <Col className="flex-down">
                            <h3 className={styles['stats-card-title']}>Highest Rank</h3>
                            <span className={styles['stats-card-subtitle']}>{data.highest_rank}</span>
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
