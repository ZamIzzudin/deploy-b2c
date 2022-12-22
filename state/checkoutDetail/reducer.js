/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function checkoutDetailReducer(checkoutDetail = {}, action = {}) {
    switch (action.type) {
        case (ActionType.ACCOUNT_CHEAKOUT):
            return checkoutDetail = action.payload.accountDetail;
        case (ActionType.BOOSTING_CHEAKOUT):
            return checkoutDetail = action.payload.boostDetail;
        default:
            return checkoutDetail;
    }
}
