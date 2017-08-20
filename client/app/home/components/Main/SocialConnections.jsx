import React from 'react';
import SocialConnect from './SocialConnect';
const emptyArray = [];
const SocialConnections = (props) => (
	<div className='social-connections'>
		<div className='center'>
			<div className='inline-block title'>
				Connect with me on:
			</div>
			<div className='inline-block center'>
				{
					(props.connections || emptyArray).map(function(connection, i){
			        	return <SocialConnect key={`social-connect-${i}`} {...connection}/>
			    	})
				}
			</div>
		</div>
	</div>
)

export default SocialConnections;



