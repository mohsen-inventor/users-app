import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootSaga from './ShoppingCart/cartSaga';
import userReducer from './userReducer';

// Persist config
const persistConfig = {
    key: 'root',
    storage,
};

// Root reducer
const rootReducer = combineReducers({
    user: userReducer,
});

// Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Saga
const sagaMiddleware = createSagaMiddleware();

// Store
let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// Run Saga
sagaMiddleware.run(rootSaga);

// Persist store
let persistor = persistStore(store);

// Export
export type AppState = ReturnType<typeof rootReducer>;
export { store, persistor };
