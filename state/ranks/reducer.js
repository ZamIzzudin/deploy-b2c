/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function ranksReducer(ranks = [], action = {}) {
    switch (action.type) {
        case (ActionType.GET_ALL_RANKS_BY_GAME):
            return ranks = action.payload.ranks;
        default:
            return ranks;
    }
}
