import React from 'react';
import SocialConnections from './SocialConnections';
import NodeComponent from '../Common/NodeComponentContainer';

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
          {this.props.mainNodeName || this.props.name}
        </div>
        <div className="role">
          {this.props.mainNodeName ? "" : this.props.role}
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
          console.log(this.props.relationships[key]);
          relationshipsList = this.props.relationships[key].map(relationship => relationship.name);
          break;
        }
      }
    }
    return relationshipsList;
  }

  render() {
    console.log(this.props);
    let childNodes = [];
    const relationshipsList = this.getRelationshipList();
    console.log(relationshipsList);
    (relationshipsList).forEach(function(item, index) {
      childNodes.push(<div>{item.split(" ")[0].toUpperCase()}</div>);
    });
    
    return (
      <div>
        <NodeComponent showEdges={false} childNodes={childNodes} onChildNodeClicked={this.props.onChildNodeClicked} mainNode={this.renderMainNode()}/>
        <SocialConnections connections={this.props.connections}/>
      </div>
    );
  }
}




