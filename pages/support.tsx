/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
    Container, Row, Col, Form,
} from 'react-bootstrap';
import styles from '../styles/Support.module.css';

function Support() {
    return (
        <Container className="my-5 py-5">
            <h1 className="section-title mt-5">Tell Your Problem</h1>
            <span className="section-subtitle ">Send this form and connect with us</span>
            <Row className="mt-5">
                <Col className="col-md-7">
                    <Row>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control as="textarea" placeholder="Password" />
                        </Form.Group>
                        <div>
                            <button type="button" className="button capsule">Send</button>
                        </div>
                    </Row>
                </Col>
                <Col className="col-md-5 py-3 px-4">
                    <div className={`${styles['brand-card']} flex-down centered card`}>
                        <h2 className={styles['brand-socmed-text']}>Or tell us in our social media</h2>
                        <div className={styles['brand-socmed-icon']}>
                            <i className="fa-brands fa-twitter fa-1x mx-3" />
                            <i className="fa-brands fa-facebook fa-1x mx-3" />
                            <i className="fa-brands fa-instagram fa-1x mx-3" />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Support;
