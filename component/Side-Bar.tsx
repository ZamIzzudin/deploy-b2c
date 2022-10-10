/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import styles from './styles/SideBar.module.css';

function SideBar(props: any) {
    const { role, show, active } = props;

    function setComponent(comp: any) {
        props.getComponent(comp);
        props.close(false);
    }

    return (
        <>
            <div className={`${styles['side-bar-container']} ${show ? (styles.show) : ('')} mt-3`}>
                <span className={`${styles['close-toogle']} mobile`}><i className="fa-solid fa-xmark" onClick={() => props.close(false)} /></span>
                {role === 'user' && (
                    <div className={`${styles['list-toogle']}`}>
                        <button className={`${styles['list-item']} ${active === 'order' ? (styles.active) : ('')}`} onClick={() => setComponent('order')}>
                            <i className="fa-solid fa-cart-shopping" />
                            <span className={styles.mobile}>Order</span>
                        </button>
                        <button className={`${styles['list-item']} ${active === 'invoice' ? (styles.active) : ('')}`} onClick={() => setComponent('invoice')}>
                            <i className="fa-solid fa-file-invoice-dollar" />
                            <span className={styles.mobile}>Invoice</span>
                        </button>
                    </div>
                )}
                {
                    role === 'booster' && (
                        <div className={`${styles['list-toogle']}  gap-3`}>
                            <button className={`${styles['list-item']} ${active === 'order' ? (styles.active) : ('')}`} onClick={() => setComponent('order')}>
                                <i className="fa-solid fa-cart-shopping" />
                                <span className={styles.mobile}>Order</span>
                            </button>
                            <button className={`${styles['list-item']} ${active === 'boost' ? (styles.active) : ('')}`} onClick={() => setComponent('boost')}>
                                <i className="fa-solid fa-bolt" />
                                <span className={styles.mobile}>Boost</span>
                            </button>
                        </div>
                    )
                }
                {
                    role === 'admin' && (
                        <div className={`${styles['list-toogle']}  gap-3`}>
                            <button className={`${styles['list-item']} ${active === 'order' ? (styles.active) : ('')}`} onClick={() => setComponent('order')}>
                                <i className="fa-solid fa-cart-shopping" />
                                <span className={styles.mobile}>Order</span>
                            </button>
                            <button className={`${styles['list-item']} ${active === 'boost' ? (styles.active) : ('')}`} onClick={() => setComponent('boost')}>
                                <i className="fa-solid fa-bolt" />
                                <span className={styles.mobile}>Boost</span>
                            </button>
                            <button className={`${styles['list-item']} ${active === 'market' ? (styles.active) : ('')}`} onClick={() => setComponent('market')}>
                                <i className="fa-solid fa-square-poll-horizontal" />
                                <span className={styles.mobile}>Market</span>
                            </button>
                            <button className={`${styles['list-item']} ${active === 'other' ? (styles.active) : ('')}`} onClick={() => setComponent('other')}>
                                <i className="fa-solid fa-chart-simple" />
                                <span className={styles.mobile}>Other</span>
                            </button>
                        </div>
                    )
                }
            </div>
            <div onClick={() => props.close(false)} className={`${show ? (styles.outer) : ('')} mobile`} />
        </>

    );
}

export default SideBar;
