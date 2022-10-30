/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */

import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { LiveChatWidget } from '@livechat/widget-react';

import TabBar from '../component/Navbar';
import Footer from '../component/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  // const [showLC, setShowLC] = useState(true);

  // const onLoad = () => {
  //   if (window.innerWidth < 800 && window.location.href.slice(-9) === 'dashboard') {
  //     setShowLC(false);
  //   }
  // };

  // useEffect(() => {
  //   onLoad();
  // }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous" />
      <Script src="https://kit.fontawesome.com/63c3db6def.js" crossOrigin="anonymous" />
      <TabBar />

      <Component {...pageProps} />
      <Footer />

      {/* <LiveChatWidget
        license={process.env.LC_WIDGET_ID}
        visibility="minimized"
      /> */}
    </>
  );
}

export default MyApp;
