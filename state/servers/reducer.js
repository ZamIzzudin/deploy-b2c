/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function serversReducer(servers = [], action = {}) {
    switch (action.type) {
        case (ActionType.GET_ALL_SERVERS):
            return servers = action.payload.servers;
        case (ActionType.GET_ALL_SERVERS_BY_GAME):
            return servers = action.payload.servers ? action.payload.servers : servers;
        default:
            return servers;
    }
}
