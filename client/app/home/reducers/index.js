
import { combineReducers } from 'redux';
import { main } from './MainComponentReducer';
import { nodeComp } from './NodeComponentReducer';
import { route } from './RouteReducer';
import { routerReducer } from 'react-router-redux';

const combinedReducer = combineReducers({
	main, nodeComp, route,
    routing: routerReducer
});
export default combinedReducer;