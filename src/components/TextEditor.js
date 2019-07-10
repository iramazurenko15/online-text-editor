import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { BoldMark, ItalicMark, FormatToolbar } from './index';
import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { tsExpressionWithTypeArguments } from '@babel/types';


const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        text: 'A line of text in a paragraph.',
                    },
                ],
            },
        ],
    },
})

export default class TextEditor extends Component {
    state = {
        value: initialValue,
    }

    ref = (editor) => {
        this.editor = editor;
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    onKeyDown = (e, change) => {
        console.log(change, '--change');
        if (!e.ctrlKey) { return };
        e.preventDefault();

        switch (e.key) {
            case 'b': {
                change.toggleMark('bold')
                return true
            }
            case 'i': {
                change.toggleMark('italic')
            }
        }
    }

    onMarkClick = (e, type) => {
        e.preventDefault();
        this.editor.toggleMark(type);
    }



    renderMark = props => {
        console.log(props, '--props');
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark  {...props} />
            case 'italic':
                return <ItalicMark {...props} />

        }
    }

    render() {
        return (
            <Fragment>
                <FormatToolbar>
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'bold')}
                        className="tooltip-icon-button"
                    >
                        <Icon icon={bold} />
                    </button>
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'italic')}
                        className="tooltip-icon-button"
                    >
                        <Icon icon={italic} />
                    </button>
                </FormatToolbar>
                <Editor
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}
                    ref={this.ref}
                />
            </Fragment>

        )
    }
}