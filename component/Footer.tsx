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
                            <Image src="/logo.png" width="200" height="70" />
                        </div>
                        <div className={`${styles['brand-logo']} mt-1`}>
                            <i className="fa-brands fa-twitter fa-1x mx-3" />
                            <i className="fa-brands fa-facebook fa-1x mx-3" />
                            <i className="fa-brands fa-instagram fa-1x mx-3" />
                        </div>
                    </Col>
                    <Col className="col-md-3 col-8">
                        <div className={styles['footer-part']}>
                            <h1>Supported Games</h1>
                            <Row>
                                <Col>
                                    <ul className={styles['footer-list']}>
                                        <li>Apex</li>
                                        <li>Valorant</li>
                                        <li>CS:GO</li>
                                        <li>New World</li>
                                    </ul>
                                </Col>
                                <Col>
                                    <ul className={styles['footer-list']}>
                                        <li>Black Desert</li>
                                        <li>Dota</li>
                                        <li>Genshin Impact</li>
                                        <li>COD Cold War</li>
                                    </ul>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col className="col-md-1 col-0" />
                    <Col className="col-md-2 col-4">
                        <div className={styles['footer-part']}>
                            <h1>Legal</h1>
                            <ul className={styles['footer-list']}>
                                <li>Terms of Use</li>
                                <li>Privacy Policy</li>
                                <li>DMCA Notice</li>
                                <li>Partnership</li>
                            </ul>
                        </div>

                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className={styles['footer-copyright']}>
                        <h3>
                            Lunar Boost
                            -
                            {' '}
                            <span>All Rights Reserved</span>
                        </h3>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
