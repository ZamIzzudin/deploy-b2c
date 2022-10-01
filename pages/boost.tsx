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
import axios from 'axios';
import Image from 'next/image';
import {
    GameCard, FormBoost, Checkout,
} from '../component';
import styles from '../styles/Boost.module.css';

function Order() {
    const [games, setGames] = useState([
        {
            name: null,
            logo_url: '/valo.png',
            id: null,
        },
    ]);
    const [services, setServices] = useState<any>([]);
    const [servers, setServers] = useState<any>([]);
    const [ranks, setRanks] = useState<any>([]);

    const [gameOrder, setGameOrder] = useState<any>('');
    const [requireOrder, setRequireOrder] = useState<any>([]);
    const [addonsOrder, setAddonsOrder] = useState<any>([]);
    const [titleOrder, setTitleOrder] = useState<any>('');

    const [checkoutDetail, setCheckoutDetail] = useState<any>([]);

    const [flow, setFlow] = useState(0);

    async function getServices(game) {
        const slugGame = game.name.replace(
            /[^a-zA-Z0-9,\-.?! ]/g,
            '-',
        ).replace(/\s/g, '-').toLowerCase();

        const url = `http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/boosting/${slugGame}`;

        await axios.get(url).then((res) => {
            setServices(res.data.boost_options);
            setRanks(res.data.ranks);
            setServers(res.data.servers);
            setRequireOrder(res.data.boost_options[0].require['order-options']);
            setAddonsOrder(res.data.boost_options[0].require['add-ons']);
            setTitleOrder(res.data.boost_options[0].name);
            setGameOrder(game);
        }).catch((err) => console.log(err));
    }

    async function getGames() {
        const url = 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/games';

        await axios.get(url).then((res) => setGames(res.data.data)).catch((res) => console.log(res));
    }

    function getData(data) {
        const tempDetails = checkoutDetail;
        checkoutDetail?.forEach((item, index) => {
            if (item.title === data.title) {
                tempDetails[index] = data;
                setCheckoutDetail(tempDetails);
                setFlow(flow + 1);
            }
        });
    }

    function setupOrderRequire(service) {
        setRequireOrder(service.require['order-options']);
        setAddonsOrder(service.require['add-ons']);
        setTitleOrder(service.name);
    }

    function setupCheckoutDetail() {
        const detailsForm = requireOrder;
        const type = detailsForm?.map((item) => {
            const typeForm = { title: item.title };

            return typeForm;
        });
        setCheckoutDetail(type);
    }

    useEffect(() => {
        setupCheckoutDetail();
    }, [requireOrder]);

    useEffect(() => {
        getGames();
        getServices({
            id: 2,
            name: 'Valorant',
            logo_url: 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/storage/images/game-logo/valo.png',
        });
        localStorage.setItem('data', '');
    }, []);

    return (
        <Container className="my-5 py-5 centered-down">
            <h1 className="section-title mt-5 text-center">Boost</h1>
            <span className="section-subtitle">What we can help you</span>
            <span className="section-subtitle"></span>
            {/* Game Filter */}
            <Row className={`${styles['game-overview']} mt-5 mb-3 fullwidth`}>
                {games.map((game) => (
                    <GameCard data={game} key={game.id} getData={getServices} mini />
                ))}
            </Row>
            {/* Service Filter */}
            <Row className={`${styles['service-slider']} centered mb-3`}>
                <div className={styles['service-slider-container']}>
                    {services.map((service: any) => (
                        <button key={service.name} className="card fit-content card-hovering mx-2" onClick={() => setupOrderRequire(service)}>
                            <span className={styles['service-name']}>{service.name}</span>
                        </button>
                    ))}
                </div>
            </Row>
            {/* Form */}
            <Row className="mt-3 gap-3 px-3 fullwidth">
                <Col className="col-md-7 col-12 mx-3">
                    <FormBoost form={requireOrder} ranks={ranks} servers={servers} getData={getData} />
                </Col>

                <Col className="col-md-4 col-12 mr-3 flex-horizon-centered-start">
                    <Checkout form={requireOrder} game={gameOrder} details={checkoutDetail} flow={flow} orderType={titleOrder} addOns={addonsOrder} />
                </Col>
            </Row>

        </Container>
    );
}

export default Order;
