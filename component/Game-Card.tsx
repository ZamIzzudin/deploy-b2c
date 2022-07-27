/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import styles from './styles/GameCard.module.css';

function GameCard(props: any) {
    const {
        name, thumbnail, mini, remove,
    } = props;

    return (
        <>
            {mini === true ? (
                <Col className="col-md-3 col-4 min-w-155px centered relative-pos" onClick={() => { props.getData(name); }}>
                    <Row className={`${styles['card-game-mini']} ${remove ? ('') : ('card-hovering')} card`}>
                        <Col className={`${styles['thumb-container']} col-md-12`}>
                            <Image src={`${thumbnail}`} width="145%" height="130%" />
                        </Col>
                        <Col className={`${styles['text-container']} col-md-12`}>
                            <h3 className={`${styles['card-name']} text-center`}>{name}</h3>
                        </Col>
                    </Row>
                    {remove && (
                        <button onClick={() => props.removeFunc(name)} className={styles['remove-toogle']}>X</button>
                    )}
                </Col>
            ) : (
                <Col className="col-md-2 col-4 centered " onClick={() => { props.getData(name); }}>
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
