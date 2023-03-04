const ActionType = {
    IS_ERROR: 'IS_ERROR',
    MSG_ERROR: 'MSG_ERROR',
};

// Action
function showErrorPageAction() {
    return {
        type: ActionType.IS_ERROR,
    };
}

function showErrorMessageAction() {
    return {
        type: ActionType.MSG_ERROR,
    };
}

// Middleware
function handleShowErrorPage() {
    return (dispatch) => {
        dispatch(showErrorPageAction());
    };
}

function handleShowErrorMessage() {
    return (dispatch) => {
        dispatch(showErrorMessageAction());
    };
}

export { ActionType, handleShowErrorPage, handleShowErrorMessage };
