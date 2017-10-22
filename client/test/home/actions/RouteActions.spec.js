import * as actions from '../../../app/home/actions/RouteActions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

describe("RouteActions", () => {
	const getPushDispatch = (location) => ({
		type: '@@router/CALL_HISTORY_METHOD',
    	payload: { method: 'push', args: [location ? "/child/"+location : "/"] } 
	});
	
	let store;
	
	before(() => {
		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares)
	    store = mockStore({});

	});
	
	it("TO_DEFAULT", () => {
		expect(store.dispatch(actions.TO_DEFAULT())).to.deep.equal([ getPushDispatch(), {type: 'UPDATE_ROUTE_DATA', jsonResp: undefined} ]);
		
	});
	
	describe("TO_ROUTE", () => {
		const jsonResp = {test: 'test'};
		window.fetch = stub().returns(fetchStubSuccess(jsonResp));
		
		it("when currentRoute does not contains childid", () => {
		    const childId = "1";
    		const currentRoute = "";
    		const childLink = "";
    		return store.dispatch(actions.TO_ROUTE(currentRoute, childId, childLink)).then((dispatchedAction) => {
    		    expect(dispatchedAction).to.deep.equal([getPushDispatch(childId), {type: "UPDATE_ROUTE_DATA", jsonResp}]);
    		});
		});
		
		it("when currentRoute does contains childid", () => {
		    const childId = "1";
    		const currentRoute = "/child/1";
    		const childLink = "";
    		return store.dispatch(actions.TO_ROUTE(currentRoute, childId, childLink)).then((dispatchedAction) => {
    		    expect(dispatchedAction).to.deep.equal([getPushDispatch(), {type: "UPDATE_ROUTE_DATA", jsonResp: undefined}]);
    		});
		});
		
	});
});