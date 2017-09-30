import React from 'react';

const SocialConnect = (props) => {
	let iconButton = props.name;
	if(props.img) {
		iconButton = <img src={props.img}/>;
	} else {
		iconButton = <div className={"fa fa-"+ props.name.toLowerCase() + " " + props.name.toLowerCase()}></div>
	}
	return (
		<div className='social-connect' title={props.name}>
			<a href={props.link} target='_blank' className="connect-icon">{iconButton}</a>
		</div>
	);
};

export default SocialConnect;