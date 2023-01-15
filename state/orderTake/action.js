/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import api from '../../utils/api';

const ActionType = {
    GET_ALL_ORDER_TO_TAKE: 'GET_ALL_ORDER_TO_TAKE',
    TAKE_AN_ORDER: 'TAKE_AN_ORDER',
};

// Action
function getOrderToTake(orders) {
    return {
        type: ActionType.GET_ALL_ORDER_TO_TAKE,
        payload: {
            orders,
        },
    };
}

function getTakeOrder(orders) {
    return {
        type: ActionType.TAKE_AN_ORDER,
        payload: {
            orders,
        },
    };
}

// Middleware
function asyncGetAllOrderToTake() {
    return async (dispatch) => {
        try {
            const orders = await api.boosterSeeAvailableOrder();
            dispatch(getOrderToTake(orders));
        } catch (err) {
            console.log(err);
        }
    };
}

function asyncTakeOrder(id) {
    return async (dispatch) => {
        try {
            await api.boosterTakeOrder(id);

            const orders = await api.boosterSeeAvailableOrder();
            dispatch(getTakeOrder(orders));
        } catch (err) {
            console.log(err);
        }
    };
}

export { ActionType, asyncGetAllOrderToTake, asyncTakeOrder };
