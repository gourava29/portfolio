const initialState = {
	mainNodeActive: false
};
export const nodeComp = (state = initialState, action) => {
	switch (action.type) {
		case 'MAIN_NODE_TOGGLE' :
			return {
				...state,
				mainNodeActive: !state.mainNodeActive
			};
		case 'CHILD_NODE_TOGGLE' :
			return state;
		default:
			return state;
	}
}
