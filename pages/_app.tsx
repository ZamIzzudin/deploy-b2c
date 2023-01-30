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
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';

import { Provider } from 'react-redux';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

import { store } from '../state';

import TabBar from '../component/Navbar';
import Footer from '../component/Footer';

declare const window: any;

function MyApp({ Component, pageProps }: AppProps) {
  const tawkMessengerRef = useRef<any>();
  const { pathname } = useRouter();

  function hideTawk() {
    tawkMessengerRef.current.hideWidget();
  }

  function showTawk() {
    tawkMessengerRef.current.showWidget();
  }

  const onLoad = () => {
    if (pathname === '/dashboard') {
      hideTawk();
    } else {
      showTawk();
    }
  };

  useEffect(() => {
    if (window.Tawk_API.showWidget !== undefined) {
      onLoad();
    }
  }, [pathname]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous" />
      <Script src="https://kit.fontawesome.com/63c3db6def.js" crossOrigin="anonymous" />
      <Provider store={store}>
        <TabBar />

        <Component {...pageProps} />
        <Footer />

        <TawkMessengerReact
          propertyId={process.env.TAWK_WIDGET_ID}
          widgetId={process.env.TAWK_PROP_ID}
          onLoad={onLoad}
          ref={tawkMessengerRef}
        />

      </Provider>
    </>
  );
}

export default MyApp;
