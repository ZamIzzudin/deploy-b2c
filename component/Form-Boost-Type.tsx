/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './styles/FormBoost.module.css';

export function IncludeRank({
    title, getData, ranks, serviceName, priceList,
}) {
    const [clearRanks, setClearRanks] = useState<any>([]);
    const [selectedRank, setSelectedRank] = useState<any>(ranks[0]);

    const [selectedDivision, setSelectedDivision] = useState<any>(0);

    function sendData(data) {
        getData(data, title);
    }

    function setUpRanks() {
        const splitRanks = ranks.map((rank, index) => {
            const tempArray = rank.name.split(' ');
            return {
                id: ranks[index].id,
                name: tempArray[0],
                badge: ranks[index].badge,
            };
        });

        const newRanks: any = [];

        splitRanks.forEach((rank, index) => {
            if (rank.name !== splitRanks[index - 1]?.name) {
                newRanks.push(rank);
            }
        });
        setClearRanks(newRanks);
        setSelectedRank(newRanks[0]);
        sendData(newRanks[0]);
    }

    async function getRank() {
        const url = `${process.env.API}/ranks/${selectedRank.id + selectedDivision}`;

        let data: any = {};

        await axios.get(url).then((res) => {
            data = res.data.data;
            data.priceList = priceList[(selectedRank.id + selectedDivision) - 1];
            sendData(data);
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        getRank();
    }, [selectedDivision, selectedRank]);

    useEffect(() => {
        setUpRanks();
    }, [serviceName]);

    return (
        <div className={styles.container}>
            <h1 className={styles['title-form']}>{title}</h1>
            <Row className={styles['rank-division-container']}>
                <Col className={`${styles['rank-container']} col-md-6 gap-2 col-12`}>
                    {clearRanks.map((rank) => (
                        <Image className={`${styles['rank-list']} ${selectedRank.name === rank.name ? (styles.active) : ('')} p-1`} key={rank.name} src={rank.badge} width={60} height={60} onClick={() => { setSelectedRank(rank); setSelectedDivision(0); }} />
                    ))}
                </Col>
                <Col className={`${styles['division-container']} col-md-6 col-12`}>
                    <div className={`${styles['division-list']} ${selectedDivision === 0 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(0)}>I</div>
                    <div className={`${styles['division-list']} ${selectedDivision === 1 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(1)}>II</div>
                    <div className={`${styles['division-list']} ${selectedDivision === 2 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(2)}>III</div>
                </Col>
            </Row>
        </div>
    );
}

export function NumberGame({
    max, min, title, getData, serviceName,
}) {
    function sendData(data) {
        const newData = { numberGame: data };
        getData(newData, title);
    }
    const [num, setNum] = useState('5');

    useEffect(() => {
        sendData(num);
        setNum('5');
    }, [serviceName]);

    useEffect(() => {
        sendData(num);
    }, [num]);

    return (
        <Row className={styles.container2}>
            <Col className="m-0 centered pad-0 col">
                <h1 className="big-num">{num}</h1>
            </Col>
            <Col className="flex-down col-10">
                <div>
                    <h1 className={styles['title-form']}>{title}</h1>
                </div>
                <div>
                    <input className="fullwidth range-input mt-3" type="range" min={min} max={max} value={num} onChange={(e) => { setNum(e.target.value); sendData(e.target.value); }} />
                </div>
            </Col>

        </Row>

    );
}

export function Points({
    start, to, title, unit, getData, serviceName,
}) {
    const [max, setMax] = useState(to);
    const [min, setMin] = useState(start);

    function rangeLogic(value, kind) {
        if (kind === 'max') {
            if (value > to) {
                setMax(to);
            } else {
                setMax(value);
            }
        } else if (kind === 'min') {
            if (value < start) {
                setMin(start);
            } else {
                setMin(value);
            }
        }
    }

    function sendData() {
        const newData = { start: min, to: max, unit_type: unit };
        getData(newData, title);
    }

    useEffect(() => {
        sendData();
    }, [max, min]);

    useEffect(() => {
        setMax(to);
        setMin(start);
        sendData();
    }, [unit]);

    useEffect(() => {
        sendData();
    }, []);

    return (
        <Row className={styles.container}>
            <h1 className={styles['title-form']}>{title}</h1>
            <Row className="pt-1 pb-1 centered">
                <Col className="col-md-6 col-12">
                    <Form.Group className="fullwidth py-4 centered-down">
                        <span className="capitalized">
                            Current
                            {' '}
                            {unit}
                        </span>
                        <div className="centered my-2">
                            <button className={styles['point-button']} onClick={() => rangeLogic(parseInt(min, 10) - 1, 'min')}>-</button>
                            <span className="content-text"><b className="sec-font">{min}</b></span>
                            <button className={styles['point-button']} onClick={() => rangeLogic(parseInt(min, 10) + 1, 'min')}>+</button>
                        </div>
                        <input className="w-90 range-input mt-3" type="range" max={parseInt(max, 10) - 1} min={start} value={min} onChange={(e) => setMin(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col className="col-md-6 col-12">
                    <Form.Group className="fullwidth py-4 centered-down">
                        <span className="capitalized">
                            Desire
                            {' '}
                            {unit}
                        </span>
                        <div className="centered my-2">
                            <button type="button" className={styles['point-button']} onClick={() => rangeLogic(parseInt(max, 10) - 1, 'max')}>-</button>
                            <span className="content-text"><b className="sec-font">{max}</b></span>
                            <button className={styles['point-button']} onClick={() => rangeLogic(parseInt(max, 10) + 1, 'max')}>+</button>
                        </div>
                        <input className="w-90 range-input mt-3" type="range" max={to} min={parseInt(min, 10) + 1} value={max} onChange={(e) => setMax(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
        </Row>

    );
}

export function PlatformSelect({
    title, platforms, getData, serviceName,
}) {
    function sendData(data) {
        const newData = { platform: data };
        getData(newData, title);
    }

    useEffect(() => {
        sendData(platforms[0]);
    }, [serviceName]);

    return (
        <Col className="flex-down fullwidth">
            <Form.Label>{title}</Form.Label>
            <Form.Select className="form-layout mb-4" onChange={(e) => sendData(e.target.value)}>
                {platforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
            </Form.Select>
        </Col>
    );
}

export function ServerSelect({
    servers, getData, serviceName,
}) {
    function sendData(data) {
        const newData = { server: data };
        getData(newData, 'Server Require');
    }

    useEffect(() => {
        sendData(servers[0].name);
    }, [serviceName]);

    return (
        <Col className="flex-down fullwidth">
            <Form.Label>Select Your Server</Form.Label>
            <Form.Select className="form-layout mb-4" onChange={(e) => sendData(e.target.value)}>
                {servers.map((server) => <option key={server.name} value={server.name}>{server.name}</option>)}
            </Form.Select>
        </Col>
    );
}
