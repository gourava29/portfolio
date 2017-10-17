import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducers';

const configureStore = (railsProps, history) => (
  createStore(reducer, railsProps, applyMiddleware(routerMiddleware(history), thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default configureStore;
