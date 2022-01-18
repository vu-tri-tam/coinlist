import { combineReducers, configureStore } from '@reduxjs/toolkit'

import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER

} from 'redux-persist'
import storage from 'redux-persist/lib/storage'//lưu data trong localStorage
import authSlice from '../feature/Auth'
import verifySlice from '../feature/VerifyKYC'


const persistConfig = {
    key: ['auth', 'verify'],
    storage,
}

const rootReducer = combineReducers({
    auth: authSlice,
    verify: verifySlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export const persistor = persistStore(store)
export default store

//redux toolkit, persis