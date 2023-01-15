/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import api from '../../utils/api';

const ActionType = {
    GET_FAQ: 'GET_FAQ',
    CREATE_FAQ: 'CREATE_FAQ',
    EDIT_FAQ: 'EDIT_FAQ',
    REMOVE_FAQ: 'REMOVE_FAQ',
};

function getFAQAction(faq) {
    return {
        type: ActionType.GET_FAQ,
        payload: {
            faq,
        },
    };
}

function createFAQAction(faq) {
    return {
        type: ActionType.CREATE_FAQ,
        payload: {
            faq,
        },
    };
}

function removeFAQAction(faq) {
    return {
        type: ActionType.REMOVE_FAQ,
        payload: {
            faq,
        },
    };
}

function editFAQAction(faq) {
    return {
        type: ActionType.EDIT_FAQ,
        payload: {
            faq,
        },
    };
}

// Middleware
function asyncGetAllFAQ() {
    return async (dispatch) => {
        const response = await api.getFAQ();

        dispatch(getFAQAction(response));
    };
}

function asyncCreateAllFAQ(data) {
    return async (dispatch) => {
        await api.makeFAQ(data);

        const response = await api.getFAQ();

        dispatch(createFAQAction(response));
    };
}

function asyncEditAllFAQ(id, data) {
    return async (dispatch) => {
        await api.editFAQ(id, data);

        const response = await api.getFAQ();

        dispatch(editFAQAction(response));
    };
}

function asyncRemoveAllFAQ(id) {
    return async (dispatch) => {
        await api.removeFAQ(id);

        const response = await api.getFAQ();

        dispatch(removeFAQAction(response));
    };
}

export {
    ActionType, asyncGetAllFAQ, asyncCreateAllFAQ, asyncEditAllFAQ, asyncRemoveAllFAQ,
};
