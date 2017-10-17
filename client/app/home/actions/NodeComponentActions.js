import { CHILD_TO_MAIN_NODE_TRANSITION, MAIN_TO_CHILD_NODE_TRANSITION } from "./MainComponentActions";
import { push } from 'react-router-redux'
export const CHILD_NODE_TOGGLE = (level, name, childId, currentRoute, hasChildren) => {
	return function (dispatch) {
		return new Promise((resolve, reject) => {
			if(hasChildren) {
				dispatch(MAIN_NODE_TOGGLE(level)).then(firstMainNodeDispatch=>{
					dispatch(CHILD_TO_MAIN_NODE_TRANSITION(name, hasChildren));
					setTimeout(() => {
						dispatch(MAIN_NODE_TOGGLE(level, name)).then(secondMainNodeDispatch => {
							resolve([
								firstMainNodeDispatch,
								secondMainNodeDispatch,
								dispatch(push("/"))
							]);
						});
					}, 200);
				});
			} else {
				const childToMainDispatch = dispatch(CHILD_TO_MAIN_NODE_TRANSITION(name, hasChildren));
				let redirectToRouteName = "/child/"+childId;
				if(currentRoute.indexOf(redirectToRouteName) > -1) 
					redirectToRouteName = "/";
				resolve([childToMainDispatch, dispatch(push(redirectToRouteName))]);
				
			}
		});
	}
}

export const MAIN_NODE_TOGGLE = (level, name, isDirect) => {
	return function(dispatch) {
		return new Promise((resolve, reject) => {
			const firstMainNodeToggleDispatch = dispatch({
				type: "MAIN_NODE_TOGGLE"
			});
			if(isDirect && level >= 1){
				const mainToChildDispatch = dispatch(MAIN_TO_CHILD_NODE_TRANSITION(name));
				setTimeout(() => {
					const secondMainNodeToggleDispatch = dispatch({
						type: "MAIN_NODE_TOGGLE"
					});
					const response = [
						firstMainNodeToggleDispatch,
						mainToChildDispatch,
						secondMainNodeToggleDispatch,
						dispatch(push("/"))
					];
					resolve(response);
				}, 200);
			} else {
				resolve([
					firstMainNodeToggleDispatch,
					dispatch(push("/"))
				]);
			}
		});
	}
};