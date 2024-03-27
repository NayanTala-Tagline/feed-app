
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import FeedSlice from './slices/FeedSlice';


const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    timeout: null,
};

const reducers = combineReducers({
    feed: FeedSlice,
})

const rootReducer = (state, action) => {
    return reducers(state, action)
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export const persistor = persistStore(store);
