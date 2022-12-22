/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import api from '../../utils/api';

const ActionType = {
    GET_BOOST_ORDER: 'GET_BOOST_ORDER',
    GET_ACCOUNT_ORDER: 'GET_ACCOUNT_ORDER',
};

// Action
function getBoostOrderAction(boostOrder) {
    return {
        type: ActionType.GET_BOOST_ORDER,
        payload: {
            boostOrder,
        },
    };
}

function getAccountOrderAction(accountOrder) {
    return {
        type: ActionType.GET_ACCOUNT_ORDER,
        payload: {
            accountOrder,
        },
    };
}

// Middleware
function asyncUserGetBoostOrder(token) {
    return async (dispatch) => {
        try {
            const boostOrder = await api.userGetBoost(token);
            dispatch(getBoostOrderAction(boostOrder));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncUserGetAccountOrder(token) {
    return async (dispatch) => {
        try {
            const accountOrder = await api.userGetAccount(token);
            dispatch(getAccountOrderAction(accountOrder));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncBoosterGetBoostOrder(token) {
    return async (dispatch) => {
        try {
            const boostOrder = await api.boosterGetBoost(token);
            dispatch(getBoostOrderAction(boostOrder));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncAdminGetBoostOrder(token) {
    return async (dispatch) => {
        try {
            const boostOrder = await api.adminGetBoost(token);
            dispatch(getBoostOrderAction(boostOrder));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncAdminGetAccountOrder(token) {
    return async (dispatch) => {
        try {
            const accountOrder = await api.adminGetAccount(token);
            dispatch(getAccountOrderAction(accountOrder));
        } catch (err) {
            console.log(err.message);
        }
    };
}

export {
    ActionType, asyncUserGetBoostOrder, asyncUserGetAccountOrder, asyncBoosterGetBoostOrder, asyncAdminGetBoostOrder, asyncAdminGetAccountOrder,
};
