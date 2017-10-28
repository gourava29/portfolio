import React from 'react';

import ModalSwitch from '../../../app/home/components/ModalSwitch';
import Modal from '../../../app/home/components/Modal';
import Main from '../../../app/home/components/Main/MainComponentContainer';
import configureStore from '../../../app/home/store';
import {Provider} from 'react-redux';
import { Route } from 'react-router';;

describe('ModalSwitch', () => {
    
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
        
        wrapper = shallow(<ModalSwitch store={store} location="test"/>);
    });

    it('renders ModalSwitch', () => {
      	expect(wrapper).to.have.length(1);
    });
    
    it('renders Routes', () => {
        let routes = wrapper.find(Route).map( (route, index) => route);
      	expect(routes).to.have.length(2);
      	expect(routes[0].props().component).to.equal(Main);
      	wrapper.setProps({ location: 'test1', history: { action: 'PUSH'} });
      	routes = wrapper.find(Route).map( (route, index) => route);
      	expect(routes).to.have.length(2);
      	expect(routes[1].props().component).to.equal(Modal);
      	expect(routes[1].props().path).to.equal("/child/:id");
    });
});