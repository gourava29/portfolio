import combineReducer from '../../../app/home/reducers';
import { main } from '../../../app/home/reducers/MainComponentReducer';
import { nodeComp } from '../../../app/home/reducers/NodeComponentReducer';
import { routerReducer } from 'react-router-redux';

describe("Combined Reducer", () => {
	it("returns default state", () => {
		expect(combineReducer(undefined, {})).to.deep.eq({
			main: main(undefined, {}),
			nodeComp: nodeComp(undefined, {}),
			routing: routerReducer()
		});
	});

	it('should handle CHILD_TO_MAIN_NODE_TRANSITION', () => {
	  	const name = "Work"
	  	const action = {
	  		type: 'CHILD_TO_MAIN_NODE_TRANSITION',
			name
		};
	  	expect(combineReducer(undefined, action)).to.deep.equal({
			main: main(undefined, action),
			nodeComp: nodeComp(undefined, {}),
			routing: routerReducer()
	  	});
  	});

  	it('should handle MAIN_TO_CHILD_NODE_TRANSITION', () => {
  		const name = "Me";
  		const action = {
	  		type: 'MAIN_TO_CHILD_NODE_TRANSITION',
			name
		};
	  	expect(combineReducer(undefined, action)).to.deep.equal({
	  	    main: main(undefined, action),
			nodeComp: nodeComp(undefined, {}),
			routing: routerReducer()
	  	});
  	});

  	it('should handle MAIN_NODE_TOGGLE', () => {
	  	const action = {type: 'MAIN_NODE_TOGGLE'}
	  	expect(combineReducer(undefined, action)).to.deep.equal({
	  		main: main(undefined, {}),
	  		nodeComp: nodeComp(undefined, action),
			routing: routerReducer()
	  	});
  	});

  	it('should handle MAIN_TO_CHILD_NODE_TRANSITION', () => {
  		const action = {
	  		type: 'CHILD_NODE_TOGGLE'
		};
	  	expect(combineReducer(undefined, action)).to.deep.equal({
	  		main: main(undefined, {}),
	  		nodeComp: nodeComp(undefined, action),
			routing: routerReducer()
	  	});
  	});
});