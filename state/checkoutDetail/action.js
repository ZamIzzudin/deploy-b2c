/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-alert */
import api from '../../utils/api';
import { handleShowErrorPage } from '../errorHandle/action';

const ActionType = {
    GET_DETAIL_ORDER_ACCOUNT: 'GET_DETAIL_ORDER_ACCOUNT',
    GET_DETAIL_BOOSTING: 'GET_DETAIL_BOOSTING',
    CHECK_CHECKOUT_DETAIL: 'CHECK_CHECKOUT_DETAIL',
};

// Action
function setCheckoutAccountAction(accountDetail) {
    return {
        type: ActionType.GET_DETAIL_ORDER_ACCOUNT,
        payload: {
            accountDetail,
        },
    };
}

function setCheckoutBoostingAction(boostDetail) {
    return {
        type: ActionType.GET_DETAIL_BOOSTING,
        payload: {
            boostDetail,
        },
    };
}

function checkCheckoutDetailAction(checkoutDetail) {
    return {
        type: ActionType.CHECK_CHECKOUT_DETAIL,
        payload: {
            checkoutDetail,
        },
    };
}

// Middleware
function setCheckoutAccount(accountDetail) {
    return (dispatch) => {
        try {
            const checkoutAccountDetail = {
                id_account: accountDetail.id,
                total_price: accountDetail.price,
                service: 'Market',
                type: 'Valorant Account',
                rank: accountDetail.current_rank.id,
                game: {
                    id: 2,
                    name: 'Valorant',
                    logo_url: 'http://ec2-54-219-168-219.us-west-1.compute.amazonaws.com/storage/images/game-logo/valo.png',
                },
            };
            sessionStorage.setItem('checkoutData', JSON.stringify(checkoutAccountDetail));
            dispatch(setCheckoutAccountAction(checkoutAccountDetail));
        } catch (err) {
            alert(err.message);
        }
    };
}

function setCheckoutBoosting(boostingDetail) {
    return (dispatch) => {
        const checkoutBoostDetail = {
            service: 'Boosting',
            type: boostingDetail.type,
            game: boostingDetail.game,
            total_price: boostingDetail.total_price,
            require: boostingDetail.require,
            add_ons: boostingDetail.add_ons,
        };
        sessionStorage.setItem('checkoutData', JSON.stringify(checkoutBoostDetail));
        dispatch(setCheckoutBoostingAction(checkoutBoostDetail));
    };
}

function checkCheckoutDetail() {
    return (dispatch) => {
        const data = sessionStorage.getItem('checkoutData');
        dispatch(checkCheckoutDetailAction(JSON.parse(data)));
    };
}

function asyncMakeBoostOrder(form, serviceRequire, serviceName) {
    return async (dispatch) => {
        try {
            const slugServiceName = serviceName.toLowerCase().replace(/ /g, '-');
            await api.makeBoostOrder(form, serviceRequire, slugServiceName);
        } catch (err) {
            dispatch(handleShowErrorPage());
        }
    };
}

function asyncMakeAccountOrder(form, accountId) {
    return async (dispatch) => {
        try {
            await api.checkoutAccountOrder(form, accountId);
        } catch (err) {
            dispatch(handleShowErrorPage());
        }
    };
}

export {
    ActionType, setCheckoutAccount, setCheckoutBoosting, checkCheckoutDetail, asyncMakeBoostOrder, asyncMakeAccountOrder,
};
