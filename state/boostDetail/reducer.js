/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { ActionType } from './action';

export default function boostDetailReducer(boostDetail = [], action = {}) {
    switch (action.type) {
        case (ActionType.SETUP_BOOST_DETAIL):
            return boostDetail = action.payload.boost_detail;
        case (ActionType.EDIT_BOOST_DETAIL):
            return boostDetail.map((detail) => {
                if (detail.title === action.payload.title) {
                    return {
                        ...detail,
                        [action.payload.title]: action.payload.data,
                    };
                }
                return detail;
            });
        default:
            return boostDetail;
    }
}
