import { Row, Col } from 'react-bootstrap';
import styles from './styles/Checkout.module.css';

/* eslint-disable react/button-has-type */
function Checkout(props: any) {
    const { type } = props;

    return (
        <div className="centered-down">
            <h3 className="text-center">
                Checkout
            </h3>
            <Row className={`my-5 ${styles.fullwidth}`}>
                <div className={styles['radio-form']}>
                    type form :
                    {' '}
                    {type}
                </div>
            </Row>
            <Row className={styles.fullwidth}>
                <Col className={styles['total-amount']}>
                    <h4>Total Amount</h4>
                </Col>
                <Col>
                    <h4 className={styles.righted}> $50.00</h4>
                </Col>
            </Row>

            <button className="button capsule mt-4">Pay Now</button>
        </div>
    );
}

export default Checkout;
