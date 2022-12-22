/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function priceReducer(price = 0, action = {}) {
    switch (action.type) {
        case (ActionType.CALCULATE_BOOST_PRICE):
            return price = action.payload.price;
        case (ActionType.RESET_BOOST_PRICE):
            return price = '--';
        default:
            return price;
    }
}
