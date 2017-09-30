import React from 'react';
import classNames from 'classnames';

export default class SkillComponent extends React.Component {
	constructor(props){
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.name !== nextProps.name;
	}

	render() {
		const classes = classNames('c100', 'small', 'p'+this.props.efficiency*10, {
			'orange' : this.props.efficiency <= 6,
			'green' : this.props.efficiency > 6
		});

		return (
			<div title={this.props.name} className={classes}>
	            <span className={`skill-icon ${this.props.name.split(" ")[0].toLowerCase()}-icon`}></span>
		        <div className="slice">
		            <div className="bar"></div>
		            <div className="fill"></div>
		        </div>
		    </div>
	    )

	}
};