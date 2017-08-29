import { CHILD_TO_MAIN_NODE_TRANSITION, MAIN_TO_CHILD_NODE_TRANSITION } from "./MainComponentActions";

export const CHILD_NODE_TOGGLE = (level, name) => {
	return function (dispatch) {
		if(level < 1) {
			dispatch(MAIN_NODE_TOGGLE(level));
			setTimeout(() => {
				dispatch(MAIN_NODE_TOGGLE(level))
			}, 200);
		}
		return dispatch(CHILD_TO_MAIN_NODE_TRANSITION(name));
	}
}

export const MAIN_NODE_TOGGLE = (level, isDirect) => {
	return function(dispatch) {
		dispatch({
			type: "MAIN_NODE_TOGGLE",
			isDirect
		});
		if(isDirect){
			dispatch(MAIN_TO_CHILD_NODE_TRANSITION());
			if(level == 1){
				setTimeout(() => {
					dispatch({
						type: "MAIN_NODE_TOGGLE",
						isDirect
					})
				}, 200);
			}
		}
	}
};