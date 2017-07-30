import React from 'react';

import SocialConnections from '../../../../app/home/components/Main/SocialConnections';
import SocialConnect from '../../../../app/home/components/Main/SocialConnect';

describe('SocialConnections', () => {
  const props = {
    connections: [
      {name: 'Link1', link: 'https://www.link1.com', 'iconClass':'fa-quora'},
      {name: 'Link2', link: 'https://www.link2.com', img: 'link2.png'}
    ]
  };
  const wrapper = shallow(<SocialConnections {...props}/>);

  it('Contains connect title', () => {
    const title = wrapper.find(".title")
    expect(title).to.have.length(1);
  	expect(title.first().text()).to.equal("Connect with me on:");
  });

  it('contains socialConnect', () => {
    const socialConnect = wrapper.find(SocialConnect);
    expect(socialConnect).to.have.length(props.connections.length);
    socialConnect.forEach((n, i) => {
      expect(n.props()).to.deep.equals(props.connections[i])
    });
  });
});