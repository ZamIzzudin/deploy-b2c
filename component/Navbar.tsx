/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-use-before-define */
/* eslint-disable quotes */
/* eslint-disable prefer-template */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { LoginModal } from '.';
import { socialMediaLogout } from '../login-auth/auth';
import styles from './styles/Navbar.module.css';

function TabBar(props: any) {
    const { User } = props;
    const [modal, showModal] = useState(false);
    const [userData, setUserData] = useState<any | null>(User);

    const handleModal = () => {
        showModal(true);
    };

    const handleLogout = async () => {
        socialMediaLogout();
        document.cookie = "user=;";
    };

    const getDataLogin = (data: any) => {
        if (data !== undefined) {
            const dataUser = {
                displayName: data.displayName, email: data.email, isLogin: data.emailVerified, photoURL: data.photoURL,
            };

            const expiryDate = new Date();
            const month = (expiryDate.getMonth() + 1) % 12;
            expiryDate.setMonth(month);

            document.cookie = 'user=' + JSON.stringify(dataUser) + "; expires=" + expiryDate.toUTCString();
            let user = getCookie("user");

            if (user !== undefined) {
                user = JSON.parse(user);
                setUserData(user);
                showModal(false);
            }
        }
    };

    function getCookie(cName: any) {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); // to be careful
        const cArr = cDecoded.split('; ');
        let res;
        cArr.forEach((val) => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        });
        return res;
    }

    return (
        <Navbar collapseOnSelect expand="lg" className={styles.navbar}>
            <Container>
                <Navbar.Brand className={styles['brand-text']}>
                    <Image src="/logo.png" width="170" height="60" />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className={`${styles['navbar-link']} me-auto`}>
                        <Link scroll href="/">Home</Link>
                        <Link scroll href="/boost">Boost</Link>
                        <Link scroll href="/market">Market</Link>
                        <Link scroll href="/support">Support</Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        {userData ? (
                            <>
                                {userData ? (
                                    <Link scroll href="/profile/detail">
                                        <a>
                                            <img src={userData?.photoURL} width="40" height="40" className="circle" />
                                            <span className="mx-3">{userData.displayName}</span>
                                        </a>
                                    </Link>

                                ) : (
                                    <></>
                                )}
                                <span onClick={() => handleLogout()}>
                                    <a className="button capsule">Logout</a>
                                </span>
                            </>
                        ) : (
                            <span onClick={() => handleModal()}>
                                <a className="button capsule">Login</a>
                            </span>
                        )}
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
            <LoginModal
                show={modal}
                onHide={() => showModal(false)}
                getDataLogin={getDataLogin}
            />
        </Navbar>
    );
}
export default TabBar;
