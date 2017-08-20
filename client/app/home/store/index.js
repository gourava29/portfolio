import { createStore } from 'redux';
import reducer from '../reducers';

const configureStore = (railsProps) => (
  createStore(reducer, railsProps)
);

export default configureStore;
