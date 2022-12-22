/* eslint-disable no-alert */
const ActionType = {
    GET_DETAIL_ACCOUNT: 'GET_DETAIL_ACCOUNT',
    RESET_DETAIL_ACCOUNT: 'RESET_DETAIL_ACCOUNT',
};

// Action
function getDetailAccountAction(accountDetail) {
    return {
        type: ActionType.GET_DETAIL_ACCOUNT,
        payload: {
            accountDetail,
        },
    };
}

function resetDetailAccountAction() {
    return {
        type: ActionType.RESET_DETAIL_ACCOUNT,
    };
}

// Middleware
function resetDetailAccount() {
    return (dispatch) => {
        dispatch(resetDetailAccountAction());
    };
}

function getDetailAccount(accountDetail) {
    return (dispatch) => {
        try {
            dispatch(resetDetailAccount());
            dispatch(getDetailAccountAction(accountDetail));
        } catch (err) {
            alert(err.message);
        }
    };
}

export { ActionType, getDetailAccount };
