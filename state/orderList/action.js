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
function asyncUserGetBoostOrder(page = 1) {
    return async (dispatch) => {
        try {
            const boostOrder = await api.userGetBoostOrder(page);

            const order = {
                ...boostOrder.boost_order,
                data: boostOrder.boost_order.data.concat(boostOrder.finished_boost_order.data) || [],
            };
            dispatch(getBoostOrderAction(order));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncUserGetAccountOrder(page = 1) {
    return async (dispatch) => {
        try {
            const boostOrder = await api.userGetAccountOrder(page);
            const order = {
                ...boostOrder.account_order,
                data: boostOrder.account_order.data.concat(boostOrder.finished_account_order.data) || [],
            };
            dispatch(getBoostOrderAction(order));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncBoosterGetBoostOrder(page = 1) {
    return async (dispatch) => {
        try {
            const boostOrder = await api.boosterGetBoost(page);
            dispatch(getBoostOrderAction(boostOrder));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncAdminGetBoostOrder(page = 1) {
    return async (dispatch) => {
        try {
            const boostOrder = await api.adminGetBoost(page);
            dispatch(getBoostOrderAction(boostOrder));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncAdminGetAccountOrder(page = 1) {
    return async (dispatch) => {
        try {
            const accountOrder = await api.adminGetAccount(page);
            dispatch(getAccountOrderAction(accountOrder));
        } catch (err) {
            console.log(err.message);
        }
    };
}

function asyncUserMakeReview(data, type) {
    return async (dispatch) => {
        try {
            await api.userMakeReview(data);
            if (type === 'Boost') {
                dispatch(asyncUserGetBoostOrder());
            } else {
                dispatch(asyncUserGetAccountOrder());
            }
        } catch (err) {
            console.log(err.message);
        }
    };
}

export {
    ActionType, asyncUserGetBoostOrder, asyncUserGetAccountOrder, asyncBoosterGetBoostOrder, asyncAdminGetBoostOrder, asyncAdminGetAccountOrder, asyncUserMakeReview,
};
