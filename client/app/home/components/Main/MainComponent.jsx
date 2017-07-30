import React from 'react';
import SocialConnections from './SocialConnections';

const Main = (props) => (
    <div className='vertical-align-middle'>
      <div className='heading'>
        <div className="full-name">
          {props.title}
        </div>
        <div className="role">
           {props.role}
        </div>
      </div>
      <SocialConnections connections={props.connections}/>
    </div>
)

export default Main;



