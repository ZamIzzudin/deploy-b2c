/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import styles from './styles/FormBoost.module.css';

export function IncludeRank({ title, game }) {
    return (
        <div className={styles.container}>
            <div>
                <h1>{title}</h1>
                <span>{game}</span>
            </div>
            <div className={styles['rank-division-container']}>
                <div className={styles['rank-container']}>
                    <span className={styles['rank-list']}>Iron</span>
                    <span className={styles['rank-list']}>Bronze</span>
                    <span className={styles['rank-list']}>Silver</span>
                    <span className={styles['rank-list']}>Gold</span>
                    <span className={styles['rank-list']}>Platinum</span>
                    <span className={styles['rank-list']}>Diamond</span>
                    <span className={styles['rank-list']}>Immortal</span>
                    <span className={styles['rank-list']}>Radiant</span>
                </div>
                <div className={styles['division-container']}>
                    <span className={styles['division-list']}>I</span>
                    <span className={styles['division-list']}>II</span>
                    <span className={styles['division-list']}>III</span>
                    <span className={styles['division-list']}>IV</span>
                </div>
            </div>
        </div>
    );
}

export function NumberGame({ max, min, title }) {
    const [num, setNum] = useState('5');

    return (
        <div className={styles.container}>
            <div>
                <span className={styles['number-order']}>{num}</span>
                <h1 className="d-i-block">{title}</h1>
            </div>
            <div>
                <Form.Group>
                    <Form.Range min={min} max={max} className="my-2" value={num} onChange={(e) => setNum(e.target.value)} />
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

export function TypeC() {
    return (
        <h1>Form 3</h1>
    );
}
