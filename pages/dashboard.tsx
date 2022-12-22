/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import {
    SideBar, DetailOrder, DetailMarket, DetailBooster, DetailInvoice, DetailOther,
} from '../component';
import styles from '../styles/User.module.css';

function Dashboard() {
    const [role, setRole] = useState('user');
    const [component, setComponent] = useState('order');

    const [token, setToken] = useState<any | null>(null);
    const [userData, setUserData] = useState<any | null>(null);

    const [showSide, setShowSide] = useState(false);

    function closeSide(showing) {
        setShowSide(showing);
    }

    useEffect(() => {
        const dataStore: any = sessionStorage.getItem('user');

        if (dataStore === '') {
            setUserData(null);
            setToken(null);
        } else if (dataStore !== null) {
            if (userData === null) {
                const User = JSON.parse(dataStore);
                setUserData(User.user);
                setRole(User.roles[0]);
                setToken(User.token);
            } else {
                setUserData(userData);
                setRole(JSON.parse(dataStore).roles[0]);
                setToken(token);
            }
        } else {
            setUserData(null);
            setToken(null);
            setRole('user');
        }
    }, [userData, token]);

    function getComponent(comp: string) {
        setComponent(comp);
    }

    return (
        <>
            {userData?.isLogin ? (
                <Container className="py-5">
                    <div className="mt-5">
                        <SideBar role={role} getComponent={getComponent} show={showSide} close={closeSide} active={component} />
                    </div>
                    <Row>
                        <Col className="centered-down">
                            <Row className="my-3 fullwidth">
                                <div className="flex-row center-start flex-left">
                                    <span className={styles['show-sidebar']} onClick={() => setShowSide(true)}><i className="fa-solid fa-bars" /></span>
                                </div>
                            </Row>
                            <Row className="full-width centered">
                                {component === 'market' && (<DetailMarket role={role} token={token} />)}
                                {component === 'order' && (<DetailOrder role={role} token={token} />)}
                                {component === 'invoice' && (<DetailInvoice role={role} />)}
                                {component === 'other' && (<DetailOther role={role} token={token} />)}
                                {component === 'boost' && (<DetailBooster role={role} token={token} />)}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <div className="error-container ">
                    <Image src="/Jett-Sticker.png" width="300" height="300" />
                    <span className="sec-font">
                        You Dont Have Access
                    </span>
                    <Link href="/">
                        <button className="button capsule mt-3" type="button">Home</button>
                    </Link>
                </div>
            )}
        </>
    );
}

export default Dashboard;
