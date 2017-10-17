import React from 'react';

const ChildNode = (props) => {
    const itemName = props.name;
    return (
        <div title={itemName.toUpperCase()}>{itemName.split(" ")[0].toUpperCase()}</div>
    )
}

export default ChildNode;