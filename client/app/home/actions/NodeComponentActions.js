

export const CHILD_NODE_TOGGLE = (name) => {
	return function (dispatch) {
	    dispatch({type: 'CHILD_TO_MAIN_NODE_TRANSITION', name})
	}
}

export const MAIN_NODE_TOGGLE = () => ({
	type: "MAIN_NODE_TOGGLE"
});