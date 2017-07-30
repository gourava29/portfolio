import React from 'react';

import MainComponent from '../../../../app/home/components/Main/MainComponent';
import SocialConnections from '../../../../app/home/components/Main/SocialConnections';

describe('MainComponent', () => {
  const props = {
    title: "Test title",
    role: 'Web Developer',
    connections: [
      {name: 'Link1', link: 'https://www.link1.com', 'iconClass':'fa-quora'},
      {name: 'Link2', link: 'https://www.link2.com', img: 'link2.png'}
    ]
  };
  const wrapper = shallow(<MainComponent {...props}/>);

  it('Contains full-name', () => {
    const fullName = wrapper.find(".full-name");
    expect(fullName).to.have.length(1);
    expect(fullName.first().text()).to.equal(props.title);
  });
  
  it('Contains Role', () => {
    const role = wrapper.find(".role");
    expect(role).to.have.length(1);
    expect(role.first().text()).to.equal(props.role);
  });

  it('Contains SocialConnections', () => {
    const socialConnection = wrapper.find(SocialConnections);
    expect(socialConnection).to.have.length(1);
    expect(socialConnection.props().connections).to.equal(props.connections);
  });

  // it('calls updateName on textbox Change', () => {
  // 	let compInstance = wrapper.instance();
  // 	let updateNameSpy = spy(compInstance, 'updateName');
  // 	wrapper.find("input[type='text']").simulate('change', {target: {}});
  // 	expect(updateNameSpy.calledOnce).to.be.true;
  // });

  // it('Changes the name on textbox change', () => {
  // 	wrapper.find("input[type='text']").simulate('change', {target: {value: 'Tester changed'}});
  // 	expect(wrapper.text()).to.contain("Tester changed");
  // });
});