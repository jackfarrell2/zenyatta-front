import React, { FC } from 'react';
import { Editor } from '@tiptap/react';
import { FormControl, IconButton, Paper, Popper, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { ClickAwayListener } from '@mui/material';


interface AlignButtonProps {
    editor: Editor | null
}

const toolbarButtonStyles = (isActive: boolean) => ({
    backgroundColor: isActive ? 'rgb(211, 227, 253)' : 'transparent',
    color: isActive ? 'rgba(0, 0, 128, 0.8)' : 'inherit', // Softer navy color
    borderRadius: '8px', // Rounded corners
});


const AlignButton: FC<AlignButtonProps> = ({ editor }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log('opening centerd content anchor')
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }


    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <FormControl size='small'>
                <IconButton onClick={handleClick} className='button-base' size='small' sx={toolbarButtonStyles(false)}>
                    <FormatAlignLeftIcon fontSize='small' />
                </IconButton>

                <Popper open={open} anchorEl={anchorEl} placement='bottom-start'>
                    <Paper elevation={3} sx={{ p: 1, mt: 1 }}>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <nav>
                                <List>
                                    {/* Left */}
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => {
                                            editor?.chain().focus().setTextAlign('left').run()
                                            setAnchorEl(null)
                                        }}>
                                            <ListItemIcon>
                                                <FormatAlignLeftIcon fontSize='small' />
                                            </ListItemIcon>
                                            <ListItemText primary="Align Left" />
                                        </ListItemButton>
                                    </ListItem>
                                    {/* Center */}
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => {
                                            editor?.chain().focus().setTextAlign('center').run()
                                            setAnchorEl(null)
                                        }}>
                                            <ListItemIcon>
                                                <FormatAlignCenterIcon fontSize='small' />
                                            </ListItemIcon>
                                            <ListItemText primary="Align Center" />
                                        </ListItemButton>
                                    </ListItem>
                                    {/* Right */}
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => {
                                            editor?.chain().focus().setTextAlign('right').run()
                                            setAnchorEl(null)
                                        }}>
                                            <ListItemIcon>
                                                <FormatAlignRightIcon fontSize='small' />
                                            </ListItemIcon>
                                            <ListItemText primary="Align Right" />
                                        </ListItemButton>
                                    </ListItem>
                                    {/* Justify */}
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => {
                                            editor?.chain().focus().setTextAlign('justify').run()
                                            setAnchorEl(null)
                                        }}>
                                            <ListItemIcon>
                                                <FormatAlignJustifyIcon fontSize='small' />
                                            </ListItemIcon>
                                            <ListItemText primary="Align Justify" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </nav>
                        </Box>
                    </Paper>
                </Popper>
            </FormControl>
        </ClickAwayListener>
    )
}


export default AlignButton