/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import api from '../../utils/api';

const ActionType = {
    CALCULATE_BOOST_PRICE: 'CALCULATE_BOOST_PRICE',
    RESET_BOOST_PRICE: 'RESET_BOOST_PRICE',
};

// Action
function calculatePriceAction(price) {
    return {
        type: ActionType.CALCULATE_BOOST_PRICE,
        payload: {
            price,
        },
    };
}

function resetPriceAction() {
    return {
        type: ActionType.RESET_BOOST_PRICE,
    };
}

// Middleware
function asyncCalculatePrice(game, service) {
    return async (dispatch, getState) => {
        const slugGameName = game.name?.toLowerCase().replace(/ /g, '-');
        let slugServiceName = service?.toLowerCase().replace(/ /g, '-');

        const { boostDetail, addonsDetail } = getState();

        if (service?.includes('+')) {
            slugServiceName = service?.toLowerCase().replace(/ /g, '').replace('+', '-');
        }

        const orderDetail = {
            add_ons: addonsDetail.length > 0 ? addonsDetail : [{ name: 'none', percentage_price: 0 }],
            boost_detail: {},
        };

        if (service === 'Apex Rank Boost') {
            boostDetail.forEach((boost, index) => {
                if (boost.title === 'Current Rank' && boost[boost.title]?.name.includes('master')) {
                    orderDetail.boost_detail[boost.title.toLowerCase().split(' ').join('_')] = 'master';
                } else if (boost.title === 'Desired Rank' && boost[boost.title]?.name.includes('master')) {
                    const data = boost[boost.title]?.name.split('_');
                    let data2;

                    if (boostDetail[index - 1]['Current Rank']?.name.includes('master')) {
                        data2 = boostDetail[index - 1]['Current Rank']?.name.split('_');
                    } else {
                        data2 = [0, 0];
                    }

                    const count = data[1] - data2[1];

                    if (count === 0) {
                        orderDetail.boost_detail[boost.title.toLowerCase().split(' ').join('_')] = 'master';
                    } else {
                        orderDetail.boost_detail[boost.title.toLowerCase().split(' ').join('_')] = `${count}_K`;
                    }
                } else {
                    orderDetail.boost_detail[boost.title.toLowerCase().split(' ').join('_')] = boost[boost.title]?.name || boost[boost.title];
                }
            });
        } else {
            boostDetail.forEach((boost) => {
                orderDetail.boost_detail[boost.title.toLowerCase().split(' ').join('_')] = boost[boost.title]?.name || boost[boost.title];
            });
        }

        try {
            if (service !== undefined) {
                const { total_price } = await (await api.calculatePrice(slugGameName, slugServiceName, orderDetail)).data;
                dispatch(calculatePriceAction(total_price));
            }
        } catch (err) {
            dispatch(resetPriceAction());
        }
    };
}

export { ActionType, asyncCalculatePrice };
