import React from 'react';

import Home from '../../app/home/home';
import ModalSwitch from '../../app/home/components/ModalSwitch';
import {Provider} from 'react-redux';
import { Route } from 'react-router';
import configureStore from '../../app/home/store';

describe('Home', () => {
  const props = {
    name: "Gourav",
    childToMain: false
  };
  
  let wrapper;
  
  before(() => {
    wrapper = shallow(<Home {...props}/>);
  });

  it('renders home', () => {
  	expect(wrapper).to.have.length(1);
  });

  it('renders Provider with store default state as props of home', () => {
    const provider = wrapper.find(Provider);
    const store = configureStore({main:{...props}});
    
    const storeState = store.getState();
    const defaultState = {...storeState, main:{...storeState.main, level:0}};
    expect(provider.props().store.getState()).to.deep.eq(defaultState);
    expect(provider).to.have.length(1);
  });

  it('ModalSwitch Route', () => {
    const pathMap = wrapper.find(Route).map( (route, index) => {
      const routeProps = route.props();
      return { comp : routeProps.component, path : routeProps.path};
    });
    expect(pathMap[0]).to.deep.equal({comp: ModalSwitch, path: undefined});
  });
});