/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import {
  Jumbotron, GameCard, FeaturedBenefit, Testimonial, FAQ, Step,
} from '../component';
import styles from '../styles/Home.module.css';

function Home(props) {
  const { games } = props;

  const Row1 = useRef(null);
  const Row2 = useRef(null);
  const Row3 = useRef(null);
  const Row4 = useRef(null);
  const Row5 = useRef(null);
  const Row6 = useRef(null);
  const Row7 = useRef(null);

  useEffect(() => {
    async function animate() {
      if (Row1.current) {
        const sr = (await import('scrollreveal')).default;
        sr().reveal(Row1.current, {
          delay: 300, mobile: false, reset: true, distance: '100px',
        });
        sr().reveal(Row2.current, {
          delay: 300, mobile: false, reset: true, distance: '100px',
        });
        sr().reveal(Row3.current, {
          delay: 300, mobile: false, reset: true, distance: '100px',
        });
        sr().reveal(Row4.current, {
          delay: 300, mobile: false, reset: true, distance: '100px',
        });
        sr().reveal(Row5.current, {
          delay: 300, mobile: false, reset: true, distance: '100px',
        });
        sr().reveal(Row6.current, {
          delay: 300, mobile: false, reset: true, distance: '100px',
        });
        sr().reveal(Row7.current, {
          delay: 300, mobile: false, reset: true,
        });
      }
    }
    animate();
  }, []);

  return (
    <main className="pt-4">
      <Jumbotron />
      <div className={`${styles['main-container']} py-5 z-upper`}>
        <Row ref={Row1}>
          <h1 className={`${styles['content-title']}  text-end mt-5`}>Supported Game</h1>
          <h2 className={`${styles['content-subtitle']} text-end`}>What we can handle</h2>
        </Row>
        <Row ref={Row2} className="my-5 px-4">
          {games.map((game) => (
            <GameCard name={game.name} thumbnail="/apex.png" key={game.id} />
          ))}
          {/* <GameCard name="Apex Legend" thumbnail="/apex.png" />
          <GameCard name="Valorant" thumbnail="/valo.png" />
          <GameCard name="New World" thumbnail="/newworld.png" />
          <GameCard name="Dota" thumbnail="/Dota.png" />
          <GameCard name="Black Desert" thumbnail="/Blackdesert.png" />
          <GameCard name="CS:GO" thumbnail="/csgo.png" />
          <GameCard name="Genshin Impact" thumbnail="/Genshin.png" />
          <GameCard name="COD Cold War" thumbnail="/coldwar.png" /> */}
        </Row>
        <Row ref={Row3}>
          <FeaturedBenefit />
        </Row>
        <Row ref={Row4}>
          <h1 className={`${styles['content-title']} text-end mt-3`}>Experiance Flow</h1>
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
        <Row ref={Row7} className={`${styles['banner-collapse']} full-width centered`}>
          <Col className={`${styles['banner-bg']} centered-down`}>
            <h3 className={`${styles['content-title']} ${styles['banner-title']} text-end mt-5`}>Order Now</h3>
            <button type="button" className="button capsule mt-3 mb-5">Boost</button>
          </Col>
        </Row>
      </div>
    </main>
  );
}

export default Home;

export async function getStaticProps() {
  const games = await axios.get('http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/api/games').then((res) => res.data.data).catch((res) => console.log(res));

  return {
    props: {
      games,
    },
  };
}
