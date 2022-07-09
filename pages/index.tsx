/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import {
  Jumbotron, GameCard, FeaturedBenefit, Testimonial, FAQ, Step,
} from '../component';
import styles from '../styles/Home.module.css';

function Home() {
  return (
    <main className="py-4">
      <Jumbotron />
      <Container className={`${styles['main-container']} py-5`}>
        <Row>
          <h1 className={`${styles['content-title']} text-end mt-5`}>Supported Game</h1>
          <h2 className={`${styles['content-subtitle']} text-end`}>What we can handle</h2>
        </Row>
        <Row className="my-5 px-5">
          <GameCard name="Apex Legend" thumbnail="/apex.png" />
          <GameCard name="Valorant" thumbnail="/valo.png" />
          <GameCard name="New World" thumbnail="/newworld.png" />
          <GameCard name="Dota" thumbnail="/Dota.png" />
          <GameCard name="Black Desert" thumbnail="/Blackdesert.png" />
          <GameCard name="CS:GO" thumbnail="/csgo.png" />
          <GameCard name="Genshin Impact" thumbnail="/Genshin.png" />
          <GameCard name="COD Cold War" thumbnail="/coldwar.png" />
        </Row>
        <Row>
          <FeaturedBenefit />
        </Row>
        <Row>
          <h1 className={`${styles['content-title']} text-end mt-3`}>Experiance Flow</h1>
          <h2 className={`${styles['content-subtitle']} text-end mb-5`}>An effortless rank-up process.</h2>
          <Step />
          <div className={`${styles['arrow-decoration']}`}>
            <Image src="/arrow-fill.png" width="300%" height="380%" />
          </div>
          <div className={`${styles['arrow-decoration2']}`}>
            <Image src="/arrow-fill.png" width="300%" height="380%" />
          </div>
          <div className={`${styles['arrow-decoration3']}`}>
            <Image src="/arrow2.png" width="230%" height="230%" />
          </div>
          <div className={`${styles['arrow-decoration4']}`}>
            <Image src="/arrow.png" width="250%" height="330%" />
          </div>
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
      </Container>
    </main>
  );
}

export default Home;
