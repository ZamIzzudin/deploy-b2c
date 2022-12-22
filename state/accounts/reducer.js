/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function accountsReducer(accounts = {}, action = {}) {
    switch (action.type) {
        case (ActionType.GET_ALL_ACCOUNTS):
            return accounts = action.payload.accounts;
        default:
            return accounts;
    }
}
