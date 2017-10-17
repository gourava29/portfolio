
import { combineReducers } from 'redux';
import { main } from './MainComponentReducer';
import { nodeComp } from './NodeComponentReducer';
import { routerReducer } from 'react-router-redux';

const combinedReducer = combineReducers({
	main, nodeComp,
    routing: routerReducer
});
export default combinedReducer;