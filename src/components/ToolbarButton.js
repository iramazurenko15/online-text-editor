import React from 'react';
import Icon from 'react-icons-kit';
import Button from './Button'


const ToolbarButton = (props) => {

    let isActive;

    if (props.type === 'heading-one' || props.type === 'heading-two') {
        isActive = props.hasBlock(props.type);
        console.log(isActive, '--isActive heading')
    }


    else if (props.type === 'bulleted-list') {
        const { document, blocks } = props.value;

        if (blocks.size > 0) {
            const parent = document.getParent(blocks.first().key);
            isActive = props.hasBlock('list-item') && parent && parent.type === props.type;
            console.log(isActive, '--isActive list');
        }
    }
    else {
        isActive = props.hasMark(props.type);
        console.log(isActive, '--isActive mark')
    }

    return (
        <Button
            type={props.type}
            onButtonClick={props.onButtonClick}
            icon={props.icon}
            active={isActive}
        >
        </Button >
    )

}

export default ToolbarButton