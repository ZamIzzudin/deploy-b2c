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
    title, game, getData, ranks,
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
        const url = `http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/ranks/${selectedRank.id + selectedDivision}`;

        await axios.get(url).then((res) => sendData(res.data.data)).catch((err) => console.log(err));
    }

    useEffect(() => {
        getRank();
    }, [selectedDivision, selectedRank]);

    useEffect(() => {
        setUpRanks();
    }, []);

    return (
        <div className={styles.container}>
            <div>
                <h1 className={styles['title-form']}>{title}</h1>
                <span>{game}</span>
            </div>
            <Row className={styles['rank-division-container']}>
                <Col className={`${styles['rank-container']} col-md-6 gap-2`}>
                    {clearRanks.map((rank) => (
                        <Image className={`${styles['rank-list']} ${selectedRank.name === rank.name ? (styles.active) : ('')} p-1`} key={rank.name} src={rank.badge} width={60} height={60} onClick={() => { setSelectedRank(rank); setSelectedDivision(0); }} />
                    ))}
                </Col>
                <Col className={`${styles['division-container']} col-md-6`}>
                    <div className={`${styles['division-list']} ${selectedDivision === 0 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(0)}>I</div>
                    <div className={`${styles['division-list']} ${selectedDivision === 1 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(1)}>II</div>
                    <div className={`${styles['division-list']} ${selectedDivision === 2 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(2)}>III</div>
                </Col>
            </Row>
        </div>
    );
}

export function NumberGame({
    max, min, title, getData,
}) {
    function sendData(data) {
        const newData = { numberGame: data };
        getData(newData, title);
    }
    const [num, setNum] = useState('5');

    useEffect(() => {
        sendData(num);
    }, [num]);

    return (
        <div className={styles.container}>
            <div>
                <span className={styles['number-order']}>{num}</span>
                <h1 className="d-i-block">{title}</h1>
            </div>
            <div>
                <Form.Group>
                    <Form.Range min={min} max={max} className="my-2" value={num} onChange={(e) => { setNum(e.target.value); sendData(e.target.value); }} />
                    <Form.Select className="form-layout mt-3">
                        <option>US</option>
                        <option>North America</option>
                        <option>Asia Pacific</option>
                        <option>China</option>
                    </Form.Select>
                </Form.Group>
            </div>
        </div>

    );
}

export function Points({
    start, to, title, unit, getData,
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
        const newData = { start: min, to: max, unit };
        getData(newData, title);
    }

    useEffect(() => {
        sendData();
    }, [max, min]);

    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            <div className={`${styles['point-range-container']} my-3`}>
                <Form.Group className="w-50 px-3 centered-down">
                    <span>
                        Current
                        {' '}
                        {unit}
                    </span>
                    <div className="centered my-2">
                        <button className={styles['point-button']} onClick={() => rangeLogic(parseInt(min, 10) - 1, 'min')}>-</button>
                        <h3>{min}</h3>
                        <button className={styles['point-button']} onClick={() => rangeLogic(parseInt(min, 10) + 1, 'min')}>+</button>
                    </div>
                    <Form.Range max={parseInt(max, 10) - 1} min={start} value={min} onChange={(e) => setMin(e.target.value)} />
                </Form.Group>
                <Form.Group className="w-50 px-3 centered-down">
                    <span>
                        Desire
                        {' '}
                        {unit}
                    </span>
                    <div className="centered my-2">
                        <button type="button" className={styles['point-button']} onClick={() => rangeLogic(parseInt(max, 10) - 1, 'max')}>-</button>
                        <h3>{max}</h3>
                        <button className={styles['point-button']} onClick={() => rangeLogic(parseInt(max, 10) + 1, 'max')}>+</button>
                    </div>
                    <Form.Range max={to} min={parseInt(min, 10) + 1} value={max} onChange={(e) => setMax(e.target.value)} />
                </Form.Group>
            </div>
        </div>

    );
}

export function PlatformSelect({
    game, title, platforms, getData,
}) {
    function sendData(data, type) {
        const str = type.replace(/\s/g, '');
        getData(data, str);
    }
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            <h5>{game}</h5>
            {/* <div className="mt-4 mb-2">
                {platforms.map((platform) => <span onClick={() => sendData(platform, title)} className={styles['platform-button']}>{platform}</span>)}
            </div> */}
        </div>
    );
}
