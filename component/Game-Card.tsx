/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import styles from './styles/GameCard.module.css';

function GameCard(props: any) {
    const { name, thumbnail, mini } = props;

    return (
        <>
            {mini === true ? (
                <Col className="col-md-3 centered " onClick={() => { props.getData(name); }}>
                    <Row className={`${styles['card-game-mini']} card-hovering card`}>
                        <Col className="col-md-3">
                            <Image src={`${thumbnail}`} width="145%" height="130%" />
                        </Col>
                        <Col className="col-md-8">
                            <h3 className={`${styles['card-name']} text-center`}>{name}</h3>
                        </Col>
                    </Row>
                </Col>
            ) : (
                <Col className="col-md-2 centered " onClick={() => { props.getData(name); }}>
                    <div className={`${styles['card-game']} card-hovering card`}>
                        <div>
                            <Image src={`${thumbnail}`} width="145%" height="130%" />
                        </div>
                        <h3 className={`${styles['card-name']} text-center mt-4`}>{name}</h3>
                    </div>
                </Col>
            )}
        </>
    );
}

export default GameCard;
