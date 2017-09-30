import { CHILD_TO_MAIN_NODE_TRANSITION, MAIN_TO_CHILD_NODE_TRANSITION } from "./MainComponentActions";

export const CHILD_NODE_TOGGLE = (level, name) => {
	return function (dispatch) {
		return new Promise((resolve, reject) => {
			if(level < 1) {
				dispatch(MAIN_NODE_TOGGLE(level)).then(firstMainNodeDispatch=>{
					dispatch(CHILD_TO_MAIN_NODE_TRANSITION(name));
					setTimeout(() => {
						dispatch(MAIN_NODE_TOGGLE(level)).then(secondMainNodeDispatch => {
							resolve([
								firstMainNodeDispatch,
								secondMainNodeDispatch
							]);
						});
					}, 200);
				});
			} else {
				resolve(dispatch(CHILD_TO_MAIN_NODE_TRANSITION(name)));
			}
		});
	}
}

export const MAIN_NODE_TOGGLE = (level, isDirect) => {
	return function(dispatch) {
		return new Promise((resolve, reject) => {
			const firstMainNodeToggleDispatch = dispatch({
				type: "MAIN_NODE_TOGGLE",
				isDirect: !!isDirect
			});
			if(isDirect){
				
				const mainToChildDispatch = dispatch(MAIN_TO_CHILD_NODE_TRANSITION());
				if(level == 1){
					setTimeout(() => {
						const secondMainNodeToggleDispatch = dispatch({
							type: "MAIN_NODE_TOGGLE",
							isDirect: !!isDirect
						});
						const response = [
							firstMainNodeToggleDispatch,
							mainToChildDispatch,
							secondMainNodeToggleDispatch
						];
						resolve(response);
					}, 200);
				} else {
					resolve(mainToChildDispatch);
				}
			} else {
				resolve(firstMainNodeToggleDispatch);
			}
		});
	}
};