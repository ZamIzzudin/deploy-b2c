/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/AccountCard.module.css';

function AccountCard(props: any) {
    const { data } = props;
    return (
        <Col className={`${styles['account-card']} card`}>
            <Row>
                <Row className="centered">
                    <Col>
                        <h3 className={styles['price-text']}>
                            $
                            {data.price}
                        </h3>
                    </Col>
                    <Col className="flex-right">
                        <Image src={data.rank_emb} width="90%" height="100%" />
                    </Col>
                </Row>
                <Row className="centered my-4">
                    <Col className={styles['card-right-side']}>
                        <span className={styles['desc-highlight']}>Current Rank</span>
                        <span className={styles['desc-text']}>Highest Rank</span>
                        <span className={styles['desc-text']}>Server Region</span>
                        <span className={styles['desc-text']}>Agent</span>
                        <span className={styles['desc-text']}>Skins</span>
                    </Col>
                    <Col className={styles['card-left-side']}>
                        <span className={styles['desc-highlight']}>{data.current_rank}</span>
                        <span className={styles['desc-text']}>{data.highest_rank}</span>
                        <span className={styles['desc-text']}>{data.server_region}</span>
                        <span className={styles['desc-text']}>{data.agent.length}</span>
                        <span className={styles['desc-text']}>{data.skins.length}</span>
                    </Col>
                </Row>
                <Row className="centered">
                    <Link scroll href={`market/details/${data.id}`}>
                        <button className="button capsule mt-4 mb-3">See Details</button>
                    </Link>
                </Row>

            </Row>
        </Col>
    );
}

export default AccountCard;
