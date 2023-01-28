/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import api from '../../utils/api';
import { asyncAdminGetAccountOrder } from '../orderList/action';
import { asyncAdminGetAllAccountByFilter } from '../accounts/action';

function giveCredential(id) {
    return async (dispatch) => {
        await api.adminChangeStatusAccountOrder(id);

        dispatch(asyncAdminGetAccountOrder());
    };
}

// Add Account
function makeAccountOnMarket(data) {
    return async (dispatch) => {
        await api.makeAccount(data);

        dispatch(asyncAdminGetAllAccountByFilter());
    };
}

function editAccountOnMarket(data, id) {
    return async (dispatch) => {
        await api.editAccount(data, id);

        dispatch(asyncAdminGetAllAccountByFilter());
    };
}

function deleteAccountOnMarket(id) {
    return async (dispatch) => {
        await api.deleteAccount(id);

        dispatch(asyncAdminGetAllAccountByFilter());
    };
}

// Make Booster

//

export {
    giveCredential, makeAccountOnMarket, editAccountOnMarket, deleteAccountOnMarket,
};
