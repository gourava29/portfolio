import React from 'react';

import MainContainer from '../../../../app/home/components/Main/MainComponentContainer';
import { connect, Provider } from 'react-redux';
import configureStore from '../../../../app/home/store';

describe('MainComponentContainer', () => {
  const props = {
    name: "John"
  };
  const store = configureStore(props);
  const wrapper = mount(<Provider store={store}><MainContainer/></Provider>);

  it('renders MainContainer', () => {
    expect(wrapper.find("Main").props().name).to.eq(props.name);
  });
});