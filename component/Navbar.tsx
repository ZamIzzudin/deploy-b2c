/* eslint-disable consistent-return */
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
import { useRouter } from 'next/router';
import { LoginModal } from '.';
import { useAppSelector, useAppDispatch } from '../hooks';

import { AsyncLogout, AsyncCheckLogin, AsyncRefresh } from '../state/auth/action';
import { handleHideError } from '../state/errorHandle/action';

import styles from './styles/Navbar.module.css';

function TabBar() {
    const { auth } = useAppSelector((states) => states);
    const dispatch = useAppDispatch();
    const [path, setPath] = useState('/');
    const router = useRouter();

    const [scrollY, setScrollY] = useState(0);
    const [sideBar, setSideBar] = useState(false);
    const [modal, showModal] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleModal = () => {
        showModal(true);
    };

    const handleLogout = async () => {
        dispatch(AsyncLogout());
        router.push('/');
    };

    // Refresh Token Cycle
    useEffect(() => {
        showModal(false);
        // do refresh token where token is'nt undefined
        if (auth.user.emailVerified) {
            try {
                // Do in 8 minutes
                const interval = setInterval(() => {
                    dispatch(AsyncRefresh());
                }, 80000);

                return () => clearInterval(interval);
            } catch (err) {
                dispatch(AsyncLogout());
            }
        }
    }, [auth]);

    useEffect(() => {
        dispatch(handleHideError());
    }, [modal]);

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

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 700) {
            setMobile(true);
        }
    }, []);

    useEffect(() => {
        setPath(router.asPath);
    }, [router.asPath]);

    useEffect(() => {
        dispatch(AsyncCheckLogin());
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrollY > 150 && (styles['scroll-dekstop'])}`}>
            <div className={styles['navbar-logo']}>
                <Link href="/" scroll>
                    <Image src="/logo.png" width="125" height="45" />
                </Link>
            </div>
            <div className={`${styles['navbar-collapse']} ${sideBar && (styles['show-side-bar'])}`}>
                <button className={styles['close-toogle']} onClick={() => setSideBar(false)}>
                    <i className="fa-solid fa-xmark" />
                </button>
                <div className={styles['navbar-list']} onClick={() => setSideBar(false)}>
                    <span className={path === '/' ? (styles['active-nav']) : ('')}>
                        <Link href="/" scroll>Home</Link>
                    </span>
                    <span className={path === '/boost' ? (styles['active-nav']) : ('')}>
                        <Link href="/boost" scroll>Boost</Link>
                    </span>
                    <span className={path === '/market' ? (styles['active-nav']) : ('')}>
                        <Link href="/market" scroll>Market</Link>
                    </span>
                </div>
                <div className={styles['navbar-button']} onClick={() => setSideBar(false)}>
                    {auth.user.emailVerified ? (
                        <div className="gap-3 w-90 centered">
                            {mobile ? (
                                <>
                                    <Link scroll href="/dashboard">
                                        <button className="button-border capsule">Profile</button>
                                    </Link>
                                    <span onClick={() => handleLogout()} className="button capsule">
                                        Logout
                                    </span>
                                </>
                            ) : (
                                <div className={styles['navbar-dropdown']}>
                                    <button onClick={() => setShowDropdown(!showDropdown)} className={`${styles['navbar-dropdown-button']} ${showDropdown && (styles.actived)}`}>
                                        Hi,
                                        {' '}
                                        {auth?.role[0] || 'User'}
                                    </button>
                                    {showDropdown && (
                                        <div className={styles['navbar-dropdown-list']}>
                                            <Link scroll href="/dashboard">
                                                Dashboard
                                            </Link>
                                            <hr />
                                            <span onClick={() => handleLogout()}>
                                                Logout
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <span onClick={() => handleModal()} className="button capsule">
                            Login
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
            />
        </nav>
    );
}
export default TabBar;
