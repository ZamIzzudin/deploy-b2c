/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import api from '../../utils/api';
import { handleShowErrorPage } from '../errorHandle/action';

const ActionType = {
    GET_ALL_SERVERS: 'GET_ALL_SERVERS',
    GET_ALL_SERVERS_BY_GAME: 'GET_ALL_SERVERS_BY_GAME',
};

// Action
function getAllServersAction(servers) {
    return {
        type: ActionType.GET_ALL_SERVERS,
        payload: {
            servers,
        },
    };
}

function getAllServersByGameAction(servers) {
    return {
        type: ActionType.GET_ALL_SERVERS_BY_GAME,
        payload: {
            servers,
        },
    };
}

// Middleware
function asyncGetAllServers() {
    return async (dispatch) => {
        try {
            const servers = await (await api.getAllServers()).data.data;
            dispatch(getAllServersAction(servers));
        } catch (err) {
            dispatch(handleShowErrorPage());
        }
    };
}

function asyncGetAllServersByGame(game) {
    return async (dispatch) => {
        const slugGameName = game.replace(/[^a-zA-Z0-9,\-.?! ]/g, '-').replace(/\s/g, '-').toLowerCase();
        try {
            const { servers } = await (await api.getServicesPerGame(slugGameName)).data;
            dispatch(getAllServersByGameAction(servers));
        } catch (err) {
            dispatch(handleShowErrorPage());
        }
    };
}

export { ActionType, asyncGetAllServers, asyncGetAllServersByGame };
