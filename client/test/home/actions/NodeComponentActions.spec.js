import thunk from 'redux-thunk';
import * as actions from '../../../app/home/actions/NodeComponentActions';
import configureMockStore from 'redux-mock-store';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe("NodeComponentActions", () => {
	it("CHILD_NODE_TOGGLE", () => {
		const store = mockStore({});
		const nodeName = "Test";
		expect(store.dispatch(actions.CHILD_NODE_TOGGLE(nodeName))).to.deep.equal({
			type: "CHILD_TO_MAIN_NODE_TRANSITION",
			name: nodeName
		});
		
	});

	it("MAIN_NODE_TOGGLE", () => {
		expect(actions.MAIN_NODE_TOGGLE()).to.deep.equal({
			type: "MAIN_NODE_TOGGLE"
		});
	});
});