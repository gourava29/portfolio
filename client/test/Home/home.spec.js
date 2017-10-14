import React from 'react';

import Home from '../../app/home/home';
import Main from '../../app/home/components/Main/MainComponentContainer';
import {Provider} from 'react-redux';
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

  it('renders Main', () => {
    const main = wrapper.find(Main);
    expect(main).to.have.length(1);
  });
});