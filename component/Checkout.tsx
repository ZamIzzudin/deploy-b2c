/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { OptionalAddons } from '../component';
import {
    DoubleIncludeRank, RankAndGame, NumberGame, Point,
} from './Checkout-Overview';

function Checkout(props: any) {
    const {
        details, orderType, addOns, form, game, flow,
    } = props;

    const [price, setPrice] = useState<any>(0);
    const [overviewDetails, setOverviewDetails] = useState<any>([]);
    const [selectedAddOns, setSelectedAddOns] = useState<any>([]);

    const [flow2, setFlow2] = useState(0);

    function setupOverview() {
        const overviews = form?.map((overview) => overview.type);
        const count = {};

        overviews.forEach((overview) => {
            count[overview] = (count[overview] || 0) + 1;
        });

        setOverviewDetails(count);
    }

    function setAddOns(addon) {
        const selectedAdd = addon.name.toString().slice(0, 7);
        if (selectedAddOns.length === 0) {
            setSelectedAddOns([...selectedAddOns, addon]);
            setFlow2(flow2 + 1);
        } else {
            selectedAddOns.forEach((ons) => {
                if (ons.name.includes(selectedAdd)) {
                    const index = selectedAddOns.indexOf(ons);
                    const tempSelected = selectedAddOns;
                    tempSelected.splice(index, 1);
                    setSelectedAddOns(tempSelected);
                    setFlow2(flow2 + 1);
                } else {
                    setSelectedAddOns([...selectedAddOns, addon]);
                    setFlow2(flow2 + 1);
                }
            });
        }
    }

    function getDataCheckout() {
        const dataDetails = {
            total_price: '',
            game: {},
            type: '',
            service: 'Boost',
            addOns: [],
            require: [],
        };

        const tempRequire: any = [];

        dataDetails.type = orderType;
        dataDetails.game = game;
        dataDetails.total_price = price;

        details.forEach((detail) => {
            const require = {
                [detail.title]: detail.name || detail.numberGame || detail.server || detail.platform || { start: detail.start, to: detail.to },
            };

            tempRequire.push(require);
        });

        dataDetails.addOns = selectedAddOns;
        dataDetails.require = tempRequire;

        localStorage.setItem('data', JSON.stringify(dataDetails));
    }

    async function getPrice() {
        const gameName = game.name.toLowerCase().replace(/ /g, '-');
        const serviceName = orderType.toLowerCase().replace(/ /g, '-');

        const url = `${process.env.API}/service/price/calculate?game=${gameName}&service=${serviceName}`;

        const data = {
            add_ons: selectedAddOns.length > 0 ? selectedAddOns : [{ name: 'none', percentage_price: 0 }],
            boost_detail: {},
        };

        details.forEach((detail) => {
            data.boost_detail[detail.title.toLowerCase().split(' ').join('_')] = detail.name || detail.numberGame || detail.server || detail.platform || { start: detail.start, to: detail.to };
        });

        await axios.post(url, data)
            .then((res) => setPrice(res.data.total_price))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getPrice();
    }, [flow, selectedAddOns, flow2]);

    useEffect(() => {
        setupOverview();
    }, [orderType]);

    return (
        <div className="fullwidth centered flex-down card">
            <h1 className="title-sec mt-2">
                Checkout
            </h1>
            <h5 className="text-org">
                {orderType}
            </h5>
            <Row className="mt-4 fullwidth">
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

            <Row className="mt-5 mb-4 fullwidth">
                <div className="fullwidth">
                    {addOns?.map((item) => (
                        <OptionalAddons key={item.name} data={item} getAddOns={setAddOns} />
                    ))}
                </div>
            </Row>

            <Row className="fullwidth">
                <Col className="col-7">
                    <h5 className="fullwidth text-left subtitle-sec">Total Amount</h5>
                </Col>
                <Col className="col-5">
                    <h4 className="fullwidth text-right subtitle-sec">
                        $
                        {price}
                    </h4>
                </Col>
            </Row>

            <Row className="mb-2 mt-3">
                <Col>
                    <Link href="/payment">
                        <button type="button" className="button capsule" onClick={() => getDataCheckout()}>Pay Now</button>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default Checkout;
