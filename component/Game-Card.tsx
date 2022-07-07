/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import { Col } from 'react-bootstrap';
import Image from 'next/image';
import styles from './styles/GameCard.module.css';

function GameCard(props: any) {
    const { name, thumbnail, mini } = props;

    return (
        <Col className="col-md-2 centered " onClick={() => { props.getData(name); }}>
            {mini === true ? (
                <div className={`${styles['card-game-mini']} card-hovering card`}>
                    <div>
                        <Image src={`${thumbnail}`} width="145%" height="130%" />
                    </div>
                    <div>
                        <h3 className={`${styles['card-name']} text-center mt-4`}>{name}</h3>
                    </div>
                </div>
            ) : (
                <div className={`${styles['card-game']} card-hovering card`}>
                    <div>
                        <Image src={`${thumbnail}`} width="145%" height="130%" />
                    </div>
                    <h3 className={`${styles['card-name']} text-center mt-4`}>{name}</h3>
                </div>
            )}
        </Col>
    );
}

export default GameCard;
