import React from 'react';
import { FC } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import '../styles/Editor.css'

const Editor: FC = () => {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'editor-props-class'
            },
        },
        extensions: [StarterKit],
        content: '<p>Hello World!</p>'
    })
    return (
        <div className='editor-container'>
            <div className='editor-content'>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default Editor