/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles/AccountCard.module.css';
import { useAppDispatch } from '../hooks';

import { getDetailAccount } from '../state/accountDetail/action';

function AccountCard(props: any) {
    const { data, manage } = props;
    const dispatch = useAppDispatch();

    const dataAccount = {
        ...data,
        agent_list: data.agent_list.split(' '),
        skin_list: data.skin_list.split(' '),
    };

    function seeDetails() {
        dispatch(getDetailAccount(dataAccount));
    }

    return (
        <Col className={`${styles['account-card']} card`}>
            <div>
                <Row className="centered">
                    <Col className={`${styles['top-card-account']} flex-down col-md-7`}>
                        <h3 className={styles['price-text']}>
                            $
                            {dataAccount.price}
                        </h3>
                        <div>
                            <span>
                                {dataAccount.current_rank.name}
                            </span>
                            <span className={styles['server-text']}>
                                {' / '}
                                {dataAccount.server.name}
                            </span>
                        </div>

                    </Col>
                    <Col className="flex-right">
                        <Image src={dataAccount.current_rank.badge} width="100%" height="100%" />
                    </Col>
                </Row>
                <Row className="centered mt-4 mb-2">
                    <Col className={styles['card-right-side']}>
                        <span className={styles['desc-text']}>Highest Rank</span>
                        <span className={styles['desc-text']}>Skins</span>
                        <span className={styles['desc-text']}>Agent</span>
                    </Col>
                    <Col className={styles['card-left-side']}>
                        <span className={styles['desc-text']}>{dataAccount.highest_rank.name}</span>
                        <span className={styles['desc-text']}>{dataAccount.skin_list.length}</span>
                        <span className={styles['desc-text']}>{dataAccount.agent_list.length}</span>
                    </Col>
                </Row>
                <Row className="centered">
                    {manage === true ? (
                        <div className="centered gap-3">
                            <button onClick={() => { props.setModal('delete'); props.getCurrent(dataAccount); }} className="button-org-border capsule mt-4 mb-3">Delete</button>
                            <button onClick={() => { props.setModal('edit'); props.getCurrent(dataAccount); }} className="button capsule mt-4 mb-3">Edit</button>
                        </div>
                    ) : (
                        <div className="centered">
                            <Link href="/market/details" className="centered">
                                <button onClick={() => seeDetails()} className="button capsule mt-4 mb-3 w-90">See Details</button>
                            </Link>
                        </div>
                    )}
                </Row>
            </div>
        </Col>
    );
}

export default AccountCard;
