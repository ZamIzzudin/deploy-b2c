/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/GameCard.module.css';

function GameCard(props: any) {
    const {
        data, mini, remove, active,
    } = props;

    return (
        <>
            {mini === true ? (
                <Col className="col-md-4 col-6 centered relative-pos pad-0" onClick={() => { props.getData(data); }}>
                    <Row className={`${active.name === data.name ? styles.actived : null} ${styles['card-game-mini']} ${remove ? ('') : ('card-hovering')} card`}>
                        <Col className={`${styles['thumb-container']} col-md-12`}>
                            <Image src={`${data.logo_url}`} width="145%" height="130%" />
                        </Col>
                        <Col className={`${styles['text-container']} col-md-12`}>
                            <h3 className={`${styles['card-name']} text-center`}>{data.name}</h3>
                        </Col>
                    </Row>
                    {remove && (
                        <button onClick={() => props.removeFunc(data.id)} className={styles['remove-toogle']}>X</button>
                    )}
                </Col>
            ) : (
                <Col className="centered max-w-50">
                    <Link href="/boost">
                        <div className={`${styles['card-game']} card-hovering`}>
                            <div className="px-3">
                                <Image src={`${data.logo_url}`} width="145%" height="130%" />
                            </div>
                            <h3 className={`${styles['card-name']} text-center mt-4`}>{data.name}</h3>
                        </div>
                    </Link>
                </Col>
            )}
        </>
    );
}

export default GameCard;
