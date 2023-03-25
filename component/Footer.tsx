import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/Footer.module.css';

function Footer() {
    return (
        <footer className={styles.Footer}>
            <Container>
                <Row>
                    <Col className={`${styles.col} col-md-6 col-12`}>
                        <div className={styles['brand-overview']}>
                            <Link href="/" scroll>
                                <Image src="/logo.png" width="160" height="55" />
                            </Link>
                        </div>
                    </Col>
                    <Col className="col-md-3 col-6">
                        <div className={styles['footer-part']}>
                            <h1 className={styles['list-title']}>Legal</h1>
                            <ul className={styles['footer-list']}>
                                <li>
                                    <Link href="/legal/terms-of-use" scroll>Terms of Use</Link>
                                </li>
                                <li>
                                    <Link href="/legal/privacy-policy" scroll>Privay Policy</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col className="col-md-3 col-6">
                        <div className={styles['footer-part']}>
                            <h1 className={styles['list-title']}>Supported Games</h1>
                            <ul className={styles['footer-list']}>
                                <li>
                                    <Link href="/boost" scroll>Apex Legends</Link>
                                </li>
                                <li>
                                    <Link href="/boost" scroll>Valorant</Link>
                                </li>
                                <li>
                                    <Link href="/boost" scroll>New World</Link>
                                </li>
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
