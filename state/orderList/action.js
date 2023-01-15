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
function asyncUserGetBoostOrder() {
    return async (dispatch) => {
        try {
            const boostOrder = await api.userGetOrder();
            dispatch(getBoostOrderAction(boostOrder.boost_order));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncUserGetAccountOrder() {
    return async (dispatch) => {
        try {
            const boostOrder = await api.userGetOrder();
            dispatch(getBoostOrderAction(boostOrder.account_order));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncBoosterGetBoostOrder() {
    return async (dispatch) => {
        try {
            const boostOrder = await api.boosterGetBoost();
            dispatch(getBoostOrderAction(boostOrder));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncAdminGetBoostOrder() {
    return async (dispatch) => {
        try {
            const boostOrder = await api.adminGetBoost();
            dispatch(getBoostOrderAction(boostOrder));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncAdminGetAccountOrder() {
    return async (dispatch) => {
        try {
            const accountOrder = await api.adminGetAccount();
            dispatch(getAccountOrderAction(accountOrder));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncUserMakeReview(data) {
    return async () => {
        try {
            const review = await api.userMakeReview(data);
            console.log(review);
        } catch (err) {
            console.log(err.message);
        }
    };
}

export {
    ActionType, asyncUserGetBoostOrder, asyncUserGetAccountOrder, asyncBoosterGetBoostOrder, asyncAdminGetBoostOrder, asyncAdminGetAccountOrder, asyncUserMakeReview,
};
