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

import { AsyncLogout, AsyncCheckLogin } from '../state/auth/action';
import { asyncGetAllGames } from '../state/games/action';
// import { asyncGetAllRanksByGame } from '../state/ranks/action';
import { asyncGetAllServersByGame } from '../state/servers/action';
import { asyncGetAllAccount } from '../state/accounts/action';
import { asyncGetServicesPerGame } from '../state/services/action';

import styles from './styles/Navbar.module.css';

function TabBar() {
    const { auth } = useAppSelector((states) => states);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [scrollY, setScrollY] = useState(0);
    const [sideBar, setSideBar] = useState(false);
    const [modal, showModal] = useState(false);

    const handleModal = () => {
        showModal(true);
    };

    const handleLogout = async () => {
        dispatch(AsyncLogout());
        router.push('/');
    };

    // Hide Modal
    useEffect(() => {
        showModal(false);
    }, [auth]);

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
        dispatch(AsyncCheckLogin());
        dispatch(asyncGetAllGames());
        dispatch(asyncGetAllAccount());
        dispatch(asyncGetServicesPerGame('valorant'));
        dispatch(asyncGetAllServersByGame('valorant'));
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrollY > 150 && (styles['scroll-dekstop'])}`}>
            <div className={styles['navbar-logo']}>
                <Image src="/logo.png" width="125" height="45" />
            </div>
            <div className={`${styles['navbar-collapse']} ${sideBar && (styles['show-side-bar'])}`}>
                <button className={styles['close-toogle']} onClick={() => setSideBar(false)}>
                    <i className="fa-solid fa-xmark" />
                </button>
                <div className={styles['navbar-list']} onClick={() => setSideBar(false)}>
                    <Link href="/" scroll>Home</Link>
                    <Link href="/boost" scroll>Boost</Link>
                    <Link href="/market" scroll>Market</Link>
                </div>
                <div className={styles['navbar-button']} onClick={() => setSideBar(false)}>
                    {auth.user.emailVerified ? (
                        <div className="gap-3 w-90 centered">
                            <Link scroll href="/dashboard">
                                <button className="button-border capsule">Profile</button>
                            </Link>
                            <span onClick={() => handleLogout()} className="button capsule">
                                Logout
                            </span>
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
