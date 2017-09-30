
import { combineReducers } from 'redux';
import { main } from './MainComponentReducer';
import { nodeComp } from './NodeComponentReducer';

const combinedReducer = combineReducers({
	main, nodeComp
});
export default combinedReducer;