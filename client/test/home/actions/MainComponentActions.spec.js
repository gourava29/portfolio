import * as actions from '../../../app/home/actions/MainComponentActions';

describe("MainComponentActions", () => {
	it("CHILD_TO_MAIN_NODE_TRANSITION", () => {
		const nodeName = "Test";
		const hasChildren = true;
		expect(actions.CHILD_TO_MAIN_NODE_TRANSITION(nodeName, hasChildren)).to.deep.equal({
			type: "CHILD_TO_MAIN_NODE_TRANSITION",
			name: nodeName,
			hasChildren
		});
		
	});
	
	it("CHILD_TO_MAIN_NODE_TRANSITION when hasChildren is undefined", () => {
		const nodeName = "Test";
		const hasChildren = undefined;
		expect(actions.CHILD_TO_MAIN_NODE_TRANSITION(nodeName, hasChildren)).to.deep.equal({
			type: "CHILD_TO_MAIN_NODE_TRANSITION",
			name: nodeName,
			hasChildren: false
		});
		
	});

	it("MAIN_TO_CHILD_NODE_TRANSITION", () => {
		const nodeName = "Test";
		expect(actions.MAIN_TO_CHILD_NODE_TRANSITION(nodeName)).to.deep.equal({
			type: "MAIN_TO_CHILD_NODE_TRANSITION",
			name: nodeName
		});
		
	});
});