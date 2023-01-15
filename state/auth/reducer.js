/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function authReducer(auth = { user: { emailVerified: false }, role: null }, action = {}) {
    switch (action.type) {
        case ActionType.LOGIN:
            return auth = action.payload;
        case ActionType.CHECK_AUTH:
            return auth = action.payload;
        case ActionType.REGISTER:
            return auth = action.payload;
        case ActionType.LOGOUT:
            return auth = action.payload;
        default:
            return auth;
    }
}
