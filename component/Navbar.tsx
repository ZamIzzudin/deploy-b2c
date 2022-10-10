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
    const [scrollY, setScrollY] = useState(0);
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
    };

    const getDataLogin = (data: any, token: any, roles: any) => {
        if (data !== undefined) {
            const store = {
                user: {
                    isLogin: data.emailVerified,
                },
                token,
                roles,
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

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrollY > 150 && (styles['scroll-dekstop'])}`}>
            <div className={styles['navbar-logo']}>
                <Image src="/logo.png" width="125" height="45" />
            </div>
            <div className={`${styles['navbar-collapse']} ${sideBar && (styles['show-side-bar'])}`}>
                <div className={styles['close-toogle']} onClick={() => setSideBar(false)}>
                    <i className="fa-solid fa-xmark" />
                </div>
                <div className={styles['navbar-list']} onClick={() => setSideBar(false)}>
                    <Link href="/" scroll>Home</Link>
                    <Link href="/boost" scroll>Boost</Link>
                    <Link href="/market" scroll>Market</Link>
                </div>
                <div className={styles['navbar-button']} onClick={() => setSideBar(false)}>
                    {userData ? (
                        <>
                            <Link scroll href="/dashboard">
                                <a>
                                    <button className="button-border capsule">Profile</button>
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
