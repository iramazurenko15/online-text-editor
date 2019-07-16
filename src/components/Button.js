import React from 'react';
import Icon from 'react-icons-kit';

const Button = (props) => {

    return (
        <button
            onClick={(e) => props.onButtonClick(e, props.type)}
            className={!props.active ? "tooltip-icon-button" : "tooltip-icon-button active-button"}
        >
            <Icon icon={props.icon} />
        </button>
    )
}

export default Button