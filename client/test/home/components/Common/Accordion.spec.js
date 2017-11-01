import React from 'react';

import Accordion from '../../../../app/home/components/Common/Accordion';

describe('Accordion', () => {

	let wrapper, props, childComp;
	
	before(() => {
		props = {
			title: 'Test',
			subTitle: 'subTitle'
		};
	    childComp = <div>
	        child_comp
	    </div>
		wrapper = shallow(
    		<Accordion {...props}>
    		    {childComp}
    		</Accordion>
		);
	});

	it('render', () => {
	    expect(wrapper.find(".acc-title").html()).equals('<div class="title acc-title"><span class="fa fa-chevron-down"></span>'+props.title+' '+props.subTitle+'</div>');
	    expect(wrapper.find(".acc-content").children().nodes[0]).equals(childComp);
	});	
	
	it('handles onAccClick', () => {
	   const { isOpen } = wrapper.instance()
	   wrapper.instance().onAccClick();
	   expect(wrapper.instance().state.isOpen).to.equal(!isOpen)
	});
	
	describe("isOpen", () => {
	   it("is true", () => {
            props = {...props, isOpen: true};
          	wrapper = shallow(
        		<Accordion {...props}>
        		    {childComp}
        		</Accordion>
    		);
	        expect(wrapper.find(".fa").hasClass("fa-chevron-up")).to.be.true;
	   }); 
	   it("is false", () => {
	        props = {...props, isOpen: false};
	        wrapper = shallow(
        		<Accordion {...props}>
        		    {childComp}
        		</Accordion>
    		);
	        expect(wrapper.find(".fa").hasClass("fa-chevron-down")).to.be.true;
	   }); 
	});
	
	
});