import { nodeComp } from '../../../app/home/reducers/NodeComponentReducer';

describe('NodeComponentReducer', () => {
	const initialState = {
		mainNodeActive: false
	};

	it('should return the initial state', () => {
  		expect(nodeComp(undefined, {})).to.deep.equal(initialState);
  	});

  	it('should handle MAIN_NODE_TOGGLE', () => {
	  	const name = "Work"
	  	expect(nodeComp(undefined, {
	  		type: 'MAIN_NODE_TOGGLE'
		})).to.deep.equal({...initialState, mainNodeActive: !initialState.mainNodeActive});
  	});

  	it('should handle MAIN_TO_CHILD_NODE_TRANSITION', () => {
  		const name = "Me"
	  	expect(nodeComp(undefined, {
	  		type: 'CHILD_NODE_TOGGLE'
		})).to.deep.equal(initialState);
  	});
});