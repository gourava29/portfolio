import React from 'react';

import MainContainer from '../../../../app/home/components/Main/MainComponentContainer';
import Main from '../../../../app/home/components/Main/MainComponent';
import { connect, Provider } from 'react-redux';
import configureStore from '../../../../app/home/store';
import { createBrowserHistory } from 'history';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore()

describe('MainComponentContainer', () => {
  const props = {
    main: {
    	name: "John",
    	location: {
        pathname: ""
      }
    }
  };
  
  let wrapper;
  before(() => {
    const store = mockStore(props);
    wrapper = mount(<Provider store={store}><MainContainer/></Provider>);
  })

  it('renders MainContainer', () => {
    expect(wrapper.find("Main").props().name).to.eq(props.main.name);
  });
});