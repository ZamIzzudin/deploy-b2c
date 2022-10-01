/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { OptionalAddons } from '../component';
import {
    DoubleIncludeRank, RankAndGame, NumberGame, Point,
} from './Checkout-Overview';

function Checkout(props: any) {
    const {
        details, flow, orderType, addOns, form, game,
    } = props;

    const [price, setPrice] = useState<any>('50.00');
    const [overviewDetails, setOverviewDetails] = useState<any>([]);
    const [selectedAddOns, setSelectedAddOns] = useState<any>({});

    function setupOverview() {
        const overviews = form?.map((overview) => overview.type);
        const count = {};

        overviews.forEach((overview) => {
            count[overview] = (count[overview] || 0) + 1;
        });

        setOverviewDetails(count);
    }

    function setAddOns(addon, status) {
        const selected = selectedAddOns;
        selected[addon] = status;

        setSelectedAddOns(selected);
    }

    function getDataCheckout() {
        const dataDetails = {
            total_price: '',
            game: {},
            type: '',
            service: 'Boost',
            addOns: {},
        };
        dataDetails.type = orderType;
        dataDetails.game = game;
        dataDetails.total_price = price;

        details.forEach((detail) => {
            dataDetails[detail.title] = detail.name || detail.numberGame || { start: detail.start, to: detail.to };
        });

        dataDetails.addOns = selectedAddOns;

        localStorage.setItem('data', JSON.stringify(dataDetails));
    }

    useEffect(() => {
        setupOverview();
    }, [orderType]);

    return (
        <div className="fullwidth centered flex-down card">
            <h3>
                Checkout
            </h3>
            <h5 className="text-org">
                {orderType}
            </h5>
            <Row className="mt-3 fullwidth">
                {overviewDetails?.includeRank === 2 && (
                    <DoubleIncludeRank details={details} />
                )}
                {overviewDetails?.includeRank === 1 && overviewDetails?.gameNumber === 1 && (
                    <RankAndGame details={details} />
                )}
                {overviewDetails?.includeRank === undefined && overviewDetails?.gameNumber === 1 && (
                    <NumberGame details={details} />
                )}
                {overviewDetails.points > 0 && (
                    <Point details={details} />
                )}
            </Row>

            <Row className="my-5 fullwidth">
                <div className="fullwidth">
                    {addOns?.map((item) => (
                        <OptionalAddons key={item.name} data={item} getAddOns={setAddOns} />
                    ))}
                </div>
            </Row>

            <Row className="fullwidth px-3">
                <Col>
                    <h4 className="fullwidth text-left">Total Amount</h4>
                </Col>
                <Col>
                    <h4 className="fullwidth text-right">
                        $
                        {price}
                    </h4>
                </Col>
            </Row>

            <Row className="mt-3">
                <Link href="/payment">
                    <button type="button" className="button capsule" onClick={() => getDataCheckout()}>Pay Now</button>
                </Link>
            </Row>
        </div>
    );
}

export default Checkout;
