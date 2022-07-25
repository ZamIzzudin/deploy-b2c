/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
    Container, Row, Col, Form,
} from 'react-bootstrap';
import styles from '../styles/Support.module.css';

function Support() {
    return (
        <Container className="my-5 pt-5">
            <h1 className="section-title mt-5">Tell Your Problem</h1>
            <span className="section-subtitle ">Send this form and connect with us</span>
            <Row className="mt-5">
                <Col className="col-md-7 card col-12">
                    <Row>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your Name" className="form-layout" />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" className="form-layout" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select className="form-layout">
                                <option>General Question</option>
                                <option>Order Issues</option>
                                <option>Payment Issues</option>
                                <option>Application</option>
                                <option>Bug Report</option>
                                <option>Others</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter Your Message" className="form-layout" />
                        </Form.Group>
                        <div>
                            <button type="button" className="button capsule">Send</button>
                        </div>
                    </Row>
                </Col>
                <Col className="col-md-5 py-3 px-4 col-12">
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
