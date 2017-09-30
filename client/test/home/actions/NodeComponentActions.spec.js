import thunk from 'redux-thunk';
import * as actions from '../../../app/home/actions/NodeComponentActions';
import { CHILD_TO_MAIN_NODE_TRANSITION, MAIN_TO_CHILD_NODE_TRANSITION } from "../../../app/home/actions/MainComponentActions";
import configureMockStore from 'redux-mock-store';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe("NodeComponentActions", () => {
	const store = mockStore({});

	describe("CHILD_NODE_TOGGLE", () => {
		it("when level is greater than or equal to 1", () => {
			const nodeName = "Test";
			return store.dispatch(actions.CHILD_NODE_TOGGLE(1, nodeName)).then((dispatchedAction) => {
				expect(dispatchedAction).to.deep.equal(CHILD_TO_MAIN_NODE_TRANSITION(nodeName));	
			});
		});

		it("when level is less than or equal to 1", () => {
			const nodeName = "Test";
			return store.dispatch(actions.CHILD_NODE_TOGGLE(0, nodeName)).then((dispatchedAction) => {
				expect(dispatchedAction).to.deep.equal([
					{ type: 'MAIN_NODE_TOGGLE', isDirect: false },
  					{ type: 'MAIN_NODE_TOGGLE', isDirect: false }
				]);	
			});
		});
		
	});

	describe("MAIN_NODE_TOGGLE", () => {
		it("when direct is false", () => {
			return store.dispatch(actions.MAIN_NODE_TOGGLE()).then(dispatchedAction => {
				expect(dispatchedAction).to.deep.equal({
					type: "MAIN_NODE_TOGGLE",
					isDirect: false
				});
			});
		});

		it("when direct is true and level 0", () => {
			return store.dispatch(actions.MAIN_NODE_TOGGLE(0, true)).then(dispatchedAction => {
				expect(dispatchedAction).to.deep.equal(MAIN_TO_CHILD_NODE_TRANSITION());
			});
		});

		it("when direct is true and level 1", () => {
			return store.dispatch(actions.MAIN_NODE_TOGGLE(1, true)).then(dispatchedAction => {
				expect(dispatchedAction).to.deep.equal([
					{ type: 'MAIN_NODE_TOGGLE', isDirect: true },
					MAIN_TO_CHILD_NODE_TRANSITION(),
					{ type: 'MAIN_NODE_TOGGLE', isDirect: true }
				]);
			})
		});
	});
});