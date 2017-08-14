import React from 'react';
import SocialConnections from './SocialConnections';
import NodeComponent from '../Common/NodeComponent';

//Constants 

const mainButtonDimension = {
  mobile: {
    width: 260,
    height: 95
  },
  desktop: {
    width: 400,
    height: 125
  }
};

const emptyArray = [];

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.renderMainNode = this.renderMainNode.bind(this);
    this.renderChildNodes = this.renderChildNodes.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.onChildNodeSelect = this.onChildNodeSelect.bind(this);
    this.getRelationships = this.getRelationships.bind(this);
    this.getSelectedNode = this.getSelectedNode.bind(this);
    this.state = {
      mainNodeProperties: {},
      childNodeProperties: {},
      openChild: false,
      selectedNode: props
    }
  }

  componentWillMount() {
    // this.updatePosition();
  }

  updatePosition() {
    let M_WIDTH, M_HEIGHT, C_DIAM;
    if(window.innerWidth < 1024){
      M_WIDTH = mainButtonDimension.mobile.width;
      M_HEIGHT = mainButtonDimension.mobile.height;
      C_DIAM = 60;
    } else {
      M_WIDTH = mainButtonDimension.desktop.width;
      M_HEIGHT = mainButtonDimension.desktop.height;
      C_DIAM = 70;
    }

    this.setState(
      {
        mainNodeProperties:{
          M_X: window.innerWidth/2, M_Y: window.innerHeight/2, M_WIDTH, M_HEIGHT
        },
        childNodeProperties: { C_DIAM }
      }
    );
  }

  componentDidMount() {
    this.updatePosition();
    window.addEventListener('resize', this.updatePosition)
  }

  getSelectedNode(nodeName) {
    const childNodes = this.state.selectedNode.relationships.childNodes;
    for(var i = 0; i < childNodes.length; i++) {
      const item = childNodes[i];
      if(item && item.name === nodeName)
        return item;
    }
  }

  findItemByName(childNodes) {
    for(var i = 0; i < childNodes.length; i++) {
      const item = childNodes[i];
      if(item && item.name === this.state.selectedNode)
        return item;
      else
        return findItemByName(item.childNodes);
    }
  }

  getRelationships() {
    console.log(this.state.selectedNode);
    if(this.state.selectedNode != null){
      return this.state.selectedNode.relationships;
    }
  }

  renderMainNode() {
    return(
      <div className='heading noselect transparent-background'>
        <div className="full-name">
          {this.state.selectedNode.name || this.state.selectedNode.title}
        </div>
        {
          this.state.selectedNode.role ?
            <div className="role">
              {this.state.selectedNode.role}
            </div>
          : ""
        }
      </div>
    )
  }

  renderChildNodes() {
    const self = this;
    const relationships = this.getRelationships();
    console.log(relationships);
    if(relationships && relationships.childNodes){
      return relationships.childNodes.map(function(item, index) {
        const childNode = <div title={item.title} className='child-title'>{item.name.toUpperCase()}</div>;
        const subChildNodes = emptyArray;//self.getChildNodes(item.relationships);
        // return (<NodeComponent name={item.name.toLowerCase()} showEdges={false} childNodes={subChildNodes} mainNode={childNode}/>);
        return childNode;
      });
    }
    return emptyArray;
  }

  onChildNodeSelect(node) {
    this.setState({selectedNode: this.getSelectedNode(node), openChild: true})
  }

  render() {
    return (
      <div>
        <NodeComponent name="main" {...this.state} onChildNodeSelect={this.onChildNodeSelect} showEdges={false} mainNode={this.renderMainNode()} childNodes={this.renderChildNodes()}/> 
        <SocialConnections connections={this.props.connections}/>
      </div>
    );
  }
}



