/* eslint-disable no-param-reassign */
const ActionType = {
    GET_ADD_ONS_DETAIL: 'GET_ADD_ONS_DETAIL',
    REMOVE_ADD_ONS_DETAIL: 'REMOVE_ADD_ONS_DETAIL',
    SETUP_ADD_ONS_DETAIL: 'SETUP_ADD_ONS_DETAIL',
};

// Action
function getAddOnsDetailAction(addonsDetail) {
    return {
        type: ActionType.GET_ADD_ONS_DETAIL,
        payload: {
            addonsDetail,
        },
    };
}

function removeAddOnsDetailAction(addonsDetail) {
    return {
        type: ActionType.REMOVE_ADD_ONS_DETAIL,
        payload: {
            addonsDetail,
        },
    };
}

function setupAddOnsDetailAction() {
    return {
        type: ActionType.SETUP_ADD_ONS_DETAIL,
    };
}

// Middleware
function setAddOnsDetail(addons) {
    return (dispatch, getState) => {
        const { addonsDetail } = getState();
        let newAddons = false;

        if (addonsDetail.length === 0) {
            newAddons = true;
        }

        addonsDetail.forEach((item) => {
            if (item.name.includes(addons.name)) {
                newAddons = false;
            } else {
                newAddons = true;
            }
        });

        if (newAddons) {
            dispatch(getAddOnsDetailAction(addons));
        } else {
            dispatch(removeAddOnsDetailAction(addons));
        }
    };
}

function setupAddOnsDetail() {
    return (dispatch) => {
        dispatch(setupAddOnsDetailAction());
    };
}

export { ActionType, setupAddOnsDetail, setAddOnsDetail };
