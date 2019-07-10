import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { FormatToolbar } from './index';
import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { underline } from 'react-icons-kit/feather/underline';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';




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
        console.log(editor, '----editor');
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
            case 'u': {
                change.toggleMark('underline')
            }
            case 'l': {
                change.toggleMark('list')
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
            case 'bold': {
                return (
                    <strong>{props.children}</strong>
                )

            }
            case 'italic': {
                return (
                    <em property='italic'>{props.children}</em >
                )
            }
            case 'underline': {
                console.log('underline');
                return (
                    <span style={{ textDecoration: 'underline' }
                    }>{props.children}</span >
                )
            }
            case 'list': {
                return (
                    <ul {...props.attributes}>
                        <li>{props.children}</li>
                    </ul>
                )
            }
            case 'code': {
                return (
                    <code>{props.children}</code>
                )
            }

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
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'underline')}
                        className="tooltip-icon-button"
                    >
                        <Icon icon={underline} />
                    </button>
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'code')}
                        className="tooltip-icon-button"
                    >
                        <Icon icon={code} />
                    </button>
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'list')}
                        className="tooltip-icon-button"
                    >
                        <Icon icon={list} />
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