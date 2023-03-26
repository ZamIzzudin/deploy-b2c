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
        let is_valid = true;
        const slugGameName = game.name?.toLowerCase().replace(/ /g, '-');
        let slugServiceName = service?.toLowerCase().replace(/ /g, '-');

        const { boostDetail, addonsDetail } = getState();

        if (service?.includes('+')) {
            slugServiceName = service?.toLowerCase().replace(/ /g, '').replace('+', '-');
        }

        const orderDetail = {
            add_ons: addonsDetail.length > 0 ? addonsDetail : [{ name: 'none', percentage_price: 0 }],
            boost_detail: boostDetail.length > 0 ? {} : null,
        };

        boostDetail.forEach((boost) => {
            if (boost[boost.title] === undefined) {
                if (boost.title === 'platform') {
                    orderDetail.boost_detail[boost.title.toLowerCase().split(' ').join('_')] = 'PC';
                } else {
                    is_valid = false;
                }
            } else {
                orderDetail.boost_detail[boost.title.toLowerCase().split(' ').join('_')] = boost[boost.title]?.name || boost[boost.title];
            }
        });

        try {
            if (service !== undefined && orderDetail.boost_detail !== null && is_valid) {
                const { total_price } = await (await api.calculatePrice(slugGameName, slugServiceName, orderDetail)).data;
                dispatch(calculatePriceAction(total_price));
            }
        } catch (err) {
            dispatch(resetPriceAction());
        }
    };
}

export { ActionType, asyncCalculatePrice };
