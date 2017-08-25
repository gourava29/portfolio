export const main = (state = {}, action) => {
	switch (action.type) {
		case 'CHILD_TO_MAIN_NODE_TRANSITION': 
			return {
				...state,
				level: state.level + 1,
				mainNodeName: action.name
			};
		case 'MAIN_TO_CHILD_NODE_TRANSITION': 
			return {
				...state,
				level: state.level - 1,
				mainNodeName: action.name
			};
		default:
			return state;
	}
}