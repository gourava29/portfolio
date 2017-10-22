import React from 'react';
import {Motion, spring} from 'react-motion';
import { connect } from 'react-redux';
import Constant from '../../constants';
import classNames from 'classnames';

const { modal } = Constant;

class Modal extends React.Component{
    constructor(props) {
        super(props);
        this.getCompById = this.getCompById.bind(this);
        this.getComp = this.getComp.bind(this);
        this.comp = null;
    }
    
    getCompById(name, data, id) {
        let comp = null;
        if(name.toLowerCase() == data.name.toLowerCase()) {
          comp = this.getComp(data, id);
        } else {
          for(var key in data.relationships){
            const relData = data.relationships[key];
            comp = this.getCompById(name, relData, id);
            if(comp != null)
              break;
          }
        }
        return comp;
    }
    
    getComp(data, id) {
        let comp = null;
        if(data.relationships){
            for(var key in data.relationships){
                const relData = data.relationships[key];
                if(relData.id == id){
                    comp = relData;
                    break;
                }
            }
        }
        return comp;
    }
      
    render() {
        const style = {
	      height: spring(modal.height),
	      width: spring(modal.width)
	    };
	    const routeId = this.props.match.params.id;
	    const name = routeId.split("-")[0];
	    const id = routeId.split("-")[1];
	    const comp = this.props.currentRoute || this.getCompById(name, this.props, id);
	    const title = ( comp && comp != null ) ? comp.name : name;
	    const description = ( comp && comp != null ) ? comp.description : description;
	    const modalComp = (
	        this.props.currentRoute ?
	            <div className="container">
                    <div className='title'>{title}</div>
                </div>
            :   <div className="loader">Loading...</div>
        );
        let childComp = [];
        for(var key in comp) {
            const childCompArr = comp[key];
            if(childCompArr instanceof Array){
                childComp.push(
                    <div key={key} className="child-comp">
                        <div className="title">{key}</div>
                        {
                            childCompArr.map((childCompObj, index) => 
                                <div key={`sub-child-${index}`} className="sub-child-comp">
                                    <div className="title">{childCompObj.name}</div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        }
        return (
            <Motion defaultStyle={{height: 0, width: 0}}  style={style}>
            	{
					({width, height}) => (
		                <div className="route-modal" style={{height: height+"vh", width: width+"%"}}>
                            <div className="container">
                                <div className='title'>{title}</div>
                                <div className='description'>{description}</div>
                            </div>
                            {
                                this.props.currentRoute ? <div className='childContainer'>{childComp}</div> : <div className="loader"></div>   
                            }
                        </div>
					)
            	}
            </Motion>
        );
        
    }
}
const mapStateToProps = (state) => ({ ...state.route, ...state.main });
export default connect(mapStateToProps, null)(Modal);

