import React from 'react';

import Modal from '../../../app/home/components/Modal';
import configureStore from '../../../app/home/store';
import {Provider} from 'react-redux';

describe('Modal', () => {
    
    let wrapper, props;
  
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
        const store = configureStore({main:{...props}});
        
        wrapper = shallow(<Modal store={store}/>);
    });

    it('renders Modal', () => {
      	expect(wrapper).to.have.length(1);
      	expect(wrapper.html()).contains("sub-child2");
    });
    
    it('getComp', () => {
        const expectedResponse = {
          id: 2,
          name: "child2",
          relationships: [{id: 1, name: 'sub-child2'}]
        };
        expect(wrapper.dive().instance().getComp(props, 2)).to.deep.equal(expectedResponse);
    });
    
    it('getCompById', () => {
        const expectedResponse = {id: 1, name: 'sub-child2'};
        expect(wrapper.dive().instance().getCompById("child2", props, 1)).to.deep.equal(expectedResponse);
    });
});