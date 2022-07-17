/* eslint-disable react/button-has-type */
import {
    Row, Col, Form,
} from 'react-bootstrap';
import Image from 'next/image';

function DetailProfile(props: any) {
    const { role } = props;

    return (
        <div className="mt-4">
            {role === 'user' ? (
                <Row className="centered">
                    <Col className="col-md-5 px-3 card">
                        <div className="fullwidth centered-down">
                            <Image src="/default_photoURL.jpg" width="100" height="100" className="circle" />
                            <h1>Azzam Izzudin</h1>
                            <h3>azzamizzudinhasan@gmail.com</h3>
                            <span>Member since 12 july 2022</span>
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
