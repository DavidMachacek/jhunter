import personReducer from './person';
import roleReducer from './roleFilter';
import { combineReducers } from 'redux'
import {reducer as oidc} from 'redux-oidc';

const rootReducer = combineReducers({
    appConfig: (state) => state || {},
    oidc,
    personReducer,
    roleReducer
})

export default rootReducer;