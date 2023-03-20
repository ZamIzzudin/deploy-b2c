/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import api from '../../utils/api';
import { asyncAdminGetAccountOrder, asyncAdminGetBoostOrder } from '../orderList/action';
import { asyncAdminGetAllAccountByFilter } from '../accounts/action';

function giveCredential(id) {
    return async (dispatch) => {
        await api.adminChangeStatusAccountOrder(id, 'finished');

        dispatch(asyncAdminGetAccountOrder());
    };
}

function changeAllAccountStatus(id, status) {
    return async (dispatch) => {
        await api.adminChangeStatusAccountOrder(id, status);

        dispatch(asyncAdminGetAccountOrder());
    };
}

function changeAllAccountBoost(id, status) {
    return async (dispatch) => {
        await api.adminChangeStatusBoostOrder(id, status);

        dispatch(asyncAdminGetBoostOrder());
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
    giveCredential, makeAccountOnMarket, editAccountOnMarket, deleteAccountOnMarket, changeAllAccountStatus, changeAllAccountBoost,
};
