import { CHILD_TO_MAIN_NODE_TRANSITION, MAIN_TO_CHILD_NODE_TRANSITION } from "./MainComponentActions";
import { TO_DEFAULT, TO_ROUTE } from "./RouteActions";

export const CHILD_NODE_TOGGLE = (level, name, childId, currentRoute, childLink, hasChildren) => {
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
								dispatch(TO_DEFAULT())
							]);
						});
					}, 200);
				});
			} else {
				const childToMainDispatch = dispatch(CHILD_TO_MAIN_NODE_TRANSITION(name, hasChildren));
				dispatch(TO_ROUTE(currentRoute, childId, childLink)).then(responseDispatch => {
					resolve([childToMainDispatch, ...responseDispatch]);	
				});
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
						...dispatch(TO_DEFAULT())
					];
					resolve(response);
				}, 200);
			} else {
				resolve([
					firstMainNodeToggleDispatch,
					...dispatch(TO_DEFAULT())
				]);
			}
		});
	}
};