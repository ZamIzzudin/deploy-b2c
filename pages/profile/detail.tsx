/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import {
    SideBar, DetailOrder, DetailMarket, DetailProfile, DetailBooster, DetailInvoice, DetailOther,
} from '../../component';
import styles from '../../styles/User.module.css';

function Detail() {
    const [role, setRole] = useState('user');
    const [component, setComponent] = useState('order');

    function getComponent(comp: string) {
        setComponent(comp);
    }

    return (
        <Container className="py-5">
            <Row className="mt-5">
                <SideBar role={role} getComponent={getComponent} />
            </Row>
            <Row>
                <Col className="centered-down">
                    <Row className="my-3">
                        <div>
                            <button className="button capsule" onClick={() => setRole('user')}>User</button>
                            <button className="button capsule mx-3" onClick={() => setRole('booster')}>Booster</button>
                            <button className="button capsule" onClick={() => setRole('admin')}>Admin</button>
                        </div>
                    </Row>
                    <Row className="full-width centered">
                        {component === 'profile' && (<DetailProfile role={role} />)}
                        {component === 'market' && (<DetailMarket role={role} />)}
                        {component === 'order' && (<DetailOrder role={role} />)}
                        {component === 'invoice' && (<DetailInvoice role={role} />)}
                        {component === 'other' && (<DetailOther role={role} />)}
                        {component === 'boost' && (<DetailBooster role={role} />)}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Detail;
