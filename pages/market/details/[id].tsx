/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../../../styles/Market.module.css';

function AccountDetails() {
    const router = useRouter();
    const { id } = router.query;

    const data = {
        champion: ['Amumu', 'Alistar', 'Braum', 'Galio', 'Leona', 'Melphite', 'Rakan', 'Thresh', 'Soraka', 'Seraphine', 'Lux'],
        skins: ['Mow Cow Alistar', 'Burning Area Braum', 'Mecha Melphite'],
        current_rank: 'diamond 2',
        highest_rank: 'diamond 2',
    };

    return (
        <Container className="my-5 py-5 ">
            <Row className="mt-5 centered">
                <h1 className="text-center title">Account Details</h1>
            </Row>
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
                    <h2>$500.00</h2>
                    <div>
                        <button className="button capsule">Pay Now</button>
                    </div>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="card mx-2">
                    <h2 className={styles['detail-account-title']}>Champion</h2>
                    {data.champion.map((i) => <li className={styles['detail-list']}>{i}</li>)}
                </Col>
                <Col className="card mx-2">
                    <h2 className={styles['detail-account-title']}>Skin</h2>
                    {data.skins.map((i) => <li className={styles['detail-list']}>{i}</li>)}
                </Col>
                <Col className="card mx-2">
                    <h2 className={styles['detail-account-title']}>Ranked Stats</h2>
                    <div className={styles['stats-card']}>
                        <h3 className={styles['stats-card-title']}>Current Rank</h3>
                        {data.current_rank}
                    </div>
                    <div className={styles['stats-card']}>
                        <h3 className={styles['stats-card-title']}>Highest Rank</h3>
                        {data.highest_rank}
                    </div>
                </Col>
            </Row>
            <Row>
                <div className="centered mt-5">
                    ini ss an account
                </div>
            </Row>
        </Container>

    );
}

export default AccountDetails;
