/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    SideBar, DetailOrder, DetailMarket, DetailProfile, DetailBooster, DetailInvoice, DetailOther,
} from '../../component';
import styles from '../../styles/User.module.css';

function Detail(props) {
    const { tes } = props;
    const [role, setRole] = useState('user');
    const [component, setComponent] = useState('order');

    const [userData, setUserData] = useState<any | null>(null);

    useEffect(() => {
        const dataStore = getCookie('store');

        if (dataStore === '') {
            setUserData(null);
        } else if (dataStore !== undefined) {
            if (userData === null) {
                const User = JSON.parse(dataStore);
                setUserData(User.user);
            } else {
                setUserData(userData);
            }
        } else {
            setUserData(null);
        }
    }, [userData]);

    function getCookie(cName: any) {
        const name = `${cName}=`;
        const cDecoded = decodeURIComponent(document.cookie); // to be careful
        const cArr = cDecoded.split('; ');
        let res;
        cArr.forEach((val) => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        });
        return res;
    }

    function getComponent(comp: string) {
        setComponent(comp);
    }

    return (
        <>
            {userData?.isLogin ? (
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
                                {component === 'profile' && (<DetailProfile role={role} userData={userData} />)}
                                {component === 'market' && (<DetailMarket role={role} />)}
                                {component === 'order' && (<DetailOrder role={role} />)}
                                {component === 'invoice' && (<DetailInvoice role={role} />)}
                                {component === 'other' && (<DetailOther role={role} />)}
                                {component === 'boost' && (<DetailBooster role={role} />)}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Container className="py-5 my-5">
                    <h1 className="my-5">404 Error</h1>
                </Container>
            )}
        </>
    );
}

export default Detail;

export async function getStaticProps() {
    return {
        props: {
            tes: 'ok',
        },
    };
}
