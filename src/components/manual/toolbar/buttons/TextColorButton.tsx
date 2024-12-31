import React, { FC, useState } from 'react';
import { Editor } from '@tiptap/react';
import { FormControl, IconButton, Popper, Paper } from '@mui/material';
import '../../../../styles/Editor.css';
import { type ColorResult, CirclePicker } from 'react-color';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { ClickAwayListener } from '@mui/material';

interface TextColorButtonProps {
    editor: Editor | null
}

const toolbarButtonStyles = (isActive: boolean) => ({
    backgroundColor: isActive ? 'rgb(211, 227, 253)' : 'transparent',
    color: isActive ? 'rgba(0, 0, 128, 0.8)' : 'inherit', // Softer navy color
    borderRadius: '8px', // Rounded corners
});

const TextColorButton: FC<TextColorButtonProps> = ({ editor }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const value = editor?.getAttributes('textStyle').color || '#000000';

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const onColorChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run()
        setAnchorEl(null);
    }

    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <FormControl size='small'>
                <IconButton onClick={handleClick} className='button-base' size='small' sx={toolbarButtonStyles(false)}>
                    <FormatColorTextIcon fontSize='small' sx={{ color: value !== '#000000' ? value : 'inherit' }} />
                </IconButton>

                <Popper open={open} anchorEl={anchorEl} placement='bottom-start'>
                    <Paper elevation={3} sx={{ p: 1, mt: 1 }}>
                        <CirclePicker colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#000000"]} color={value} onChange={onColorChange} />
                    </Paper>
                </Popper>
            </FormControl>
        </ClickAwayListener>
    );
}

export default TextColorButton