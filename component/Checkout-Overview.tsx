/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Image from 'next/image';
import { Row, Col } from 'react-bootstrap';

export function DoubleIncludeRank({ details }) {
    return (
        <Col>
            <Row className="flex-horizon fullwidth">
                <Col className="centered-down gap-2 pad-0">
                    <Image src={details[0].badge || '/kosong.png'} width={65} height={65} />
                    <span>{details[0].name}</span>
                </Col>
                <Col className="centered h-100 pad-0">
                    <Image src="/arrow.png" width={40} height={20} />
                </Col>
                <Col className="centered-down gap-2 pad-0">
                    <Image src={details[1].badge || '/kosong.png'} width={65} height={65} />
                    <span>{details[1].name}</span>
                </Col>
            </Row>
        </Col>
    );
}

export function RankAndGame({ details }) {
    return (
        <Col className="centered-down gap-2">
            <Image src={details[0].badge || '/kosong.png'} width={65} height={65} />
            <span className="content-text">
                <b className="sec-font">{details[1].numberGame}</b>
                {' '}
                game in
                {' '}
                <b className="sec-font">{details[0].name}</b>
            </span>
        </Col>
    );
}

export function NumberGame({ details }) {
    return (
        <span />
    );
}

export function Point({ details }) {
    return (
        <div className=" centered text-center flex-down">
            <h4 className="capitalized sec-font">{details[0].unit_type}</h4>
            <span className="content-text mt-1">
                <b className="sec-font">{details[0].start}</b>
                {' '}
                -
                {' '}
                <b className="sec-font">{details[0].to}</b>
            </span>
        </div>
    );
}
