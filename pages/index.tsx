/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Row, Col } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { useAppSelector } from '../hooks';

import ErrorPage from '../component/ErrorPage';
import Jumbotron from '../component/home/Jumbotron';
import FeaturedBenefit from '../component/home/Featured-Benefit';
import Testimonial from '../component/home/Testimonial';
import FAQ from '../component/home/FAQ';
import Step from '../component/home/Step';
import { GameCard } from '../component';

import styles from '../styles/Home.module.css';

function Home() {
  const { games, error }: any = useAppSelector((states) => states);

  const Row1 = useRef(null);
  const Row2 = useRef(null);
  const Row3 = useRef(null);
  const Row4 = useRef(null);
  const Row5 = useRef(null);
  const Row6 = useRef(null);
  const Row7 = useRef(null);

  async function animate() {
    if (Row1.current) {
      const sr = (await import('scrollreveal')).default;
      sr().reveal(Row1.current, {
        delay: 200, mobile: false, distance: '100px',
      });
      sr().reveal(Row2.current, {
        delay: 200, mobile: false, distance: '100px',
      });
      sr().reveal(Row3.current, {
        delay: 200, mobile: false, distance: '100px',
      });
      sr().reveal(Row4.current, {
        delay: 200, mobile: false, distance: '100px',
      });
      sr().reveal(Row5.current, {
        delay: 200, mobile: false, distance: '100px',
      });
      sr().reveal(Row6.current, {
        delay: 200, mobile: false, distance: '100px',
      });
      sr().reveal(Row7.current, {
        delay: 200, mobile: false,
      });
    }
  }

  useEffect(() => {
    animate();
  }, []);

  if (error) {
    return (
      <ErrorPage />
    );
  }

  return (
    <main className="pt-4">
      <Head>
        <title>Lunar Boost | Home</title>
      </Head>

      <Jumbotron />
      <div className={`${styles['main-container']} py-5 z-upper`}>
        <Row ref={Row1}>
          <h1 className={`${styles['content-title']}  text-end mt-5`}>Supported Game</h1>
          <h2 className={`${styles['content-subtitle']} text-end`}>What we can handle</h2>
        </Row>
        <Row ref={Row2} className="my-5 centered">
          <Row className="w-50-res">
            {games.map((game) => (
              <GameCard data={game} key={game.id} />
            ))}
          </Row>
        </Row>
        <Row ref={Row3}>
          <FeaturedBenefit />
        </Row>
        <Row ref={Row4}>
          <h1 className={`${styles['content-title']} text-end mt-3`}>Experience Flow</h1>
          <h2 className={`${styles['content-subtitle']} text-end mb-5`}>An effortless rank-up process.</h2>
          <Step />
        </Row>
        <Row ref={Row5} className="my-5">
          <h1 className={`${styles['content-title']} text-end`}>Testimonial</h1>
          <h2 className={`${styles['content-subtitle']} text-end mb-5`}>based on their experience</h2>
          <Testimonial />
        </Row>
        <Row ref={Row6}>
          <h1 className={`${styles['content-title']} text-end mt-3`}>FAQ</h1>
          <FAQ />
        </Row>
        <Row ref={Row7} className="p-4 centered">
          <Col className={`${styles['discord-card']}`}>
            <h3 className={`${styles['content-title']} text-center mt-5`}>Discord Channel</h3>
            <button type="button" className="button capsule mt-3 mb-5">Join Now</button>
          </Col>
        </Row>
      </div>
    </main>
  );
}

export default Home;
