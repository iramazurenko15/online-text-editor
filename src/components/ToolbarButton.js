import React from 'react';
import Icon from 'react-icons-kit';


const ToolbarButton = (props) => {
    let isActive;

    if (props.type === 'heading-one' || props.type === 'heading-two') {
        isActive = props.hasBlock(props.type);
    }

    if (props.type === 'bulleted-list') {
        isActive = props.hasBlock(props.type);
        const { document, blocks } = props.value;

        if (blocks.size > 0) {
            console.log(blocks.size, '---blocks.size')
            const parent = document.getParent(blocks.first().key)
            isActive = props.hasBlock('list-item') && parent && parent.type === props.type
        }
    }
    else {
        isActive = props.hasMark(props.type)
    }

    return (
        <button
            onPointerDown={(e) => props.onButtonClick(e, props.type)}
            className={!isActive ? "tooltip-icon-button" : "tooltip-icon-button active-button"}
        >
            <Icon icon={props.icon} />
        </button >
    )

}

export default ToolbarButton