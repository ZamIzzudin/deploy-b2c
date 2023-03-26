/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import api from '../../utils/api';
import { handleShowErrorPage } from '../errorHandle/action';

const ActionType = {
    GET_ALL_RANKS_BY_GAME: 'GET_ALL_RANKS_BY_GAME',
};

// Action
function getAllRanksByGameAction(ranks) {
    return {
        type: ActionType.GET_ALL_RANKS_BY_GAME,
        payload: {
            ranks,
        },
    };
}

// Middleware
function asyncGetAllRanksByGame(game) {
    return async (dispatch) => {
        const slugGameName = game.replace(/[^a-zA-Z0-9,\-.?! ]/g, '-').replace(/\s/g, '-').toLowerCase();
        try {
            const { ranks } = await (await api.getServicesPerGame(slugGameName)).data;
            if (ranks !== undefined) {
                dispatch(getAllRanksByGameAction(ranks));
            } else {
                dispatch(getAllRanksByGameAction([]));
            }
        } catch (err) {
            dispatch(handleShowErrorPage());
        }
    };
}

export { ActionType, asyncGetAllRanksByGame };
