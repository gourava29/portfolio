import React from 'react';

import MainComponent from '../../../../app/home/components/Main/MainComponent';
import SocialConnections from '../../../../app/home/components/Main/SocialConnections';
import NodeComponent from '../../../../app/home/components/Common/NodeComponent';

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
  
  describe('NodeComponent', () => {
    const nodeComponent = wrapper.find(NodeComponent);
    
    it('has nodeComponent', () => {
      expect(nodeComponent).to.have.length(1);
    });
    
    it('contains mainNode prop', () => {
      expect(nodeComponent.props().mainNode).to.not.be.undefined;
    });

    it('contains childNode prop', () => {
      expect(nodeComponent.props().childNodes).to.not.be.undefined;
    });

    it('calls renderMainNode', () => {
      const mainComponentInstance = wrapper.instance();
      const renderMainNodeSpy = spy(mainComponentInstance, 'renderMainNode');
      mainComponentInstance.render();
      expect(renderMainNodeSpy.calledOnce).to.be.true;
    });

    describe("renders mainNode", () => {    
      const mainComponentInstance = wrapper.instance();
      const mainNode = mount(mainComponentInstance.renderMainNode());

      it('has classes', () => {
        expect(mainNode.hasClass("heading")).to.be.true;
        expect(mainNode.hasClass("noselect")).to.be.true;
        expect(mainNode.hasClass("transparent-background")).to.be.true;
      });

      it('contains full-name', () => {
          const nameElement = mainNode.find(".full-name");
          expect(nameElement).to.have.length(1);
          expect(nameElement.text()).to.equal(props.title);
      });

      it('Contains Role', () => {
        const roleElement = mainNode.find(".role");
        expect(roleElement).to.have.length(1);
        expect(roleElement.text()).to.equal(props.role);
      });

    });

  });
  
  it('Contains SocialConnections', () => {
    const socialConnection = wrapper.find(SocialConnections);
    expect(socialConnection).to.have.length(1);
    expect(socialConnection.props().connections).to.equal(props.connections);
  });
});