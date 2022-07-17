/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import { Row, Col } from 'react-bootstrap';
import styles from './styles/SideBar.module.css';

function SideBar(props: any) {
    const { role, getComponent } = props;

    function setComponent(comp: any) {
        props.getComponent(comp);
    }

    return (
        <Row className={`${styles['side-bar-container']} mt-3`}>
            {role === 'user' && (
                <Col className={`${styles['list-toogle']}  gap-3`}>
                    <button className={styles['list-item']} onClick={() => setComponent('profile')}>
                        <i className="fa-solid fa-user" />
                        <span className="mx-3">Profile</span>
                    </button>
                    <button className={styles['list-item']} onClick={() => setComponent('order')}>
                        <i className="fa-solid fa-cart-shopping" />
                        <span className="mx-3">Order</span>
                    </button>
                    <button className={styles['list-item']} onClick={() => setComponent('invoice')}>
                        <i className="fa-solid fa-file-invoice-dollar" />
                        <span className="mx-3">Invoice</span>
                    </button>
                </Col>
            )}
            {
                role === 'booster' && (
                    <Col className={`${styles['list-toogle']}  gap-3`}>
                        <button className={styles['list-item']} onClick={() => setComponent('order')}>
                            <i className="fa-solid fa-cart-shopping" />
                            <span className="mx-3">Order</span>
                        </button>
                        <button className={styles['list-item']} onClick={() => setComponent('boost')}>
                            <i className="fa-solid fa-bolt" />
                            <span className="mx-3">Boost</span>
                        </button>
                    </Col>
                )
            }
            {
                role === 'admin' && (
                    <Col className={`${styles['list-toogle']}  gap-3`}>
                        <button className={styles['list-item']} onClick={() => setComponent('order')}>
                            <i className="fa-solid fa-cart-shopping" />
                            <span className="mx-3">Order</span>
                        </button>
                        <button className={styles['list-item']} onClick={() => setComponent('boost')}>
                            <i className="fa-solid fa-bolt" />
                            <span className="mx-3">Boost</span>
                        </button>
                        <button className={styles['list-item']} onClick={() => setComponent('market')}>
                            <i className="fa-solid fa-square-poll-horizontal" />
                            <span className="mx-3">Market</span>
                        </button>
                        <button className={styles['list-item']} onClick={() => setComponent('other')}>
                            <i className="fa-solid fa-chart-simple" />
                            <span className="mx-3">Other</span>
                        </button>
                    </Col>
                )
            }
        </Row>
    );
}

export default SideBar;
