/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../../hooks';
import OptionalAddons from './Checkout-AddOns';
import {
    DoubleIncludeRank, RankAndGame, NumberGame, Point,
} from './Checkout-Overview';

import { setAddOnsDetail } from '../../state/addonsDetail/action';
import { asyncCalculatePrice } from '../../state/price/action';
import { setCheckoutBoosting } from '../../state/checkoutDetail/action';

function Checkout(props: any) {
    const {
        orderType, addOns, form, game,
    } = props;

    const { boostDetail, addonsDetail, price } = useAppSelector((states) => states);
    const dispatch = useAppDispatch();

    const [overviewDetails, setOverviewDetails] = useState<any>([]);

    function setupOverview() {
        const overviews = form?.map((overview) => overview.type);
        const count = {};

        overviews?.forEach((overview) => {
            count[overview] = (count[overview] || 0) + 1;
        });

        setOverviewDetails(count);
    }

    function setAddOns(addon) {
        dispatch(setAddOnsDetail(addon));
    }

    // Target hari ini
    function getDataCheckout() {
        const data = {
            total_price: price,
            game,
            type: orderType,
            add_ons: addonsDetail,
            require: [],
        };

        if (data.add_ons.length === 0) {
            data.add_ons = [{
                name: 'None',
                percentage_price: 0,
            }];
        }

        const tempRequire: any = [];

        boostDetail?.forEach((detail) => {
            let require;
            if (detail.title === 'platform') {
                require = { platform: 'PC' };
            } else {
                require = {
                    [detail.title.toLowerCase().split(' ').join('_')]: detail[detail.title.toLowerCase().split(' ').join('_')] || detail.name || detail.numberGame || detail.server || detail[detail.title].name || { start: detail[detail.title].start, to: detail[detail.title].to },
                };
            }
            tempRequire.push(require);
        });
        data.require = tempRequire;
        dispatch(setCheckoutBoosting((data)));
    }

    function getPrice() {
        dispatch(asyncCalculatePrice(game, orderType));
    }

    useEffect(() => {
        getPrice();
    }, [boostDetail, addonsDetail]);

    useEffect(() => {
        setupOverview();
        getPrice();
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
                    <DoubleIncludeRank details={boostDetail} />
                )}
                {overviewDetails?.apexIncludeRank === 2 && (
                    <DoubleIncludeRank details={boostDetail} />
                )}
                {overviewDetails?.includeRank === 1 && overviewDetails?.gameNumber === 1 && (
                    <RankAndGame details={boostDetail} />
                )}
                {overviewDetails?.includeRank === undefined && overviewDetails?.gameNumber === 1 && (
                    <NumberGame details={boostDetail} />
                )}
                {overviewDetails.points > 0 && (
                    <Point details={boostDetail} />
                )}
            </Row>

            <Row className="mt-5 mb-4 fullwidth">
                <div className="fullwidth">
                    {addOns?.map((item) => (
                        <OptionalAddons key={item.name} data={item} game={game} getAddOns={setAddOns} />
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
                    {price === 0 || price === '--' ? (
                        <div>
                            <button type="button" className="button capsule btn-disable">Pay Now</button>
                        </div>
                    ) : (
                        <Link href="/payment">
                            <button type="button" className="button capsule" onClick={() => getDataCheckout()}>Pay Now</button>
                        </Link>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default Checkout;
