import React from 'react';
import {Motion, spring} from 'react-motion';

import NodeComponent from '../../../../app/home/components/Common/NodeComponent';

describe('NodeComponent', () => {
	const props = {
		mainNode: (<div>Test</div>),
		childNodes: [ (<div>child1</div>), (<div>child2</div>)]
	};

	const wrapper = shallow(<NodeComponent {...props}/>);
	const wrapperInstance = wrapper.instance();

	describe('has properties', () => {
		const errorSpy = spy(console, "error");
		it('throws error on no mainNode', () => {
			const nodeComponent = mount(<NodeComponent childNodes={props.childNodes}/>);
			expect(errorSpy.calledWithMatch("Warning: Failed prop type: The prop `mainNode` is marked as required in `NodeComponent`")).to.be.true;
		});

		it('throws error on no childNodes', () => {
			const nodeComponent = mount(<NodeComponent mainNode={props.mainNode}/>);
			expect(errorSpy.calledWithMatch("Warning: Failed prop type: The prop `childNodes` is marked as required in `NodeComponent`")).to.be.true;
		});
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
	    expect(newState.childNodeProperties.C_DIAM).to.equals(50);
	    expect(newState.mainNodeProperties.M_X).to.equals(resizeWidth/2);

	    resizeWidth = 1025;
	    global.window.resizeTo(resizeWidth, 400);
	    newState = app.instance().state;
	    expect(newState.mainNodeProperties.M_X).to.equals(resizeWidth/2);
  	});
	   
	  
	it('finalDeltaPositions', () => {
		expect(wrapperInstance.finalDeltaPositions(0)).to.deep.equal({ deltaX: 103.33322968661386, deltaY: 260.94016751628067 })
		expect(wrapperInstance.finalDeltaPositions(1)).to.deep.equal({ deltaX: -163.33354062669176, deltaY: 260.93998799484996 });
	});

	it('openNode', () => {
		const nodeOpen = wrapperInstance.state.nodeOpen;
		wrapperInstance.openNodes();
		expect(wrapperInstance.state.nodeOpen).to.equal(!nodeOpen);
	});

	it('defaultNodeStyle', () => {
		const M_X = 10;
		const M_Y = 20;
		
		const expectedResult = {
			style: {
				top: spring(M_Y - (wrapperInstance.state.childNodeProperties.C_DIAM/2)),
				left: spring(M_X - (wrapperInstance.state.childNodeProperties.C_DIAM/2)),
				rotate: spring(0),
				x: spring(M_X, {stiffness: 123, damping: 18}),
				y: spring(M_Y, {stiffness: 123, damping: 18})
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
				left: spring(M_X + deltaX, {stiffness: 123, damping: 18}),
				top: spring(M_Y - deltaY, {stiffness: 123, damping: 18}),
				rotate: spring(360, {stiffness: 123, damping: 18}),
				x: spring(M_X  + deltaX + wrapperInstance.state.childNodeProperties.C_DIAM/2, {stiffness: 123, damping: 18}),
				y: spring(M_Y - deltaY + wrapperInstance.state.childNodeProperties.C_DIAM/2, {stiffness: 123, damping: 18})

			},
			coOrdinates : {
				x1: M_X,
				y1: M_Y
			}
		};
		expect(wrapperInstance.visibleNodeStyle(0, M_X, M_Y)).to.deep.equal(expectedResult);
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

	it.only('render', () => {
		//check child elements
		const motionEls = wrapper.find("Motion");
		expect(motionEls).to.have.length(props.childNodes.length);
		motionEls.forEach((item, index) => {
			expect(item.html()).contains(shallow(props.childNodes[index]).html());
		})
	
		//check main button
		const mainButton = wrapper.find(".main-button");
		expect(mainButton).to.have.length(1);
		const {M_X, M_Y, M_HEIGHT, M_WIDTH} = wrapperInstance.state.mainNodeProperties;
		const mainComponentStyle = {
	      position: 'fixed',
	      top: M_Y - M_HEIGHT/2,
	      left: M_X - M_WIDTH/2
	    };
		expect(mainButton.props().style).to.deep.equal(mainComponentStyle)
		expect(mainButton.children().node).to.equal(props.mainNode);
	})
});