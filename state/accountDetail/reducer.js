/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function accountDetailReducer(accountDetail = {}, action = {}) {
    switch (action.type) {
        case (ActionType.GET_DETAIL_ACCOUNT):
            return accountDetail = action.payload.accountDetail;
        case (ActionType.RESET_DETAIL_ACCOUNT):
            return accountDetail = {};
        default:
            return accountDetail;
    }
}
