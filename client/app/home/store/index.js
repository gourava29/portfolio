import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducers';
import { saveState, loadState } from '../../localstorage';

const configureStore = (railsProps, history) => {
  const store = createStore(reducer, {...railsProps, ...loadState()}, applyMiddleware(routerMiddleware(history), thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  store.subscribe(() => {
      saveState(store.getState());
  })
  return store;
};

export default configureStore;
