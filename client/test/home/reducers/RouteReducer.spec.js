import { route } from '../../../app/home/reducers/RouteReducer';

describe('RouteReducer', () => {
	const initialState = {
		currentRoute: undefined
	};

	it('should return the initial state', () => {
  		expect(route(undefined, {})).to.deep.equal(initialState);
  	});
  	
  	it('should handle UPDATE_ROUTE_DATA', () => {
  	    const action = {
  	        type: "UPDATE_ROUTE_DATA",
  	        jsonResp: {
  	            test: "test"
  	        }
  	    }
  		expect(route(undefined, action)).to.deep.equal({currentRoute: action.jsonResp});
  	});
});