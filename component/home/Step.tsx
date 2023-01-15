/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Step.module.css';

function Step() {
    const [step, setStep] = useState(1);

    return (
        <div>
            <Row>
                <Col className="px-3 col-md-4 col-12">
                    <button type="button" className={`${styles['card-step']} card`} onClick={() => setStep(1)}>
                        <div className={styles['icon-side']}>
                            <i className="fa-solid fa-clipboard-check fa-2x org-icon" />
                        </div>
                        <div className={styles['desc-side']}>
                            <h3 className={styles['step-name']}>1 - Select Service</h3>
                            <h4 className={styles['step-desc']}>Select and customize your desired service.</h4>
                        </div>
                    </button>
                </Col>
                <Col className="px-3 col-md-4 col-12">
                    <button type="button" className={`${styles['card-step']} card`} onClick={() => setStep(2)}>
                        <div className={styles['icon-side']}>
                            <i className="fa-solid fa-money-bill-wave fa-2x org-icon" />
                        </div>
                        <div className={styles['desc-side']}>
                            <h3 className={styles['step-name']}>2 - Complete Payment</h3>
                            <h4 className={styles['step-desc']}>Choose your preferred payment method.</h4>
                        </div>
                    </button>
                </Col>
                <Col className="px-3 col-md-4 col-12">
                    <button type="button" className={`${styles['card-step']} card`} onClick={() => setStep(3)}>
                        <div className={styles['icon-side']}>
                            <i className="fa-solid fa-ranking-star fa-2x org-icon" />
                        </div>
                        <div className={styles['desc-side']}>
                            <h3 className={styles['step-name']}>3 - Rank Up</h3>
                            <h4 className={styles['step-desc']}>Follow your order and live chat with your booster.</h4>
                        </div>
                    </button>
                </Col>
            </Row>
            {step === 1 && (
                <Row>
                    <Col className={styles.dekstop}>
                        <Image src="/step1.png" width="500%" height="500%" />
                    </Col>
                    <Col className="flex-down px-5 py-4">
                        <h3 className={styles['step-title']}>Select Your Favored Service</h3>
                        <p className={styles['step-desc']}>First, select your game and method of ranking up. There are various ways to reach your desired goal. Choose the one which fits most to your needs.You can always talk to us on live chat if you need help.</p>
                        <ul className={styles.list}>
                            <li>Free additional customizations.</li>
                            <li>Intuitive and straightforward purchase process.</li>
                        </ul>
                        <div>
                            <button type="button" className="button capsule mt-3"><Link href="/boost">Get Started</Link></button>
                        </div>
                    </Col>
                </Row>
            )}
            {step === 2 && (
                <Row>
                    <Col className={styles.dekstop}>
                        <Image src="/step2.png" width="500%" height="500%" />
                    </Col>
                    <Col className="flex-down px-5 py-4">
                        <h3 className={styles['step-title']}>Buy with ease</h3>
                        <p className={styles['step-desc']}>We have the leading payment solution brands at your service to provide you with the most diversified gateway portfolio to fit your needs.We process payments instantly — we can start on your order as soon you finish checkout.</p>
                        <ul className={styles.list}>
                            <li>Payments accepted globally.</li>
                            <li>Safe and encrypted transactions.</li>
                            <li>Crypto payments are available.</li>
                        </ul>
                        <div>
                            <button type="button" className="button capsule mt-3"><Link href="/boost">Get Started</Link></button>
                        </div>
                    </Col>
                </Row>
            )}
            {step === 3 && (
                <Row>
                    <Col className={styles.dekstop}>
                        <Image src="/step3.png" width="500%" height="500%" />
                    </Col>
                    <Col className="flex-down px-5 py-4">
                        <h3 className={styles['step-title']}>Follow Your Rank Increase</h3>
                        <p className={styles['step-desc']}>You are all set! Lay back and watch your order being fulfilled. Chat directly with your booster and track your order\'s progress.</p>
                        <ul className={styles.list}>
                            <li>Live tracking.</li>
                            <li>Direct chat with your booster.</li>
                            <li>24/7 Premium live Help.</li>
                        </ul>
                        <div>
                            <button type="button" className="button capsule mt-3"><Link href="/boost">Get Started</Link></button>
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default Step;
