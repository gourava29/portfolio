import React from 'react';
import SocialConnections from './SocialConnections';
import NodeComponent from '../Common/NodeComponentContainer';
import SkillComponent from './SkillComponent';

const emptyObject = {};
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.renderMainNode = this.renderMainNode.bind(this);
    this.getRelationshipList = this.getRelationshipList.bind(this);
  }

  renderMainNode() {
    return(
      <div className='heading noselect transparent-background'>
        <div className="full-name">
          {this.props.level > 0 ? this.props.mainNodeName : this.props.name}
        </div>
        <div className="role">
          {this.props.level > 0 ? this.props.mainNodeRole : this.props.role}
        </div>
      </div>
    )
  }

  getRelationshipList() {
    let relationshipsList = [];
    if(this.props.level == 0)
      relationshipsList  = Object.keys(this.props.relationships);
    else{
      let relationshipList;
      for(var key in this.props.relationships){
        if(key === this.props.mainNodeName.toLowerCase()){
          relationshipsList = this.props.relationships[key];
          break;
        }
      }
    }
    return relationshipsList;
  }

  render() {
    let childNodes = [];
    const relationshipsList = this.getRelationshipList();
    const { mainNodeName, level } = this.props;
    (relationshipsList).forEach(function(item, index) {
      if(mainNodeName === 'SKILLS' && level > 0)
        childNodes.push(
          <SkillComponent {...item}/>
        );
      else{
        const itemName = level > 0 ? item.name : item;
        childNodes.push(<div title={itemName.toUpperCase()}>{itemName.split(" ")[0].toUpperCase()}</div>);
      }
        
    });
    
    return (
      <div>
        <NodeComponent showEdges={false} level={this.props.level} childNodes={childNodes} mainNode={this.renderMainNode()}/>
        <SocialConnections connections={this.props.connections}/>
      </div>
    );
  }
}




