export const main = (state = {level: 0}, action) => {
	switch (action.type) {
		case 'CHILD_TO_MAIN_NODE_TRANSITION': 
			if(state.level < 1) {
				return {
					...state,
					level: state.level + 1,
					mainNodeName: action.name
				};
			}
			else
				return state;
		case 'MAIN_TO_CHILD_NODE_TRANSITION':
			if(state.level > 0)
				return {
					...state,
					level: state.level - 1
				};
			else 
				return state;
		default:
			return state;
	}
}
