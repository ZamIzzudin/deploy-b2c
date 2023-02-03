/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Image from 'next/image';
import { Row, Col } from 'react-bootstrap';

export function DoubleIncludeRank({ details }) {
    const badges = details.map((detail) => detail[detail.title]);

    return (
        <Col>
            <Row className="flex-horizon fullwidth">
                <Col className="centered-down gap-2 pad-0">
                    <Image src={badges[0]?.badge || '/kosong.png'} width={65} height={65} />
                    {badges[0]?.name?.includes('master') ? (
                        <span className="set2">
                            {badges[0]?.name?.replace('_', ' ')}
                            K
                        </span>
                    ) : (
                        <span className="set2">{badges[0]?.name?.replace('_', ' ')}</span>
                    )}
                </Col>
                <Col className="centered h-100 pad-0">
                    <Image src="/arrow.png" width={40} height={20} />
                </Col>
                <Col className="centered-down gap-2 pad-0">
                    <Image src={badges[1]?.badge || '/kosong.png'} width={65} height={65} />
                    {badges[1]?.name?.includes('master') ? (
                        <span className="set2">
                            {badges[1]?.name?.replace('_', ' ')}
                            K
                        </span>
                    ) : (
                        <span className="set2">{badges[1]?.name?.replace('_', ' ')}</span>
                    )}
                </Col>
            </Row>
        </Col>
    );
}

export function RankAndGame({ details }) {
    const badges = details.map((detail) => detail[detail.title]);
    return (
        <Col className="centered-down gap-2">
            <Image src={badges[0]?.badge || '/kosong.png'} width={65} height={65} />
            <span className="content-text">
                <b className="sec-font">{badges[1]}</b>
                {' '}
                game in
                {' '}
                <b className="sec-font">{badges[0]?.name}</b>
            </span>
        </Col>
    );
}

export function NumberGame({ details }) {
    const display = details[0][details[0].title];

    return (
        <Col className="centered-down gap-2">
            <span className="content-text">
                <b className="sec-font">
                    {display}
                    {details[0].title === 'Sell Coin /k' && ('K')}
                </b>
                {' '}
                {details[0].title === 'Sell Coin /k' ? (
                    'Coins'
                ) : (
                    'Games'
                )}
            </span>
        </Col>
    );
}

export function Point({ details }) {
    const display = details[0][details[0].title];
    return (
        <div className=" centered text-center flex-down">
            <h4 className="capitalized sec-font">{display?.unit_type}</h4>
            <span className="content-text mt-1">
                <b className="sec-font">{display?.start}</b>
                {' '}
                -
                {' '}
                <b className="sec-font">{display?.to}</b>
            </span>
        </div>
    );
}
