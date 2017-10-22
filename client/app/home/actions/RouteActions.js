import { push } from 'react-router-redux'

export const TO_DEFAULT = () => {
    return function (dispatch) {
        return [dispatch(push("/")), dispatch({type: 'UPDATE_ROUTE_DATA', jsonResp: undefined})];
    }
}

export const TO_ROUTE = (currentRoute, childId, childLink) => {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
    		const redirectToRouteName = "/child/"+childId;
    		if(currentRoute.indexOf(redirectToRouteName) > -1) 
    			resolve(dispatch(TO_DEFAULT()));
    		else {
    		    const redirectDispatch = dispatch(push(redirectToRouteName));
                window.fetch(childLink).then(response => {
                    return response.json();
                }).then(jsonResp => {
                    resolve([redirectDispatch, dispatch({type: 'UPDATE_ROUTE_DATA', jsonResp})]);
                });    
    		}
        });
        
    }
}