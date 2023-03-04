/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function errorReducer(error = { page: false, message: false }, action = {}) {
    switch (action.type) {
        case (ActionType.IS_ERROR):
            return error = { page: true, message: false };
        case (ActionType.MSG_ERROR):
            return error = { page: false, message: true };
        default:
            return error;
    }
}
