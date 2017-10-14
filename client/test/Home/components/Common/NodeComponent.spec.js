import React from 'react';
import {Motion, spring} from 'react-motion';

import NodeComponent from '../../../../app/home/components/Common/NodeComponent';

describe('NodeComponent', () => {

	// Value of 1 degree in radians
	const DEG_TO_RAD = Math.PI/50;
	const damping = 18;

	function toRadians(degrees) {
		return degrees * DEG_TO_RAD;
	}
	let childNodeSpy, mainNodeSpy, props, wrapper, wrapperInstance;
	
	before(() => {
		childNodeSpy = spy();
		mainNodeSpy = spy();
		props = {
			mainNode: (<div>Test</div>),
			childNodes: [ (<div>child1</div>), (<div>child2</div>)],
			mainNodeActive: false, 
			onChildNodeClicked:childNodeSpy,
			onMainNodeClicked:mainNodeSpy
		};
	
		wrapper = shallow(<NodeComponent {...props}/>);
		wrapperInstance = wrapper.instance();
	});

	describe('has properties', () => {
		const errorSpy = spy(console, "error");
		it('throws error on no mainNode', () => {
			const noMainNodeProps = {...props, mainNode: undefined}
			const nodeComponent = mount(<NodeComponent {...noMainNodeProps}/>);
			expect(errorSpy.calledWithMatch("Warning: Failed prop type: The prop `mainNode` is marked as required in `NodeComponent`")).to.be.true;
		});

		it('throws error on no childNodes', () => {
			const noChildNodeProps = {...props, childNodes: undefined}
			const nodeComponent = mount(<NodeComponent {...noChildNodeProps}/>);
			expect(errorSpy.calledWithMatch("Warning: Failed prop type: The prop `childNodes` is marked as required in `NodeComponent`")).to.be.true;
		});
	});

	it('render', () => {
		// check child elements

		const motionEls = wrapper.find(Motion);
		const childComponentCount = props.childNodes.length;

		const childContainerComponent = motionEls.findWhere(n => n.dive().hasClass("child-container"));
		expect(childContainerComponent).to.have.length(childComponentCount);

		childContainerComponent.forEach((childButtonComp, index) => {
			const {M_X, M_Y} = wrapperInstance.state.mainNodeProperties;
			expect(childButtonComp.props().style).to.deep.equal(wrapperInstance.defaultNodeStyle(M_X, M_Y).style);
			expect(childButtonComp.dive().find(".child-button").first().html()).contains(shallow(props.childNodes[index]).html());
		});

		const mainButtonComponent = motionEls.findWhere(n => n.dive().hasClass("main-button"));
		expect(mainButtonComponent).to.have.length(1);	
		
		const mainComponentStyle = wrapperInstance.defaultMainNodeStyle();

		expect(mainButtonComponent.props().style).to.deep.equal(mainComponentStyle);
		expect(mainButtonComponent.html()).contains(shallow(props.mainNode).html());
	});	

	it('when mainNodeActive is true', () => {
		const mainNodeActiveProps = {...props, mainNodeActive: true};
		const nodeCompWrapper = shallow(<NodeComponent {...mainNodeActiveProps}/>);
		const nodeWrapperInstance = nodeCompWrapper.instance();
		const motionEls = nodeCompWrapper.find(Motion);
		const childComponentCount = props.childNodes.length;

		const childContainerComponent = motionEls.findWhere(n => n.dive().hasClass("child-container"));
		expect(childContainerComponent).to.have.length(childComponentCount);

		childContainerComponent.forEach((childButtonComp, index) => {
			const {M_X, M_Y} = nodeWrapperInstance.state.mainNodeProperties;
			expect(childButtonComp.props().style).to.deep.equal(nodeWrapperInstance.visibleNodeStyle(index, M_X, M_Y).style);
			expect(childButtonComp.dive().find(".child-button").first().html()).contains(shallow(props.childNodes[index]).html());
		});

		const mainButtonComponent = motionEls.findWhere(n => n.dive().hasClass("main-button"));
		expect(mainButtonComponent).to.have.length(1);	
		
		const mainComponentStyle = nodeWrapperInstance.visibleMainNodeStyle();

		expect(mainButtonComponent.props().style).to.deep.equal(mainComponentStyle);
		expect(mainButtonComponent.html()).contains(shallow(props.mainNode).html());
	});

	it('render', () => {
		// check child elements

		const motionEls = wrapper.find(Motion);
		const childComponentCount = props.childNodes.length;

		const childContainerComponent = motionEls.findWhere(n => n.dive().hasClass("child-container"));
		expect(childContainerComponent).to.have.length(childComponentCount);

		childContainerComponent.forEach((item, index) => {
			expect(item.dive().find(".child-button").first().html()).contains(shallow(props.childNodes[index]).html());
		});

		const mainButtonComponent = motionEls.findWhere(n => n.dive().hasClass("main-button"));
		expect(mainButtonComponent).to.have.length(1);	
		
		const mainComponentStyle = wrapperInstance.props.mainNodeActive ? wrapperInstance.visibleMainNodeStyle() : wrapperInstance.defaultMainNodeStyle();

		expect(mainButtonComponent.props().style).to.deep.equal(mainComponentStyle);
		expect(mainButtonComponent.html()).contains(shallow(props.mainNode).html());
	});

	it('has mainNodeProperties in state', () => {
		const state = wrapperInstance.state;
    	expect(state.mainNodeProperties).to.not.be.undefined;
      	expect(state.mainNodeProperties.M_X, 'has MX').to.not.be.undefined;
      	expect(state.mainNodeProperties.M_Y, 'has M_Y').to.not.be.undefined;
      	expect(state.mainNodeProperties.M_WIDTH, 'has M_WIDTH').to.not.be.undefined;
      	expect(state.mainNodeProperties.M_HEIGHT, 'has M_HEIGHT').to.not.be.undefined;
    });

    it('contains childNodeProperties prop', () => {
    	const state = wrapperInstance.state;
      	expect(state.childNodeProperties).to.not.be.undefined;
    });

    
	it('calls updatePosition on componentWillMount', () => {
	    const mainComponentInstance = wrapper.instance();
	    const renderMainNodeSpy = spy(mainComponentInstance, 'updatePosition');
	    mainComponentInstance.componentWillMount();
	    expect(renderMainNodeSpy.calledOnce).to.be.true;
  	});

  	it('calls updatePosition on screen resize', () => {
	    const updatePositionSpy = spy(NodeComponent.prototype, 'updatePosition');
	    const app = mount(<NodeComponent {...props}/>, {attachTo: global.document.getElementById('root')});
	    global.window.resizeTo(1025, 1025);
	    //called twice because once it is called on initializtion and next on window resize
	    expect(updatePositionSpy.calledTwice).to.be.true;
  	});

  	it('state changes on updatePosition', () => {
	    const app = mount(<NodeComponent {...props}/>, {attachTo: global.document.getElementById('root')});
	    const previousState = app.instance().state;

	    let resizeWidth = 1023;
	    global.window.resizeTo(resizeWidth, 400);
	    let newState = app.instance().state;
	    expect(newState).to.not.deep.equal(previousState);
	    expect(newState.childNodeProperties.C_DIAM).to.equals(60);
	    expect(newState.mainNodeProperties.M_X).to.equals(resizeWidth/2);

	    resizeWidth = 1025;
	    global.window.resizeTo(resizeWidth, 400);
	    newState = app.instance().state;
	    expect(newState.mainNodeProperties.M_X).to.equals(resizeWidth/2);
  	});
	   
	  
	it('finalDeltaPositions', () => {
		const getDeltaPosition = (index) => {
			const angle = wrapperInstance.BASE_ANGLE + ( index * wrapperInstance.SEPARATION_ANGLE );
			const deltaX = wrapperInstance.fly_out_radius * Math.cos(toRadians(angle)) - (wrapperInstance.state.childNodeProperties.C_DIAM/2);
			const deltaY = wrapperInstance.fly_out_radius * Math.sin(toRadians(angle)) + (wrapperInstance.state.childNodeProperties.C_DIAM/2);
			return {deltaX, deltaY};
		}
		
		expect(wrapperInstance.finalDeltaPositions(0)).to.deep.equal(getDeltaPosition(0));
		expect(wrapperInstance.finalDeltaPositions(1)).to.deep.equal(getDeltaPosition(1));
	});

	it('defaultNodeStyle', () => {
		const M_X = 10;
		const M_Y = 20;
		
		const expectedResult = {
			style: {
				top: spring(M_Y - (wrapperInstance.state.childNodeProperties.C_DIAM/2)),
				left: spring(M_X - (wrapperInstance.state.childNodeProperties.C_DIAM/2)),
				rotate: spring(0),
				x: spring(M_X, {stiffness: 120, damping}),
				y: spring(M_Y, {stiffness: 120, damping}),
				height: 70,
				width: 70
			},
			coOrdinates: {
				x1: M_X,
				y1: M_Y
			}
	    };
	    expect(wrapperInstance.defaultNodeStyle(M_X, M_Y)).to.deep.equal(expectedResult);
	});

	it('visibleNodeStyle', () => {
		const M_X = 10;
		const M_Y = 20;
		const deltaX = 10;
		const deltaY = 10;
		stub(wrapperInstance, 'finalDeltaPositions').callsFake(() => ({deltaX, deltaY}))
		const expectedResult = {
			style:{
				left: spring(M_X + deltaX, {stiffness: 120, damping}),
				top: spring(M_Y - deltaY, {stiffness: 120, damping}),
				rotate: spring(360, {stiffness: 120, damping}),
				x: spring(M_X  + deltaX + wrapperInstance.state.childNodeProperties.C_DIAM/2, {stiffness: 120, damping}),
				y: spring(M_Y - deltaY + wrapperInstance.state.childNodeProperties.C_DIAM/2, {stiffness: 120, damping}),
				height: 70,
				width: 70
			},
			coOrdinates : {
				x1: M_X,
				y1: M_Y
			}
		};
		expect(wrapperInstance.visibleNodeStyle(0, M_X, M_Y)).to.deep.equal(expectedResult);
	});

	it('defaultMainNodeStyle', () => {
		const {M_X, M_Y, M_HEIGHT, M_WIDTH} = wrapperInstance.state.mainNodeProperties;
		const expectedResult = {
	      top: spring(M_Y - M_HEIGHT/2),
	      left: spring(M_X - M_WIDTH/2),
	      height: spring(M_HEIGHT),
	      width: spring(M_WIDTH),
	      borderRadius: spring(10),
	      fontSize: spring(10)
	    };

	    expect(wrapperInstance.defaultMainNodeStyle()).to.deep.equal(expectedResult);
	});

	it('visibleMainNodeStyle', () => {
		const {M_X, M_Y} = wrapperInstance.state.mainNodeProperties;
		return {
	      top: spring(M_Y - 100/2),
	      left: spring(M_X - 100/2),
	      height: spring(100),
	      width: spring(100),
	      borderRadius: spring(100),
	      fontSize: spring(5)
	    };
		expect(wrapperInstance.visibleMainNodeStyle()).to.deep.equal(expectedResult);
	});

	describe('renderEdge', () => {
		const coOrdinates = {x1: 1, y1: 2};
		const x = 3, y = 5;
		it('returns blank when showEdge false', () => {
			expect(wrapperInstance.renderEdge(coOrdinates, x, y)).to.equal("");
		});

		it('returns svg line when showEdge true', () => {
			wrapper.setProps({showEdges: true});
			const edge = shallow(wrapperInstance.renderEdge(coOrdinates, x, y));
			expect(edge.hasClass('svgLine')).to.be.true;
			const svgEl = edge.find("svg");
			const svgProps = svgEl.props();
			expect(svgProps.width).to.equal("100%");
			expect(svgProps.height).to.equal("100%");
			const line = svgEl.find("line");
			const expectedLineProps = {
				...coOrdinates,
			  	x2: x,
			  	y2: y,
			  	style: { stroke: 'white', strokeWidth: 2 }
			}
			expect(line.props()).to.deep.equal(expectedLineProps);
		});
	});

	it('calls onMainNodeClicked on click of mainButton', () => {
		const motionEls = wrapper.find(Motion);
		let mainButtonComponent = motionEls.findWhere(n => n.dive().hasClass("main-button"));
		mainButtonComponent.dive().find(".main-button").simulate("click");
		expect(mainNodeSpy.calledOnce).to.be.true;
	});
});