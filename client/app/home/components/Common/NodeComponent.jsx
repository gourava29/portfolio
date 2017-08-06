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
const DEG_TO_RAD = 0.0174533;

function toRadians(degrees) {
	return degrees * DEG_TO_RAD;
}

export default class NodeComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			nodeOpen: true
		};

		this.updatePosition = this.updatePosition.bind(this);
    	this.openNodes = this.openNodes.bind(this);
		this.defaultNodeStyle = this.defaultNodeStyle.bind(this);
		this.visibleNodeStyle = this.visibleNodeStyle.bind(this);
		this.finalDeltaPositions = this.finalDeltaPositions.bind(this);

		// The number of child buttons that fly out from the main button
		const NUM_CHILDREN = props.childNodes ? props.childNodes.length : 0;
		this.SEPARATION_ANGLE = 180/(NUM_CHILDREN+1); //degrees
		const FAN_ANGLE = (NUM_CHILDREN - 1) * this.SEPARATION_ANGLE; //degrees
		this.BASE_ANGLE = ((180 - FAN_ANGLE)/2); // degrees
		this.loaded = false;

	}


  	componentWillMount() {
	    this.updatePosition();
  	}

  	updatePosition() {
	    let M_WIDTH, M_HEIGHT, C_DIAM;
	    if(window.innerWidth < 1024){
	      M_WIDTH = mainButtonDimension.mobile.width;
	      M_HEIGHT = mainButtonDimension.mobile.height;
	      C_DIAM = 50;
	    } else {
	      M_WIDTH = mainButtonDimension.desktop.width;
	      M_HEIGHT = mainButtonDimension.desktop.height;
	      C_DIAM = 60;
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
		const fly_out_radius = this.state.mainNodeProperties.M_WIDTH * 2/3;
		return {
			deltaX: fly_out_radius * Math.cos(toRadians(angle)) - (this.state.childNodeProperties.C_DIAM/2),
			deltaY: fly_out_radius * Math.sin(toRadians(angle)) + (this.state.childNodeProperties.C_DIAM/2)
		};
	}

	openNodes() {
		let { nodeOpen } = this.state;
		this.setState({
			nodeOpen: !nodeOpen
		});
	}

	defaultNodeStyle(M_X, M_Y) {
		return { 
			style: {
				top: spring(M_Y - (this.state.childNodeProperties.C_DIAM/2)),
				left: spring(M_X - (this.state.childNodeProperties.C_DIAM/2)),
				rotate: spring(0),
				x: spring(M_X, {stiffness: 123, damping: 18}),
				y: spring(M_Y, {stiffness: 123, damping: 18})
			},
			coOrdinates: {
				x1: M_X,
				y1: M_Y
			}
		};
	}

	visibleNodeStyle(childIndex, M_X, M_Y) {
		let{deltaX, deltaY} = this.finalDeltaPositions(childIndex);
		return {
			style:{
				left: spring(M_X + deltaX, {stiffness: 123, damping: 18}),
				top: spring(M_Y - deltaY, {stiffness: 123, damping: 18}),
				rotate: spring(360, {stiffness: 123, damping: 18}),
				x: spring(M_X + deltaX + this.state.childNodeProperties.C_DIAM/2, {stiffness: 123, damping: 18}),
				y: spring(M_Y - deltaY + this.state.childNodeProperties.C_DIAM/2, {stiffness: 123, damping: 18})

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

	render() {
		const {M_X, M_Y, M_HEIGHT, M_WIDTH} = this.state.mainNodeProperties;
		
		const mainComponentStyle = {
	      position: 'fixed',
	      top: M_Y - M_HEIGHT/2,
	      left: M_X - M_WIDTH/2
	    };
	    
	    if(!this.loaded) {
	    	setTimeout(() => {
	    		this.openNodes();
	    	}, 500);
	    	this.loaded = true;
	    }

		return (
			<div>
				{(this.props.childNodes ? this.props.childNodes : []).map( (childNode, index) => {
					let {style, coOrdinates} = this.state.nodeOpen ? this.visibleNodeStyle(index, M_X, M_Y) : this.defaultNodeStyle(M_X, M_Y);
					return (
						<Motion style={style} key={index}>
							{
								({width, height, top, left, rotate, x, y}) => {
									return (
										<div>
											<div	
												className="child-button transparent-background"
												style={{
													top: top,
													left: left,
													transform: `rotate( ${rotate}deg )`,
												}}>
												{childNode}	
											</div>	
											{
												this.renderEdge(coOrdinates, x, y)
											}
										</div>
									)
								}
							}
						</Motion>
					);
				})}
				<div className="main-button" style={mainComponentStyle} onClick={this.openNodes}>
					{this.props.mainNode}
				</div>
			</div>
		);
	}
}

NodeComponent.propTypes = {
	childNodes: PropTypes.array.isRequired,
	mainNode: PropTypes.element.isRequired
}
