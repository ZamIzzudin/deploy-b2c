/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { ActionType } from './action';

export default function gamesReducer(games = [], action = {}) {
    switch (action.type) {
        case (ActionType.GET_ALL_GAMES):
            return games = action.payload.games;
        default:
            return games;
    }
}
