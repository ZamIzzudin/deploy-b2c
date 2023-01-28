/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { handleShowErrorPage } from '../errorHandle/action';
import api from '../../utils/api';

const ActionType = {
    GET_ALL_ACCOUNTS: 'GET_ALL_ACCOUNTS',
};

// Action
function getAllAccountAction(accounts) {
    return {
        type: ActionType.GET_ALL_ACCOUNTS,
        payload: {
            accounts,
        },
    };
}

// Middleware

function asyncAdminGetAllAccountByFilter(page = 1, sort = 'asc', rank = 'All', server = 'All') {
    return async (dispatch) => {
        try {
            const { accounts } = await (await api.getAdminAllAccountsMarket(page, sort, rank, server)).data;
            dispatch(getAllAccountAction(accounts));
        } catch (err) {
            dispatch(handleShowErrorPage());
        }
    };
}

function asyncGetAllAccountByFilter(page = 1, sort = 'asc', rank = 'All', server = 'All') {
    return async (dispatch) => {
        try {
            const { accounts } = await (await api.getAllAccountsMarketByFilter(page, sort, rank, server)).data;
            dispatch(getAllAccountAction(accounts));
        } catch (err) {
            dispatch(handleShowErrorPage());
        }
    };
}
export {
    ActionType,
    asyncAdminGetAllAccountByFilter,
    asyncGetAllAccountByFilter,
};
