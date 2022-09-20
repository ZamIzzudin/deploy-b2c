/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import OptionalAddons from './Checkout-AddOns';
import { RankView } from './Checkout-OrderView';
import styles from './styles/Checkout.module.css';

function Checkout(props: any) {
    const {
        form, orderForm,
    } = props;

    const [addOns, setAddOns] = useState([]);

    async function getAddOns() {
        const url = 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/add-ons';

        await axios.get(url).then((res) => setAddOns(res.data.data)).catch((err) => alert(err.message));
    }

    useEffect(() => {
        getAddOns();
    }, []);

    return (
        <div className="fullwidth centered flex-down card">
            <h3 className="text-center">
                Checkout
            </h3>

            {orderForm.map((order) => (
                <RankView data={order} />
            ))}

            <Row className={`my-5 ${styles.fullwidth}`}>
                <div className={styles['radio-form']}>
                    {addOns?.length > 0 && (
                        <OptionalAddons data={addOns} />
                    )}
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
