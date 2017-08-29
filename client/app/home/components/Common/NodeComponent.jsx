import React from 'react';
import PropTypes from 'prop-types';
import {Motion, spring} from 'react-motion';

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

// Value of 1 degree in radians
const DEG_TO_RAD = Math.PI/50;

function toRadians(degrees) {
	return degrees * DEG_TO_RAD;
}

export default class NodeComponent extends React.Component {

	constructor(props) {
		super(props);
		this.updatePosition = this.updatePosition.bind(this);
    	this.defaultNodeStyle = this.defaultNodeStyle.bind(this);
		this.visibleNodeStyle = this.visibleNodeStyle.bind(this);
		this.defaultMainNodeStyle = this.defaultMainNodeStyle.bind(this);
		this.visibleMainNodeStyle = this.visibleMainNodeStyle.bind(this);
		this.finalDeltaPositions = this.finalDeltaPositions.bind(this);

		// The number of child buttons that fly out from the main button
		const NUM_CHILDREN = props.childNodes ? props.childNodes.length : 0;
		this.SEPARATION_ANGLE = 50/(NUM_CHILDREN+1); //degrees
		const FAN_ANGLE = (NUM_CHILDREN - 1) * this.SEPARATION_ANGLE; //degrees
		this.BASE_ANGLE = ((50 - FAN_ANGLE)/2); // degrees
		this.fly_out_radius = 150;

	}


  	componentWillMount() {
	    this.updatePosition();
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
	    window.addEventListener('resize', this.updatePosition)
  	}


	// Utility functions 
	// Since JS Math. functions accept value of angle in radians and we've been working in degrees we will need to covert
	// degrees to radians first.
	finalDeltaPositions(index) {
		const angle = this.BASE_ANGLE + ( index * this.SEPARATION_ANGLE );
		
		return {
			deltaX: this.fly_out_radius * Math.cos(toRadians(angle)) - (this.state.childNodeProperties.C_DIAM/2),
			deltaY: this.fly_out_radius * Math.sin(toRadians(angle)) + (this.state.childNodeProperties.C_DIAM/2)
		};
	}

	defaultNodeStyle(M_X, M_Y) {
		return { 
			style: {
				top: spring(M_Y - (this.state.childNodeProperties.C_DIAM/2)),
				left: spring(M_X - (this.state.childNodeProperties.C_DIAM/2)),
				rotate: spring(0),
				x: spring(M_X, {stiffness: 120, damping: 11}),
				y: spring(M_Y, {stiffness: 120, damping: 11}),
				width: this.state.childNodeProperties.C_DIAM,
				height: this.state.childNodeProperties.C_DIAM
			},
			coOrdinates: {
				x1: M_X,
				y1: M_Y
			}
		};
	}

	visibleNodeStyle(childIndex, M_X, M_Y) {
		let {deltaX, deltaY} = this.finalDeltaPositions(childIndex);

		return {
			style:{
				left: spring(M_X + deltaX, {stiffness: 120, damping: 11}),
				top: spring(M_Y - deltaY, {stiffness: 120, damping: 11}),
				rotate: spring(360, {stiffness: 120, damping: 11}),
				x: spring(M_X + deltaX + this.state.childNodeProperties.C_DIAM/2, {stiffness: 120, damping: 11}),
				y: spring(M_Y - deltaY + this.state.childNodeProperties.C_DIAM/2, {stiffness: 120, damping: 11}),
				width: this.state.childNodeProperties.C_DIAM,
				height: this.state.childNodeProperties.C_DIAM
			},
			coOrdinates : {
				x1: M_X,
				y1: M_Y
			}
		};
	}

	renderEdge(coOrdinates, x, y) {
		return this.props.showEdges ? (
			<div className="svgLine">
				<svg width="100%" height="100%">
					<line {...coOrdinates} x2={x} y2={y} style={{stroke: 'white', strokeWidth:2}}/>
				</svg>
			</div>	
    	) : "";
	}

	defaultMainNodeStyle() {
		const {M_X, M_Y, M_HEIGHT, M_WIDTH} = this.state.mainNodeProperties;
		return {
	      top: spring(M_Y - M_HEIGHT/2),
	      left: spring(M_X - M_WIDTH/2),
	      height: spring(M_HEIGHT),
	      width: spring(M_WIDTH),
	      borderRadius: spring(10),
	      fontSize: spring(10)
	    };
	}

	visibleMainNodeStyle() {
		const {M_X, M_Y} = this.state.mainNodeProperties;
		const M_DIAM = this.state.childNodeProperties.C_DIAM + 45;
		return {
	      top: spring(M_Y - 100/2),
	      left: spring(M_X - 100/2),
	      height: spring(M_DIAM),
	      width: spring(M_DIAM),
	      borderRadius: spring(M_DIAM),
	      fontSize: spring(5)
	    };
	}

	render() {
		const {M_X, M_Y, M_HEIGHT, M_WIDTH} = this.state.mainNodeProperties;
		
		const mainComponentStyle = {
	      top: spring(M_Y - M_HEIGHT/2),
	      left: spring(M_X - M_WIDTH/2)
	    };
	    
	    let mainButtonStyle = this.props.mainNodeActive ? this.visibleMainNodeStyle(M_X, M_Y) : this.defaultMainNodeStyle();
		const mainClass = "main-button" + (this.props.mainNodeActive ? " isActive" : "");
		return (
			<div>
				{(this.props.childNodes ? this.props.childNodes : []).map( (childNode, index) => {
					let {style, coOrdinates} = this.props.mainNodeActive ? this.visibleNodeStyle(index, M_X, M_Y) : this.defaultNodeStyle(M_X, M_Y);
					const childClass = "child-button transparent-background" + (this.props.mainNodeActive ? " isActive" : "");
					return (
						<Motion style={style} key={index}>
							{
								({width, height, top, left, rotate, x, y}) => (
									<div className='child-container'>
										<div
											onClick={
												() => {
													this.props.onChildNodeClicked(this.props.level, childNode.props.children);
												}
											}	
											className={childClass}
											style={{
												top: top,
												left: left,
												transform: `rotate( ${rotate}deg )`,
												width,
												height,
												borderRadius: width,
												lineHeight: width+"px"
											}}>
											{childNode}	
										</div>	
										{
											this.renderEdge(coOrdinates, x, y)
										}
									</div>
								)
							}
						</Motion>
					);
				})}
				<Motion style={mainButtonStyle}>
				{
					({top, left, height, width, borderRadius, fontSize}) => {
						return (
							<div className={mainClass} style={{
								top: top,
								left: left,
								width: width,
								height: height,
								borderRadius,
								fontSize
							}} onClick={ () => {
								this.props.onMainNodeClicked(this.props.level, true);
							}}>
								{this.props.mainNode}
							</div>
						)
					}
				}	
				</Motion>
			</div>
		);
	}
}

NodeComponent.propTypes = {
	childNodes: PropTypes.array.isRequired,
	mainNode: PropTypes.element.isRequired
}
