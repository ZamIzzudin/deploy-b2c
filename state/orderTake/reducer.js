/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function orderTakeReducer(orderTake = [], action = {}) {
    switch (action.type) {
        case ActionType.GET_ALL_ORDER_TO_TAKE:
            return orderTake = action.payload.orders;
        case ActionType.TAKE_AN_ORDER:
            return orderTake = action.payload.orders;
        default:
            return orderTake;
    }
}
