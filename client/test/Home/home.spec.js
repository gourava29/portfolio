import React from 'react';

import Home from '../../app/home/home';
import Main from '../../app/home/components/Main/MainComponentContainer';
import {Provider} from 'react-redux';
import configureStore from '../../app/home/store';

describe('Home', () => {
  const props = {
    name: "Gourav"
  };

  const wrapper = shallow(<Home {...props}/>);

  it('renders home', () => {
  	expect(wrapper).to.have.length(1);
  });

  it('renders Provider with store default state as props of home', () => {
    const provider = wrapper.find(Provider);
    const store = configureStore(props);

    expect(provider.props().store.getState()).to.deep.eq(store.getState());
    expect(provider).to.have.length(1);
  });

  it('renders Main', () => {
    const main = wrapper.find(Main);
    expect(main).to.have.length(1);
  });
});