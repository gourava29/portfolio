export const main = (state = {level: 0, childToMain: false}, action) => {
	switch (action.type) {
		case 'CHILD_TO_MAIN_NODE_TRANSITION': 
			if(action.hasChildren)
				return {
					...state,
					level: state.level + 1,
					mainNodeName: action.name,
					childToMain: true
				};	
			else{
				return state;
			}
			
		case 'MAIN_TO_CHILD_NODE_TRANSITION':
			if(state.level > 0)
				return {
					...state,
					level: state.level - 1,
					mainNodeName: action.name,
					childToMain: false
				};
			else 
				return state;
		default:
			return state;
	}
}
