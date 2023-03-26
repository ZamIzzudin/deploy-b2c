/* eslint-disable camelcase */
const ActionType = {
    SETUP_BOOST_DETAIL: 'SETUP_BOOST_DETAIL',
    EDIT_BOOST_DETAIL: 'EDIT_BOOST_DETAIL',
};

// Action
function setupBoostDetailAction(boost_detail = []) {
    return {
        type: ActionType.SETUP_BOOST_DETAIL,
        payload: {
            boost_detail,
        },
    };
}

function editBoostDetailAction(data, title) {
    return {
        type: ActionType.EDIT_BOOST_DETAIL,
        payload: {
            data,
            title,
        },
    };
}

// Middleware
function setupBoostiDetail(requireOrder) {
    return (dispatch, getState) => {
        const { servers } = getState();

        const boost_detail = requireOrder?.map((item) => {
            if (item.type === 'ListForm' || item.type === 'NestedListForm') {
                const typeForm = { title: `${item.unit}` };
                typeForm[item.unit] = undefined;
                return typeForm;
            }
            if (item.type === 'points') {
                const typeForm = { title: `${item.unit}` };
                typeForm[item.unit] = undefined;
                return typeForm;
            }
            const typeForm = { title: item.title };
            typeForm[item.title] = undefined;
            return typeForm;
        });

        if (servers.length > 0) {
            boost_detail?.push({ title: 'server', server: servers[0].name });
        }

        dispatch(setupBoostDetailAction(boost_detail));
    };
}

function editBoostDetail(data, title) {
    return (dispatch) => {
        dispatch(editBoostDetailAction(data, title));
    };
}

export { ActionType, setupBoostiDetail, editBoostDetail };
