import React, { FC, useState } from 'react';
import { Editor } from '@tiptap/react';
import { FormControl, IconButton, Popper, Paper } from '@mui/material';
import '../../../../styles/Editor.css';
import { type ColorResult, SketchPicker } from 'react-color';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { ClickAwayListener } from '@mui/material';

interface HighlightColorButtonProps {
    editor: Editor | null
}

const toolbarButtonStyles = (isActive: boolean) => ({
    backgroundColor: isActive ? 'rgb(211, 227, 253)' : 'transparent',
    color: isActive ? 'rgba(0, 0, 128, 0.8)' : 'inherit', // Softer navy color
    borderRadius: '8px', // Rounded corners
});

const HighlightColorButton: FC<HighlightColorButtonProps> = ({ editor }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const value = editor?.getAttributes('highlight').color || '#FFFFFF';

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const onHighlightChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run()
        setAnchorEl(null);
    }

    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <FormControl size='small'>
                <IconButton onClick={handleClick} className='button-base' size='small' sx={toolbarButtonStyles(false)}>
                    <BorderColorIcon fontSize='small' sx={{ color: value === '#FFFFFF' || value === '#000000' || value === '#ffffff' ? '#000000' : value }} />
                </IconButton>

                <Popper open={open} anchorEl={anchorEl} placement='bottom-start'>
                    <Paper elevation={3} sx={{ p: 1, mt: 1 }}>
                        <SketchPicker color={value} onChange={onHighlightChange} />
                    </Paper>
                </Popper>
            </FormControl>
        </ClickAwayListener>
    );
}

export default HighlightColorButton