/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {
  Jumbotron, GameCard, FeaturedBenefit, Testimonial, FAQ, Step,
} from '../component';
import styles from '../styles/Home.module.css';

function Home(props) {
  const { games } = props;

  return (
    <main className="pt-4">
      <Jumbotron />
      <div className={`${styles['main-container']} py-5 z-upper`}>
        <Row>
          <h1 className={`${styles['content-title']} text-end mt-5`}>Supported Game</h1>
          <h2 className={`${styles['content-subtitle']} text-end`}>What we can handle</h2>
        </Row>
        <Row className="my-5 px-5">
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
        <Row>
          <FeaturedBenefit />
        </Row>
        <Row>
          <h1 className={`${styles['content-title']} text-end mt-3`}>Experiance Flow</h1>
          <h2 className={`${styles['content-subtitle']} text-end mb-5`}>An effortless rank-up process.</h2>
          <Step />
        </Row>
        <Row className="my-5">
          <h1 className={`${styles['content-title']} text-end`}>Testimonial</h1>
          <h2 className={`${styles['content-subtitle']} text-end mb-5`}>based on their experience</h2>
          <Testimonial />
        </Row>
        <Row>
          <h1 className={`${styles['content-title']} text-end mt-3`}>FAQ</h1>
          <FAQ />
        </Row>
        <Row className={`${styles['banner-collapse']} full-width centered`}>
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
