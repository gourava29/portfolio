import React from 'react';

import Main from '../../../../app/home/components/Main/MainComponent';
import SocialConnections from '../../../../app/home/components/Main/SocialConnections';
import NodeComponent from '../../../../app/home/components/Common/NodeComponentContainer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

describe('MainComponent', () => {
  let props, wrapper;
  
  before(() => {
    props = {
      id: 1,
      name: "Test title",
      role: 'Web Developer',
      connections: [
        {name: 'Link1', link: 'https://www.link1.com', 'iconClass':'fa-quora'},
        {name: 'Link2', link: 'https://www.link2.com', img: 'link2.png'}
      ],
      relationships: [
        {
          name: "child1",
          relationships: [{name: 'sub-child1'}]
        },
        {
          name: "child2",
          relationships: [{name: 'sub-child2'}]
        }
      ],
      mainNodeName: "Test Title"
    };
    wrapper = shallow(<Main {...props}/>);
  });
  
  describe('NodeComponent', () => {
    let nodeComponent;
    before(() => {
      nodeComponent = wrapper.find(NodeComponent);
    });
    
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
      let mainComponentInstance, mainNode;
      before(() => {
        mainComponentInstance = wrapper.instance();
        mainNode = mount(mainComponentInstance.renderMainNode(props));
      });
      
      it('has classes', () => {
        expect(mainNode.hasClass("heading")).to.be.true;
        expect(mainNode.hasClass("noselect")).to.be.true;
        expect(mainNode.hasClass("transparent-background")).to.be.true;
      });

      it('contains full-name', () => {
          const nameElement = mainNode.find(".full-name");
          expect(nameElement).to.have.length(1);
          expect(nameElement.text()).to.equal(props.name);
      });

      it('Contains Role', () => {
        const roleElement = mainNode.find(".role");
        expect(roleElement).to.have.length(1);
        expect(roleElement.text()).to.equal(props.role);
      });

    });

  });
  
  it('Contains downloadLink', () => {
    const downloadLink = wrapper.find(".downloadLink");
    expect(downloadLink.find("a").props().href).to.equal("users/"+props.id+"/download");
  });
  
  it('Contains SocialConnections', () => {
    const socialConnection = wrapper.find(SocialConnections);
    expect(socialConnection).to.have.length(1);
    expect(socialConnection.props().connections).to.equal(props.connections);
  });
  
  it('getRelationshipList', () => {
    expect(wrapper.instance().getRelationshipList(props)).to.deep.equal(props.relationships);
  });
  
  it('getComp', () => {
    const expectedResponse = {
      name: "child1",
      relationships: [{name: 'sub-child1'}]
    };
    expect(wrapper.instance().getComp("child1", props)).to.deep.equal(expectedResponse);
  });
  
  it('getParentComp', () => {
    expect(wrapper.instance().getParentComp("child1", props, props)).to.deep.equal(props);
  });
});