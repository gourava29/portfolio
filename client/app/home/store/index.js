import { createStore } from 'redux';
import reducer from '../reducers';

const configureStore = (railsProps) => (
  createStore(reducer, railsProps, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default configureStore;
