/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
import { Row, Col, Form } from 'react-bootstrap';
import styles from './styles/DetailPage.module.css';

function DetailOther(props: any) {
    const { role } = props;

    return (
        <>
            {role === 'admin' ? (
                <Row className={`${styles['rank-container']} centered mt-4`}>
                    <Col className="card col-md-6">
                        <h3>Add New Booster</h3>
                        <Form.Group className="mb-3 fullwidth">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className="form-layout mb-4" />
                            <div>
                                <button className="button">Add Booster</button>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col className="card col-md-5">
                        <h3>Add New Booster</h3>
                        <Form.Group className="mb-3 fullwidth">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className="form-layout mb-4" />
                            <div>
                                <button className="button">Add Booster</button>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
            ) : (
                <h1>404 Error</h1>
            )}
        </>
    );
}

export default DetailOther;
