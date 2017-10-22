const initialState = {
	currentRoute: undefined
};
export const route = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_ROUTE_DATA' :
			return {
			    ...state,
				currentRoute: action.jsonResp
			};
		default:
			return state;
	}
}