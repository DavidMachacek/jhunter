import { configureStore } from '@reduxjs/toolkit';
import personReducer from './person';
import { combineReducers } from 'redux'

const reducer = combineReducers({
    reducer: personReducer
})

const store = configureStore({
    reducer: {
        persons: personReducer
    }
})

export default store;