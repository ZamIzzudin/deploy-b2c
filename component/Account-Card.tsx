/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/AccountCard.module.css';

function AccountCard(props: any) {
    const { data, manage } = props;

    return (
        <Col className={`${styles['account-card']} card`}>
            <div>
                <Row className="centered">
                    <Col>
                        <h3 className={styles['price-text']}>
                            $
                            {data.price}
                        </h3>
                    </Col>
                    <Col className="flex-right">
                        <Image src="/gold_valo.png" width="90%" height="100%" />
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
                        <span className={styles['desc-text']}>{data.server}</span>
                        <span className={styles['desc-text']}>{data.agents_count}</span>
                        <span className={styles['desc-text']}>{data.skins_count}</span>
                    </Col>
                </Row>
                <Row className="centered">
                    {manage === true ? (
                        <div className="centered">
                            <button onClick={() => { props.setModal('delete'); props.getCurrent(data); }} className="button-org-border capsule mt-4 mb-3">Delete</button>
                            <button onClick={() => { props.setModal('edit'); props.getCurrent(data); }} className="button capsule mt-4 mb-3">Edit</button>
                        </div>
                    ) : (
                        <Link scroll href={`market/details/${data.href.link.slice(71)}`}>
                            <button className="button capsule mt-4 mb-3">See Details</button>
                        </Link>
                    )}
                </Row>
            </div>
        </Col>
    );
}

export default AccountCard;
