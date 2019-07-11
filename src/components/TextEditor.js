import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { ToolbarButton } from './index';
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
        iconsArr: [{ type: 'bold', icon: bold }, { type: 'italic', icon: italic }, { type: 'underline', icon: underline },
        { type: 'list', icon: list }, { type: 'code', icon: code }]
    }

    hasMark = type => {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type)
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    onKeyDown = (e, editor) => {
        console.log(editor, 'editor');

        if (!e.ctrlKey) { return };

        switch (e.key) {
            case 'b': {
                e.preventDefault();
                editor.toggleMark('bold')
                return true
            }
            case 'i': {
                e.preventDefault();
                editor.toggleMark('italic')
                return true
            }
            case 'u': {
                e.preventDefault();
                editor.toggleMark('underline')
                return true
            }
            case 'l': {
                e.preventDefault();
                editor.toggleMark('list')
                return true
            }
        }
    }

    onMarkClick = (e, type) => {
        e.preventDefault();
        this.editor.toggleMark(type);

    }



    renderMark = props => {
        console.log(props)
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
                <div className="format-toolbar">
                    {this.state.iconsArr.map(item => {
                        return (
                            <ToolbarButton
                                type={item.type}
                                icon={item.icon}
                                onMarkClick={this.onMarkClick}
                                hasMark={this.hasMark}
                            />
                        )
                    })}
                </div>

                <Editor
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}
                    ref={editor => this.editor = editor}
                />
            </Fragment>

        )
    }
}