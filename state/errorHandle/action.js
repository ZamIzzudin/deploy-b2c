const ActionType = {
    IS_ERROR: 'IS_ERROR',
    MSG_ERROR: 'MSG_ERROR',
    NOT_ERROR: 'NOT_ERROR',
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

function hideErrorMessageAction() {
    return {
        type: ActionType.NOT_ERROR,
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

function handleHideError() {
    return (dispatch) => {
        dispatch(hideErrorMessageAction());
    };
}

export {
    ActionType, handleShowErrorPage, handleShowErrorMessage, handleHideError,
};
