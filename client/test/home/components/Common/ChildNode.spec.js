import React from 'react';

import ChildNode from '../../../../app/home/components/Common/ChildNode';

describe('ChildNode', () => {

	let wrapper, props;
	
	before(() => {
		props = {
			name: 'Test'
		};
	
		wrapper = shallow(<ChildNode {...props}/>);
	});

	it('render', () => {
	    expect(wrapper.props().title).to.equal(props.name.toUpperCase());
	    expect(wrapper.props().children).to.equal(props.name.toUpperCase());
	});	
});