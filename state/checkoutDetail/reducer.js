/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function checkoutDetailReducer(checkoutDetail = {}, action = {}) {
    switch (action.type) {
        case (ActionType.GET_DETAIL_ORDER_ACCOUNT):
            return checkoutDetail = action.payload.accountDetail;
        case (ActionType.GET_DETAIL_BOOSTING):
            return checkoutDetail = action.payload.boostDetail;
        case (ActionType.CHECK_CHECKOUT_DETAIL):
            return checkoutDetail = action.payload.checkoutDetail;
        default:
            return checkoutDetail;
    }
}
