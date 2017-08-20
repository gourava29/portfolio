
const reducer = (state, action) => {
	switch(action.type) {
		case "onChildNodeClicked": 
			console.log(action);
			return state;
		default:
			return state;
	}
}

export default reducer;