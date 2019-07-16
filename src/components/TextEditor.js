import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { ToolbarButton } from './index';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { underline } from 'react-icons-kit/feather/underline';
import { u0031 } from 'react-icons-kit/noto_emoji_regular/u0031';
import { u0032 } from 'react-icons-kit/noto_emoji_regular/u0032';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';


import { isKeyHotkey } from 'is-hotkey'

const DEFAULT_NODE = 'paragraph';
const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')


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
        { type: 'heading-one', icon: u0031 }, { type: 'heading-two', icon: u0032 },
        { type: 'bulleted-list', icon: list }, { type: 'code', icon: code }]
    }

    hasMark = type => {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type)
    }

    hasBlock = type => {
        //  console.log(type, '----type');
        const { value } = this.state;
        return value.blocks.some(node => {
            // console.log(node.type, '--node.type');
            return node.type === type
        })
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }

    onKeyDown = (e, editor, next) => {
        if (isBoldHotkey(e)) {
            e.preventDefault();
            editor.toggleMark('bold')
        }
        else if (isItalicHotkey(e)) {
            e.preventDefault();
            editor.toggleMark('italic')
        }
        else if (isUnderlinedHotkey(e)) {
            e.preventDefault();
            editor.toggleMark('underline')
        }
        else {
            return next()
        }

    }

    onButtonClick = (e, type) => {

        e.preventDefault();
        const { editor } = this
        const { value } = editor
        const { document } = value

        if (type === 'bulleted-list') {
            const isList = this.hasBlock('list-item');
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            })

            if (isList && isType) {
                editor
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
            } else if (isList) {
                editor
                    .unwrapBlock('bulleted-list')
                    .wrapBlock(type)
            } else {
                editor.setBlocks('list-item').wrapBlock(type)
            }
        }

        else if (type === "heading-one" || type === "heading-two") {
            const isActive = this.hasBlock(type);
            editor.setBlocks(isActive ? DEFAULT_NODE : type)
        }
        else {
            editor.toggleMark(type)
        }
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

            case 'code': {
                return (
                    <code>{props.children}</code>
                )
            }
        }
    }

    renderBlock = (props, editor, next) => {
        const { attributes, children, node } = props
        switch (node.type) {
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>

            default:
                return next()
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
                                onButtonClick={this.onButtonClick}
                                hasMark={this.hasMark}
                                hasBlock={this.hasBlock}
                                value={this.state.value}
                            />
                        )
                    })}
                </div>

                <Editor
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}
                    renderBlock={this.renderBlock}
                    ref={editor => this.editor = editor}
                />
            </Fragment>

        )
    }
}