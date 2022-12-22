/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function errorReducer(error = false, action = {}) {
    switch (action.type) {
        case (ActionType.IS_ERROR):
            return error = true;
        default:
            return error;
    }
}
