/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
import {
    Row, Col, Form,
} from 'react-bootstrap';
import Image from 'next/image';
import styles from './styles/DetailPage.module.css';

function DetailProfile(props: any) {
    const { role, userData } = props;

    return (
        <div className="mt-4">
            {role === 'user' ? (
                <Row>
                    <Col className="col-md-5 px-3 card relative-pos">
                        <div className="fullwidth centered-down">
                            <Image src={userData?.photoURL || '/valo_logo.png'} width="180" height="180" className="circle" />
                            <h1 className={styles['display-name']}>{userData.displayName}</h1>
                            <h3 className={styles['user-email']}>{userData.email}</h3>
                            <span className={`${styles['footer-card-profile']} absolute-pos abs-bottom`}>Member since 12 july 2022</span>
                        </div>
                    </Col>
                    <Col className="px-2">
                        <div className="card fullwidth">
                            <h2>Edit Information</h2>
                            <hr />
                            <Row>
                                <Form.Group className="mb-3 col-md-6">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your Name" className="form-layout" />
                                </Form.Group>
                                <Form.Group className="mb-3 col-md-6">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your Name" className="form-layout" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your Name" className="form-layout" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your Name" className="form-layout" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <div>
                                    <button className="button capsule mt-3">Update</button>
                                </div>
                            </Row>
                        </div>
                    </Col>
                </Row>
            ) : (
                <h1>404 Error</h1>
            )}
        </div>
    );
}

export default DetailProfile;
