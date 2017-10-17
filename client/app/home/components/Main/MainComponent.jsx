import React from 'react';
import SocialConnections from './SocialConnections';
import NodeComponent from '../Common/NodeComponentContainer';
import ChildNode from '../Common/ChildNode';
import SkillComponent from './SkillComponent';
import { Link } from 'react-router';

const emptyObject = {};
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.renderMainNode = this.renderMainNode.bind(this);
    this.getRelationshipList = this.getRelationshipList.bind(this);
    this.getChildren = this.getChildren.bind(this);
    this.getComp = this.getComp.bind(this);
    this.getParentComp = this.getParentComp.bind(this);
  }

  renderMainNode(currentComp) {
    return(
      <div name={currentComp.name} className='heading noselect transparent-background'>
        <div className="full-name">
          {currentComp.name}
        </div>
        <div className="role">
          {this.props.level > 0 ? this.props.mainNodeRole : this.props.role}
        </div>
      </div>
    )
  }
  
  getChildren(relationships = []) {
    return relationships.map(rel => {
      return rel;
    });
  }

  getRelationshipList(currentComp) {
    return this.getChildren(currentComp.relationships);
  }
  
  getComp(name, data) {
    let comp = null;
    if(name == data.name.toLowerCase()) {
      comp = data;
    } else {
      for(var key in data.relationships){
        const relData = data.relationships[key];
        comp = this.getComp(name, relData);
        if(comp != null)
          break;
      }
    }
    return comp;
  }
  
  getParentComp(childName, data, parentData) {
    let comp = null;
    if(childName === data.name.toLowerCase()) 
      comp = parentData;
    else {
      for(var key in data.relationships) {
        const relData = data.relationships[key];
        comp = this.getParentComp(childName, relData, data);
        if(comp != null)
          break;
      }
    }
    return comp;
  }

  render() {
    let childNodes = [];
    const nodeName = (this.props.mainNodeName || this.props.name).toLowerCase();
    const currentComp = this.props.childToMain ? this.getComp(nodeName, this.props) : this.getParentComp(nodeName, this.props, this.props);
    const relationshipsList = this.getRelationshipList(currentComp);
    const mainNode = this.renderMainNode(currentComp);
    const { mainNodeName, level , name, childToMain} = this.props;
    (relationshipsList).forEach(function(item, index) {
      if(['ui','db','backend','devop'].indexOf((mainNodeName || name).toLowerCase()) > -1 && level > 1){
        childNodes.push(
          <SkillComponent {...item}/>
        );
      } else {
        const itemName = item.name;
        childNodes.push(<ChildNode {...item}/>);
      }
    });
    
    return (
      <div>
        <NodeComponent showEdges={false} level={this.props.level} childNodes={childNodes} mainNode={mainNode} location={this.props.location}/>
        <SocialConnections connections={this.props.connections}/>
      </div>
    );
  }
}




