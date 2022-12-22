/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function orderListReducer(orderList = [], action = {}) {
    switch (action.type) {
        case (ActionType.GET_BOOST_ORDER):
            return orderList = action.payload.boostOrder;
        case (ActionType.GET_ACCOUNT_ORDER):
            return orderList = action.payload.accountOrder;
        default:
            return orderList;
    }
}
