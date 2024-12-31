import React, { FC } from 'react';
import { Editor } from '@tiptap/react';
import { FormControl, IconButton, Paper, Popper, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import { ClickAwayListener } from '@mui/material';


interface SpacingButtonProps {
    editor: Editor | null
}

const toolbarButtonStyles = (isActive: boolean) => ({
    backgroundColor: isActive ? 'rgb(211, 227, 253)' : 'transparent',
    color: isActive ? 'rgba(0, 0, 128, 0.8)' : 'inherit', // Softer navy color
    borderRadius: '8px', // Rounded corners
});


const SpacingButton: FC<SpacingButtonProps> = ({ editor }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }


    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <FormControl size='small'>
                <IconButton onClick={handleClick} className='button-base' size='small' sx={toolbarButtonStyles(false)}>
                    <FormatLineSpacingIcon fontSize='small' />
                </IconButton>

                <Popper open={open} anchorEl={anchorEl} placement='bottom-start'>
                    <Paper elevation={3} sx={{ p: 1, mt: 1 }}>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <nav>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => {
                                            editor?.chain().focus().setLineHeight('1').run()
                                            setAnchorEl(null)
                                        }}>
                                            <ListItemText primary="Single" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => {
                                            editor?.chain().focus().setLineHeight('1.15').run()
                                            setAnchorEl(null)
                                        }}>
                                            <ListItemText primary="1.15" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => {
                                            editor?.chain().focus().setLineHeight('1.5').run()
                                            setAnchorEl(null)
                                        }}>
                                            <ListItemText primary="1.5" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => {
                                            editor?.chain().focus().setLineHeight('2').run()
                                            setAnchorEl(null)
                                        }}>
                                            <ListItemText primary="Double" />
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


export default SpacingButton