const ActionType = {
    IS_ERROR: 'IS_ERROR',
};

// Action
function showErrorPageAction() {
    return {
        type: ActionType.IS_ERROR,
    };
}

// Middleware
function handleShowErrorPage() {
    return (dispatch) => {
        dispatch(showErrorPageAction());
    };
}

export { ActionType, handleShowErrorPage };
