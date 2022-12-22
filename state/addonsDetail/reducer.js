/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { ActionType } from './action';

export default function addonsDetailReducer(addonsDetail = [], action = {}) {
    switch (action.type) {
        case (ActionType.SETUP_ADD_ONS_DETAIL):
            return addonsDetail = [];
        case (ActionType.GET_ADD_ONS_DETAIL):
            return addonsDetail.concat(action.payload.addonsDetail);
        case (ActionType.REMOVE_ADD_ONS_DETAIL):
            return addonsDetail.filter((addons) => !addons.name.includes(action.payload.addonsDetail.name));
        default:
            return addonsDetail;
    }
}
