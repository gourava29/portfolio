import React from 'react';
import classnames from 'classnames';

export default class Accordion extends React.Component {
    
    constructor(props) {
        super(props);
        this.onAccClick = this.onAccClick.bind(this);
        this.state = {
          isOpen: props.isOpen
        };
    }
    
    onAccClick() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    render() {
        const accContentClass = classnames("acc-content", {
            "open": this.state.isOpen
        });
        const toggleIconClass = classnames("fa", {
            "fa-chevron-down": !this.state.isOpen,
            "fa-chevron-up": this.state.isOpen
        });
        return (
            <div>
                <div className="title acc-title" onClick={this.onAccClick}><span className={toggleIconClass}></span>{this.props.title}</div>
                <div className={accContentClass}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}