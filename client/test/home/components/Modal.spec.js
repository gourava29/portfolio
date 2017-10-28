import React from 'react';

import Modal from '../../../app/home/components/Modal';
import configureStore from '../../../app/home/store';
import Accordion from '../../../app/home/components/Common/Accordion';
import {Provider} from 'react-redux';

describe('Modal', () => {
    
    let wrapper, props, store;
  
    before(() => {
        props = {
            id: 1,
            name: "Test title",
            role: 'Web Developer',
            connections: [
                {name: 'Link1', link: 'https://www.link1.com', 'iconClass':'fa-quora'},
                {name: 'Link2', link: 'https://www.link2.com', img: 'link2.png'}
            ],
            relationships: [
                {
                    id: 1,
                    name: "child1",
                    relationships: [{id: 1, name: 'sub-child1'}]
                },
                {
                    id: 2,
                    name: "child2",
                    relationships: [{id: 1, name: 'sub-child2'}]
                }
            ],
            mainNodeName: "Test Title",
            match: {
                params: {
                    id: "child2-1"
                }
            }
        };
        store = configureStore({main:{...props}});
        
        wrapper = mount(<Modal store={store}/>);
    });
    
    it('renders Modal', () => {
      	expect(wrapper).to.have.length(1);
      	expect(wrapper.html()).contains("sub-child2");
      	
    });
    
    it("renders loader", () => {
        expect(wrapper.find(".loader")).to.have.length(1);
    })
    
    it("renders Accordion", () => {
        const currentRoute = {
            id: 1,
            name: 'sub-child2',
            projects: [
                {id: 1, title: 'project1'},
                {id: 2, title: 'project2'}
            ],
            technologies: [
            ]
        };
        store = configureStore({
            main:{
                ...props,
                currentRoute
            }
        });
        wrapper = mount(<Modal store={store}/>);
        expect(wrapper.find(".loader")).to.have.length(0);
        expect(wrapper.find(".child-container")).to.have.length(1);
        let expectedAccordionLength = 0;
        for(var key in currentRoute){
            if(currentRoute[key] instanceof Array){
                expectedAccordionLength += currentRoute[key].length + 1;
            }
        }
        expect(wrapper.find(Accordion)).to.have.length(expectedAccordionLength);
    });
    
    it('getComp', () => {
        wrapper = shallow(<Modal store={store}/>);
        const expectedResponse = {
          id: 2,
          name: "child2",
          relationships: [{id: 1, name: 'sub-child2'}]
        };
        expect(wrapper.dive().instance().getComp(props, 2)).to.deep.equal(expectedResponse);
    });
    
    it('getCompById', () => {
        wrapper = shallow(<Modal store={store}/>);
        const expectedResponse = {id: 1, name: 'sub-child2'};
        expect(wrapper.dive().instance().getCompById("child2", props, 1)).to.deep.equal(expectedResponse);
    });
});