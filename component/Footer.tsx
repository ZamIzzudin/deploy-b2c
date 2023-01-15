import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import styles from './styles/Footer.module.css';

function Footer() {
    return (
        <footer className={styles.Footer}>
            <Container>
                <Row>
                    <Col className={`${styles.col} col-md-6 col-12`}>
                        <div className={styles['brand-overview']}>
                            <Image src="/logo.png" width="160" height="55" />
                        </div>
                    </Col>
                    <Col className="col-md-3 col-6">
                        <div className={styles['footer-part']}>
                            <h1 className={styles['list-title']}>Legal</h1>
                            <ul className={styles['footer-list']}>
                                <li>Terms of Use</li>
                                <li>Privacy Policy</li>
                                <li>DMCA Notice</li>
                            </ul>
                        </div>
                    </Col>
                    <Col className="col-md-3 col-6">
                        <div className={styles['footer-part']}>
                            <h1 className={styles['list-title']}>Supported Games</h1>
                            <ul className={styles['footer-list']}>
                                <li>Apex</li>
                                <li>Valorant</li>
                                <li>New World</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className={styles['footer-copyright']}>
                        <h3>
                            Lunar Boost 2022 &copy;
                            <span> All Rights Reserved</span>
                        </h3>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
