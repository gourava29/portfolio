import * as actions from '../../../app/home/actions/MainComponentActions';

describe("CHILD_TO_MAIN_NODE_TRANSITION", () => {
	it("CHILD_TO_MAIN_NODE_TRANSITION", () => {
		const nodeName = "Test";
		expect(actions.CHILD_TO_MAIN_NODE_TRANSITION(nodeName)).to.deep.equal({
			type: "CHILD_TO_MAIN_NODE_TRANSITION",
			name: nodeName
		});
		
	});

	it("MAIN_TO_CHILD_NODE_TRANSITION", () => {
		const nodeName = "Test";
		expect(actions.MAIN_TO_CHILD_NODE_TRANSITION()).to.deep.equal({
			type: "MAIN_TO_CHILD_NODE_TRANSITION"
		});
		
	});
});