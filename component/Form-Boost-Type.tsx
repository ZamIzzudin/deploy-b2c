/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/FormBoost.module.css';

export function IncludeRank({ title, game, getData }) {
    const [ranks, setRanks] = useState([{ name: '', id: '' }]);

    function sendData(data, type) {
        const str = type.replace(/\s/g, '');
        getData(data, str);
    }

    async function getRank() {
        const url = 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/ranks';

        await axios.get(url).then((res) => setRanks(res.data.ranks.data)).catch((err) => console.log(err));
    }

    useEffect(() => {
        getRank();
    }, []);

    return (
        <div className={styles.container}>
            <div>
                <h1>{title}</h1>
                <span>{game}</span>
            </div>
            <div className={styles['rank-division-container']}>
                <div className={styles['rank-container']}>
                    {ranks.map((rank) => (
                        <span className={styles['rank-list']} onClick={() => sendData(rank.id, title)}>{rank.name}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function NumberGame({
    max, min, title, getData,
}) {
    function sendData(data, type) {
        const str = type.replace(/\s/g, '');
        getData(data, str);
    }
    const [num, setNum] = useState('5');

    useEffect(() => {
        sendData('5', title);
    }, []);

    return (
        <div className={styles.container}>
            <div>
                <span className={styles['number-order']}>{num}</span>
                <h1 className="d-i-block">{title}</h1>
            </div>
            <div>
                <Form.Group>
                    <Form.Range min={min} max={max} className="my-2" value={num} onChange={(e) => { setNum(e.target.value); sendData(e.target.value, title); }} />
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
    start, to, title, unit, type, getData,
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

    function sendData(data, types) {
        const str = types.replace(/\s/g, '');
        getData(data, str);
    }
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
            <div className="mt-4 mb-2">
                {platforms.map((platform) => <span onClick={() => sendData(platform, title)} className={styles['platform-button']}>{platform}</span>)}
            </div>
        </div>
    );
}
