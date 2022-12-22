/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function servicesReducer(services = [], action = {}) {
    switch (action.type) {
        case (ActionType.GET_SERVICES_PER_GAME):
            return services = action.payload.services;
        default:
            return services;
    }
}
