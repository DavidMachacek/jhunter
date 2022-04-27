import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contact';
import { combineReducers } from 'redux'

const reducer = combineReducers({
    reducer: contactReducer
})

const store = configureStore({
    reducer: {
        contacts: contactReducer
    }
})

export default store;