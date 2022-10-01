/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Image from 'next/image';
import { Row, Col } from 'react-bootstrap';

export function DoubleIncludeRank({ details }) {
    return (
        <Row className="centered">
            {details?.map((detail, index) => (
                <Col className={`${index === 0 && ('col-md-8')} centered pr-1`}>
                    <Row className="flex-horizon fullwidth">
                        <Col className="centered-down gap-2">
                            <Image src={detail.badge || '/kosong.png'} width={65} height={65} />
                            <span>{detail.name}</span>
                        </Col>
                        {index === 0 && (
                            <Col className="centered">
                                <Image src="/arrow.png" width={50} height={25} />
                            </Col>

                        )}
                    </Row>
                </Col>
            ))}
        </Row>
    );
}

export function RankAndGame({ details }) {
    return (
        <Row className="centered">
            <Col className="centered-down gap-2">
                <Image src={details[0].badge || '/kosong.png'} width={65} height={65} />
                <span>
                    {details[1].numberGame}
                    {' '}
                    game in
                    {' '}
                    {details[0].name}
                </span>
            </Col>
        </Row>
    );
}

export function NumberGame({ details }) {
    return (
        <span />
    );
}

export function Point({ details }) {
    return (
        <Row className="centered text-center">
            <h4>{details[0].unit}</h4>
            <h5>
                {details[0].start}
                {' '}
                to
                {' '}
                {details[0].to}
            </h5>
        </Row>
    );
}
