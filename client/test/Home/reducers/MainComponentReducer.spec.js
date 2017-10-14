import { main } from '../../../app/home/reducers/MainComponentReducer';


describe('MainComponentReducer', () => {
	let level = 0;
	it('should return the initial state', () => {
  		expect(main(undefined, {})).to.deep.equal({childToMain: false, level: 0});
  	});

  	it('should handle CHILD_TO_MAIN_NODE_TRANSITION', () => {
	  	const name = "Work"
	  	expect(main(undefined, {
	  		type: 'CHILD_TO_MAIN_NODE_TRANSITION',
			name
		})).to.deep.equal({
			childToMain: true,
	  	    level: level + 1,
	        mainNodeName: name
	  	});
  	});

  	it('should handle MAIN_TO_CHILD_NODE_TRANSITION', () => {
  		const name = "Me"
  		const currentLevel = 1;
	  	expect(main({level: currentLevel}, {
	  		type: 'MAIN_TO_CHILD_NODE_TRANSITION',
			name
		})).to.deep.equal({
			childToMain: false,
	  	    level: currentLevel - 1,
	  	    mainNodeName: name
	  	});
  	});
});
