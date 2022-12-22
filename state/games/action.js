/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import api from '../../utils/api';
import { handleShowErrorPage } from '../errorHandle/action';

const ActionType = {
    GET_ALL_GAMES: 'GET_ALL_GAMES',
};

// Action
function getAllGamesAction(games) {
    return {
        type: ActionType.GET_ALL_GAMES,
        payload: {
            games,
        },
    };
}

// Middleware
function asyncGetAllGames() {
    return async (dispatch) => {
        try {
            const games = await (await api.getAllGames()).data.data;
            dispatch(getAllGamesAction(games));
        } catch (err) {
            dispatch(handleShowErrorPage());
        }
    };
}

export { ActionType, asyncGetAllGames };
