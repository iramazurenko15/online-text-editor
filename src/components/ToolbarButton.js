import React from 'react';
import Icon from 'react-icons-kit';


const ToolbarButton = (props) => {
    const isActive = props.hasMark(props.type)
    console.log(isActive, 'active');
    return (
        <button
            onPointerDown={(e) => props.onMarkClick(e, props.type)}
            className={!isActive ? "tooltip-icon-button" : "tooltip-icon-button active-button"}
        >
            <Icon icon={props.icon} />
        </button >
    )

}

export default ToolbarButton