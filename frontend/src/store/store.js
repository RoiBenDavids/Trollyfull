import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { modalReducer } from './reducers/modalReducer';
import { msgReducer } from './reducers/msgReducer';
import { reviewReducer } from './reducers/reviewReducer';
import {tripReducer } from './reducers/tripReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    tripReducer,
    userReducer,
    modalReducer,
    reviewReducer,
    msgReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))