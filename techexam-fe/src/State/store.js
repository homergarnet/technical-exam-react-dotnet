import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import { productReducer } from './Product/Reducer';
import { orderReducer } from './Order/Reducer';

const rootReducer = combineReducers({
    products: productReducer,
    orders: orderReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
