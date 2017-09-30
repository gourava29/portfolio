import React from 'react';

import SocialConnect from '../../../../app/home/components/Main/SocialConnect';

describe('SocialConnect', () => {
  let props, wrapper;

  it('without img', () => {
    props = {name: 'Link1', link: 'https://www.link1.com'};
    wrapper = shallow(<SocialConnect {...props}/>);
    expect(wrapper.find(".social-connect")).to.have.length(1);
    var link = wrapper.find("a");
    expect(link).to.have.length(1);
    expect(link.props().href).to.equal(props.link);
    var icon = wrapper.find("div.fa");
    expect(icon).to.have.length(1);
    expect(icon.hasClass("fa-"+props.name.toLowerCase())).to.equal(true);
  });

  it('with img prop', () => {
    props = {name: 'Link1', link: 'https://www.link1.com', img: 'test.png'};
    wrapper = shallow(<SocialConnect {...props}/>);
    expect(wrapper.find(".social-connect")).to.have.length(1);
    var link = wrapper.find("a");
    expect(link).to.have.length(1);
    expect(link.props().href).to.equal(props.link);
    var img = wrapper.find("img");
    expect(img).to.have.length(1);
    expect(img.props().src).to.equal(props.img);
  });
});