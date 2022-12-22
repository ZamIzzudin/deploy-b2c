/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import api from '../../utils/api';
import { handleShowErrorPage } from '../errorHandle/action';

const ActionType = {
    GET_SERVICES_PER_GAME: 'GET_SERVICE_PER_GAME',
};

// Action
function getServicesPerGameAction(services) {
    return {
        type: ActionType.GET_SERVICES_PER_GAME,
        payload: {
            services,
        },
    };
}

// Middleware
function asyncGetServicesPerGame(game) {
    return async (dispatch) => {
        const slugGameName = game.replace(/[^a-zA-Z0-9,\-.?! ]/g, '-').replace(/\s/g, '-').toLowerCase();
        try {
            const { boost_options } = await (await api.getServicesPerGame(slugGameName)).data;
            dispatch(getServicesPerGameAction(boost_options));
        } catch (err) {
            dispatch(handleShowErrorPage());
        }
    };
}

export { ActionType, asyncGetServicesPerGame };
