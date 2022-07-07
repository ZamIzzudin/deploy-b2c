/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/style-prop-object */
/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
import { Row, Col, Container } from 'react-bootstrap';
import styles from './styles/Jumbotron.module.css';

function Jumbotron() {
    return (
        <div className={styles.jumbotron}>
            <Row className={styles['jumbotron-overview']}>
                <Container className={`${styles['jumbotron-desc']} col`}>
                    <h1 className="title">Your Rank Booster</h1>
                    <h2 className="desc mt-3 mb-5">Reach your dream rank effortlessly with our safe boosting services or instanly buy an account on our market.</h2>
                    <div>
                        <button type="button" className="button capsule">Boost Now</button>
                        <button type="button" className="button capsule mx-3">Market</button>
                    </div>
                </Container>
                <Col className={styles.hidden} />
            </Row>
        </div>

    );
}

export default Jumbotron;
