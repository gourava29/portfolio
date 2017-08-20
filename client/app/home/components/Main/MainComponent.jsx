import React from 'react';
import SocialConnections from './SocialConnections';
import NodeComponent from '../Common/NodeComponent';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.renderMainNode = this.renderMainNode.bind(this);
  }

  renderMainNode() {
    return(
      <div className='heading noselect transparent-background'>
        <div className="full-name">
          {this.props.name}
        </div>
        <div className="role">
          {this.props.role}
        </div>
      </div>
    )
  }

  render() {
    let childNodes = [];
    ['FAQ', 'Skills', 'Work', 'Hobbies'].forEach(function(item, index) {
      childNodes.push(<div>{item.toUpperCase()}</div>);
    });
    
    return (
      <div>
        <NodeComponent showEdges={false} childNodes={childNodes} mainNode={this.renderMainNode()}/>
        <SocialConnections connections={this.props.connections}/>
      </div>
    );
  }
}




