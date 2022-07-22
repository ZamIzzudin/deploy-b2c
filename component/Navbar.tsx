/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
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
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { LoginModal } from '.';
import { socialMediaLogout } from '../login-auth/auth';
import styles from './styles/Navbar.module.css';

function TabBar() {
    const [sideBar, setSideBar] = useState(false);
    const [modal, showModal] = useState(false);
    const [userData, setUserData] = useState<any | null>(null);

    const handleModal = () => {
        showModal(true);
    };

    const handleLogout = async () => {
        socialMediaLogout();
        document.cookie = "store=;";
        window.location.replace('/');
        setUserData(null);
        console.log(userData);
    };

    const getDataLogin = (data: any, token: any) => {
        if (data !== undefined) {
            const store = {
                user: {
                    displayName: data.displayName, email: data.email, isLogin: data.emailVerified, photoURL: data.photoURL,
                },
                token,
            };

            const expiryDate = new Date();
            const month = (expiryDate.getMonth() + 1) % 12;
            expiryDate.setMonth(month);

            document.cookie = 'store=' + JSON.stringify(store) + "; expires=" + expiryDate.toUTCString();

            const dataStore = getCookie("store");

            if (dataStore !== undefined) {
                const User = JSON.parse(dataStore);
                setUserData(User.user);
                showModal(false);
            }
        }
    };

    useEffect(() => {
        const dataStore = getCookie("store");

        if (dataStore === "") {
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
        // <Navbar collapseOnSelect expand="lg" variant="dark" className={styles.navbar}>
        //     <Container>
        //         <Navbar.Brand className={styles['brand-text']}>
        //             <Image src="/logo.png" width="170" height="60" />
        //         </Navbar.Brand>
        //         <Navbar.Toggle />
        //         <Navbar.Collapse id="responsive-navbar-nav">
        //             <Nav className={`${styles['navbar-link']} me-auto`}>
        //                 <Link scroll href="/">Home</Link>
        //                 <Link scroll href="/boost">Boost</Link>
        //                 <Link scroll href="/market">Market</Link>
        //                 <Link scroll href="/support">Support</Link>
        //             </Nav>
        //             <Navbar.Collapse className="justify-content-end">
        //                 {userData ? (
        //                     <>
        //                         {userData ? (
        //                             <Link scroll href="/profile/detail">
        //                                 <a>
        //                                     {/* <Image src={userData?.photoURL} width="40" height="40" className="circle" /> */}
        //                                     <button className="button-border capsule mx-3">Profile</button>
        //                                 </a>
        //                             </Link>
        //                         ) : (
        //                             <></>
        //                         )}
        //                         <span onClick={() => handleLogout()}>
        //                             <a className="button capsule">Logout</a>
        //                         </span>
        //                     </>
        //                 ) : (
        //                     <span onClick={() => handleModal()}>
        //                         <a className="button capsule">Login</a>
        //                     </span>
        //                 )}
        //             </Navbar.Collapse>
        //         </Navbar.Collapse>
        //     </Container>
        //     <LoginModal
        //         show={modal}
        //         onHide={() => showModal(false)}
        //         getDataLogin={getDataLogin}
        //     />
        // </Navbar>

        <nav className={styles.navbar}>
            <div className={styles['navbar-logo']}>
                <Image src="/logo.png" width="170" height="60" />
            </div>
            <div className={`${styles['navbar-collapse']} ${sideBar && (styles['show-side-bar'])}`}>
                <div className={styles['close-toogle']} onClick={() => setSideBar(false)}>
                    <i className="fa-solid fa-xmark" />
                </div>
                <div className={styles['navbar-list']} onClick={() => setSideBar(false)}>
                    <Link href="/" scroll>Home</Link>
                    <Link href="/boost" scroll>Boost</Link>
                    <Link href="/market" scroll>Market</Link>
                    <Link href="/support" scroll>Support</Link>
                </div>
                <div>
                    {userData ? (
                        <>
                            <Link scroll href="/profile/detail">
                                <a>
                                    <button className="button-border capsule mx-3">Profile</button>
                                </a>
                            </Link>
                            <span onClick={() => handleLogout()}>
                                <a className="button capsule">Logout</a>
                            </span>
                        </>
                    ) : (
                        <span onClick={() => handleModal()}>
                            <a className="button capsule">Login</a>
                        </span>
                    )}
                </div>
            </div>
            <div className={styles['bar-toogle']} onClick={() => setSideBar(true)}>
                <i className="fa-solid fa-bars" />
            </div>
            <LoginModal
                show={modal}
                onHide={() => showModal(false)}
                getDataLogin={getDataLogin}
            />
        </nav>
    );
}
export default TabBar;
