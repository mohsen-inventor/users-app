import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { UserState, UserAction } from './userType';
import rootSaga from './userSaga';
import userReducer from './userReducer';

// Store types
interface RootReducer {
    user: UserState;
}

// Persist config
const persistConfig = {
    key: 'root',
    storage,
};

// Root reducer
const rootReducer = combineReducers<RootReducer>({
    user: userReducer,
});

// Persist reducer
const persistedReducer = persistReducer<AppState>(persistConfig, rootReducer);

// Saga
const sagaMiddleware = createSagaMiddleware();

// Store
let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// Run Saga
sagaMiddleware.run(rootSaga);

// Export
export type AppState = ReturnType<typeof rootReducer>;

// Persist store
let persistor = persistStore(store);

export { store, persistor };
