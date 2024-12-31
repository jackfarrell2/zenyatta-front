import React, { FC } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import '../../styles/Editor.css';
import StarterKit from '@tiptap/starter-kit';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import ImageResize from 'tiptap-extension-resize-image';
import StepDocumentToolbar from '../manual/toolbar/StepDocumentToolbar';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { FontSizeExtension } from '../../utils/font-size';
import { LineHeightExtension } from '../../utils/line-height';

const StepEditor: FC = () => {
    const editor = useEditor({
        editorProps: {
            attributes: {
                style: 'padding-top: 56px; padding-bottom: 56px; padding-left: 78px; padding-right: 78px;',
                class: 'editor-props-class'
            },
            handlePaste: (view, event, slice) => {
                const items = Array.from(event.clipboardData?.items || []);
                const imageItem = items.find(item => item.type.startsWith('image'));

                if (imageItem) {
                    event.preventDefault();
                    const file = imageItem.getAsFile();

                    if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        // Insert the image at current cursor position
                        editor?.chain().focus().setImage({ src: imageUrl }).run();
                        return true;
                    }
                }
                return false;
            },
        },
        extensions: [
            StarterKit,
            FontSizeExtension,
            LineHeightExtension.configure({
                types: ['heading', 'paragraph'],
                defaultLineHeight: 'normal'
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                autolink: true,
                defaultProtocol: 'https'
            }),
            Color,
            Highlight.configure({
                multicolor: true
            }),
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
        yerrrr\ngsd
      `,
    })

    // Clean up object URLs when component unmounts
    React.useEffect(() => {
        return () => {
            // Find all image elements in the editor
            const images = document.querySelectorAll('.editor-props-class img');
            images.forEach(img => {
                const src = img.getAttribute('src');
                if (src?.startsWith('blob:')) {
                    URL.revokeObjectURL(src);
                }
            });
        };
    }, []);

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