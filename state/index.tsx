import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/reducer';
import gamesReducer from './games/reducer';
import accountsReducer from './accounts/reducer';
import ranksReducer from './ranks/reducer';
import serversReducer from './servers/reducer';
import accountDetailReducer from './accountDetail/reducer';
import checkoutDetailReducer from './checkoutDetail/reducer';
import servicesReducer from './services/reducer';
import boostDetailReducer from './boostDetail/reducer';
import addonsDetailReducer from './addonsDetail/reducer';
import priceReducer from './price/reducer';
import orderListReducer from './orderList/reducer';
import orderTakeReducer from './orderTake/reducer';
import FAQReducer from './faq/reducer';
import errorReducer from './errorHandle/reducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        games: gamesReducer,
        accounts: accountsReducer,
        ranks: ranksReducer,
        servers: serversReducer,
        services: servicesReducer,
        boostDetail: boostDetailReducer,
        accountDetail: accountDetailReducer,
        addonsDetail: addonsDetailReducer,
        checkoutDetail: checkoutDetailReducer,
        price: priceReducer,
        orderList: orderListReducer,
        orderTake: orderTakeReducer,
        faq: FAQReducer,
        error: errorReducer,
    },
});

export { store };

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
