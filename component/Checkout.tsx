/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import { json } from 'node:stream/consumers';
import { Row, Col } from 'react-bootstrap';
import { DefaultAddOns, OptionalAddons } from './Checkout-AddOns';
import styles from './styles/Checkout.module.css';

/* eslint-disable react/button-has-type */
function Checkout(props: any) {
    const {
        form, currentRank, desireRank, numberGame,
    } = props;

    return (
        <div className="fullwidth centered flex-down card">
            <h3 className="text-center">
                Checkout
            </h3>
            <h5>
                Current Rank :
                <span>{currentRank}</span>
            </h5>
            <h5>
                Desire Rank:
                <span>{desireRank}</span>
            </h5>
            <h5>
                Number of Game:
                <span>{numberGame}</span>
            </h5>

            <Row className={`my-5 ${styles.fullwidth}`}>
                <div className={styles['radio-form']}>
                    {form?.length > 0 && (
                        <OptionalAddons name={form} />
                    )}
                    <hr />
                    <DefaultAddOns />
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
