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
import type { AppProps } from 'next/app';
import { useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import TabBar from '../component/Navbar';
import Footer from '../component/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  const tawkMessengerRef = useRef(null);

  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous" />
      <Script src="https://kit.fontawesome.com/63c3db6def.js" crossOrigin="anonymous" />
      <TabBar />

      <Component {...pageProps} />
      <Footer />
      <TawkMessengerReact
        propertyId="62d5635eb0d10b6f3e7ce951"
        widgetId="1g88ooaaq"
        useRef={tawkMessengerRef}
      />
    </>
  );
}

export default MyApp;
