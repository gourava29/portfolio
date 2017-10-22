import thunk from 'redux-thunk';
import * as actions from '../../../app/home/actions/NodeComponentActions';
import { CHILD_TO_MAIN_NODE_TRANSITION, MAIN_TO_CHILD_NODE_TRANSITION } from "../../../app/home/actions/MainComponentActions";
import configureMockStore from 'redux-mock-store';



describe("NodeComponentActions", () => {
	let store;
	
	before(() => {
		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares)
	    store = mockStore({});
	});
	
	
	const getPushDispatch = (location) => ({
		type: '@@router/CALL_HISTORY_METHOD',
    	payload: { method: 'push', args: [location ? "/child/"+location : "/"] } 
	});
	
	describe("CHILD_NODE_TOGGLE", () => {
		it("when has children is false", () => {
			const jsonResp = {test: 'test'};
			window.fetch = stub().returns(fetchStubSuccess(jsonResp));
			const nodeName = "Test", childId = "test", currentRoute = "", hasChildren = false; 
			return store.dispatch(actions.CHILD_NODE_TOGGLE(2, nodeName, childId, currentRoute, hasChildren)).then((dispatchedAction) => {
				expect(dispatchedAction).to.deep.equal([CHILD_TO_MAIN_NODE_TRANSITION(nodeName), getPushDispatch(childId), {type: "UPDATE_ROUTE_DATA", jsonResp}]);	
			});
		});
		
		it("when has children is false and childId is part of currentRoute", () => {
			const nodeName = "Test", childId = "test", currentRoute = "/child/test", hasChildren = false; 
			return store.dispatch(actions.CHILD_NODE_TOGGLE(2, nodeName, childId, currentRoute, hasChildren)).then((dispatchedAction) => {
				expect(dispatchedAction).to.deep.equal([CHILD_TO_MAIN_NODE_TRANSITION(nodeName), getPushDispatch(), {type: "UPDATE_ROUTE_DATA", jsonResp: undefined}]);	
			});
		});

		it("when hasChildren is true", () => {
			const jsonResp = {test: 'test'};
			window.fetch = stub().returns(fetchStubSuccess(jsonResp));
			const nodeName = "Test", childId = "test", currentRoute = "", hasChildren = true; 
			return store.dispatch(actions.CHILD_NODE_TOGGLE(0, nodeName, childId, currentRoute, hasChildren)).then((dispatchedAction) => {
				expect(dispatchedAction).to.deep.equal([
					CHILD_TO_MAIN_NODE_TRANSITION(nodeName, !hasChildren),
  					getPushDispatch(childId),
  					{type: "UPDATE_ROUTE_DATA", jsonResp}
				]);	
			});
		});
		
	});

	describe("MAIN_NODE_TOGGLE", () => {
		it("when direct is false", () => {
			return store.dispatch(actions.MAIN_NODE_TOGGLE()).then(dispatchedAction => {
				expect(dispatchedAction).to.deep.equal([
					{ type: "MAIN_NODE_TOGGLE" },
					getPushDispatch(),
					{type: "UPDATE_ROUTE_DATA", jsonResp: undefined}
				]);
			});
		});

		it("when direct is true and level 0", () => {
			const name = "Test";
			return store.dispatch(actions.MAIN_NODE_TOGGLE(0, name, true)).then(dispatchedAction => {
				expect(dispatchedAction).to.deep.equal([
					{ type: "MAIN_NODE_TOGGLE" },
					getPushDispatch(),
					{type: "UPDATE_ROUTE_DATA", jsonResp: undefined}
				]);
			});
		});

		it("when direct is true and level 1", () => {
			const name = "Test";
			return store.dispatch(actions.MAIN_NODE_TOGGLE(1, name, true)).then(dispatchedAction => {
				expect(dispatchedAction).to.deep.equal([
					{ type: 'MAIN_NODE_TOGGLE'},
					MAIN_TO_CHILD_NODE_TRANSITION(name),
					{ type: 'MAIN_NODE_TOGGLE'},
					getPushDispatch(),
					{type: "UPDATE_ROUTE_DATA", jsonResp: undefined}
				]);
			})
		});
	});
});