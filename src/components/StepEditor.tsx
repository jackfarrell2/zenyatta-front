import { FC } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import '../styles/Editor.css';
import StarterKit from '@tiptap/starter-kit';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import ImageResize from 'tiptap-extension-resize-image';
import StepDocumentToolbar from './StepDocumentToolbar';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';


const StepEditor: FC = () => {
    const editor = useEditor({
        editorProps: {
            attributes: {
                style: 'padding-left: 56px; padding-right: 56px;',
                class: 'editor-props-class'
            },
        },
        extensions: [
            StarterKit,
            FontFamily,
            TextStyle,
            Underline,
            ImageResize,
            Table,
            TableCell,
            TableHeader,
            TableRow,
            TaskItem.configure({
                nested: true,
            }),
            TaskList,
        ],
        content: `
        yerrrr
      `,
    })

    return (
        <>
            <StepDocumentToolbar editor={editor} />
            <div className='editor-container'>
                <div className='editor-content'>
                    <EditorContent editor={editor} />
                </div>
            </div>
        </>
    )
}

export default StepEditor