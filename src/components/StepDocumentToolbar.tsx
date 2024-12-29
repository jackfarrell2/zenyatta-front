import { FC } from 'react';
import '../styles/Editor.css';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import { IconButton, Divider } from '@mui/material'
import { Editor } from '@tiptap/react';
import Grid from '@mui/material/Grid2'
import FontFamilyButton from './FontFamilyButton';

interface StepDocumentToolbarProps {
    editor: Editor | null
}

const toolbarButtonStyles = (isActive: boolean) => ({
    backgroundColor: isActive ? 'rgb(211, 227, 253)' : 'transparent',
    color: isActive ? 'rgba(0, 0, 128, 0.8)' : 'inherit', // Softer navy color
    borderRadius: '8px', // Rounded corners
});

const StepDocumentToolbar: FC<StepDocumentToolbarProps> = ({ editor }) => {
    return (
        <div className='task-document-toolbar'>
            <Grid container direction='row' justifyContent='' alignItems='center' spacing={1}>
                <IconButton
                    onClick={() => editor?.chain().focus().undo().run()}
                    sx={toolbarButtonStyles(false)} // Always inactive
                    size='small'
                >
                    <UndoIcon fontSize='small' />
                </IconButton>
                <IconButton
                    onClick={() => editor?.chain().focus().redo().run()}
                    sx={toolbarButtonStyles(false)} // Always inactive
                    size='small'
                >
                    <RedoIcon fontSize='small' />
                </IconButton>
                <Divider orientation='vertical' variant='middle' flexItem />
                <FontFamilyButton editor={editor} />
                <Divider orientation='vertical' variant='middle' flexItem />
                <IconButton
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    sx={toolbarButtonStyles(editor?.isActive('bold') || false)} // Active if bold
                    size='small'
                >
                    <FormatBoldIcon fontSize='small' />
                </IconButton>
                <IconButton
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    sx={toolbarButtonStyles(editor?.isActive('italic') || false)} // Active if italic
                    size='small'
                >
                    <FormatItalicIcon fontSize='small' />
                </IconButton>
                <IconButton
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                    sx={toolbarButtonStyles(editor?.isActive('underline') || false)}
                    size='small'
                >
                    <FormatUnderlinedIcon fontSize='small' />
                </IconButton>
                <Divider orientation="vertical" variant="middle" flexItem />
                <IconButton
                    onClick={() => editor?.chain().focus().toggleTaskList().run()}
                    sx={toolbarButtonStyles(editor?.isActive('taskList') || false)}
                    size='small'
                >
                    <ChecklistIcon fontSize='small' />
                </IconButton>
                <IconButton
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    sx={toolbarButtonStyles(editor?.isActive('bulletList') || false)}
                    size='small'
                >
                    <FormatListBulletedIcon fontSize='small' />
                </IconButton>
                <IconButton
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    sx={toolbarButtonStyles(editor?.isActive('orderedList') || false)}
                    size='small'
                >
                    <FormatListNumberedIcon fontSize='small' />
                </IconButton>
                <IconButton
                    onClick={() => editor?.chain().focus().unsetAllMarks().run()}
                    sx={toolbarButtonStyles(false)}
                    size='small'
                >
                    <FormatClearIcon fontSize='small' />
                </IconButton>
            </Grid>
        </div>
    )
}

export default StepDocumentToolbar