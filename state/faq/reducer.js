/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { ActionType } from './action';

export default function FAQReducer(faq = [], action = {}) {
    switch (action.type) {
        case ActionType.GET_FAQ:
            return faq = action.payload.faq;
        case ActionType.CREATE_FAQ:
            return faq = action.payload.faq;
        case ActionType.EDIT_FAQ:
            return faq = action.payload.faq;
        case ActionType.REMOVE_FAQ:
            return faq = action.payload.faq;
        default:
            return faq;
    }
}
