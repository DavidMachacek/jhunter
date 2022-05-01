import { configureStore } from '@reduxjs/toolkit';
import personReducer from './person';
import roleReducer from './roleFilter';
import { combineReducers } from 'redux'

const reducer = combineReducers({
    personReducer: personReducer,
    roleReducer: roleReducer
})

const store = configureStore({
    reducer: {
        persons: personReducer,
        roleFilter: roleReducer
    }
})

export default store;