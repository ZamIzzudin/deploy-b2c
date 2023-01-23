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
import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../hooks';

import DetailOrder from '../component/dashboard/Detail-Order';
import DetailMarket from '../component/dashboard/Detail-Market';
import DetailBooster from '../component/dashboard/Detail-Booster';
import DetailOther from '../component/dashboard/Detail-Other';

import { SideBar } from '../component';
import styles from '../styles/User.module.css';

function Dashboard() {
    const { auth } = useAppSelector((states) => states);

    const [component, setComponent] = useState('order');

    const [showSide, setShowSide] = useState(false);

    function closeSide(showing) {
        setShowSide(showing);
    }

    function getComponent(comp: string) {
        setComponent(comp);
    }

    return (
        <>
            <Head>
                <title>Lunar Boost | Dashboard</title>
            </Head>
            {auth.user.emailVerified ? (
                <Container className="py-5">
                    <div className="mt-5">
                        <SideBar getComponent={getComponent} show={showSide} close={closeSide} active={component} />
                    </div>
                    <Row>
                        <Col className="centered-down">
                            <Row className="my-3 fullwidth">
                                <div className="flex-row center-start flex-left">
                                    <span className={styles['show-sidebar']} onClick={() => setShowSide(true)}><i className="fa-solid fa-bars" /></span>
                                </div>
                            </Row>
                            <Row className="full-width centered">
                                {component === 'market' && (<DetailMarket />)}
                                {component === 'order' && (<DetailOrder />)}
                                {component === 'other' && (<DetailOther />)}
                                {component === 'boost' && (<DetailBooster />)}
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
