/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useAppSelector, useAppDispatch } from '../hooks';

import Checkout from '../component/boost/Checkout';
import FormBoost from '../component/boost/Form-Boost';
import { GameCard } from '../component';

import { SForm, SGameList, SServiceList } from '../component/Skeleton-Loading';

import { asyncGetServicesPerGame } from '../state/services/action';
import { asyncGetAllRanksByGame } from '../state/ranks/action';
import { asyncGetAllServersByGame } from '../state/servers/action';
import { setupBoostiDetail } from '../state/boostDetail/action';
import { setupAddOnsDetail } from '../state/addonsDetail/action';

import styles from '../styles/Boost.module.css';

function Order() {
    const {
        games, services,
    } = useAppSelector((states) => states);
    const dispatch = useAppDispatch();

    const [gameOrder, setGameOrder] = useState<any>({ name: 'Valorant' });
    const [requireOrder, setRequireOrder] = useState<any>(services[0]?.require['order-options']);
    const [addonsOrder, setAddonsOrder] = useState<any>(services[0]?.require['add-ons']);
    const [titleOrder, setTitleOrder] = useState<any>(services[0]?.name);

    // Get Data Service From API With Selected Game
    async function getServices(game) {
        dispatch(asyncGetServicesPerGame(game.name));
        dispatch(asyncGetAllServersByGame(game.name));
        dispatch(asyncGetAllRanksByGame(game.name));
        setGameOrder(game);
    }

    // Setup Order Require to Setup Form
    function setupOrderRequire(service) {
        setRequireOrder(service.require['order-options']);
        setAddonsOrder(service.require['add-ons']);
        setTitleOrder(service.name);
    }

    useEffect(() => {
        dispatch(asyncGetAllRanksByGame(gameOrder.name));
        dispatch(setupAddOnsDetail());
        getServices({ name: 'Valorant' });
    }, []);

    useEffect(() => {
        setRequireOrder(services[0]?.require['order-options']);
        setAddonsOrder(services[0]?.require['add-ons']);
        setTitleOrder(services[0]?.name);
        dispatch(setupAddOnsDetail());
    }, [services]);

    useEffect(() => {
        dispatch(setupBoostiDetail(requireOrder));
        dispatch(setupAddOnsDetail());
    }, [requireOrder]);

    return (
        <Container className="my-5 py-5 centered-down">
            <Head>
                <title>Lunar Boost | Boost</title>
            </Head>
            <h1 className="section-title mt-5 text-center">Boost</h1>
            <span className="section-subtitle">What we can help you</span>
            <span className="section-subtitle"></span>
            {services.length > 0 ? (
                <>
                    {/* Game Filter */}
                    <Row className={`${styles['game-overview']} mt-5 mb-3 fullwidth`}>
                        {games.map((game) => (
                            <GameCard active={gameOrder} data={game} key={game.id} getData={getServices} mini />
                        ))}
                    </Row>
                    {/* Service Filter */}
                    <Row className={`${styles['service-slider']} centered mb-3`}>
                        <div className={styles['service-slider-container']}>
                            {services.map((service: any) => (
                                <button key={service.name} className={`${styles['service-card']} ${titleOrder === service.name ? styles.actived : null} card-hovering mx-2`} onClick={() => setupOrderRequire(service)}>
                                    {service.name}
                                </button>
                            ))}
                        </div>
                    </Row>
                    {/* Form */}
                    <Row className="mt-3 px-3 fullwidth centered">
                        <Col className="col-md-8 col-12">
                            <div className="fullwidth">
                                <FormBoost form={requireOrder} titleService={titleOrder} />
                            </div>
                        </Col>
                        <Col className="col-md-4 col-12 flex-horizon-centered-start">
                            <div className="fullwidth">
                                <Checkout form={requireOrder} game={gameOrder} orderType={titleOrder} addOns={addonsOrder} />
                            </div>
                        </Col>
                    </Row>
                </>
            ) : (
                <>
                    <SGameList />
                    <SServiceList />
                    <SForm />
                </>
            )}
        </Container>
    );
}

export default Order;
