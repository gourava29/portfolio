import React from 'react';

import Home from '../../app/home/home';
import Main from '../../app/home/components/Main/MainComponent';

describe('Home', () => {
  const props = {};
  const wrapper = shallow(<Home/>);

  it('renders home', () => {
  	expect(wrapper).to.have.length(1);
  });

  it('renders Main', () => {
  	const main = wrapper.find(Main);
  	expect(main).to.have.length(1);
  	expect(main.props()).to.deep.equal(wrapper.state());
  });
});