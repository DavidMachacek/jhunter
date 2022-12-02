import immutableStateInvariant from 'redux-immutable-state-invariant';
import promiseMiddleware from './promiseMiddleware';
import createOidcMiddleware, {reducer as oidc} from 'redux-oidc';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootreducer';
/*import {configureStore} from '@reduxjs/toolkit';*/
import personReducer from './person';
import roleReducer from './roleFilter';
import {userManager} from '../index'
import { combineReducers } from 'redux'

/*const reducer = combineReducers({
    personReducer: personReducer,
    roleReducer: roleReducer
})
*/

/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedEnhancers = composeEnhancers(applyMiddleware(
    immutableStateInvariant(),
    promiseMiddleware,
    createOidcMiddleware(userManager)
))*/
/*
const store = configureStore({
    reducer: {
        appConfig: (state) => state || {},
        oidc,
        persons: personReducer,
        roleFilter: roleReducer
    },
    enhancers: {
        composedEnhancers
    },
    preloadedState: {},
})
*/

export default function configureStore({initialState, userManager}) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        initialState || {},
        composeEnhancers(applyMiddleware(
            immutableStateInvariant(),
            promiseMiddleware,
            createOidcMiddleware(userManager)
        )));
}
/*

export default store;*/
