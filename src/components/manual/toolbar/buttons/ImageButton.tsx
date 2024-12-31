import React, { FC } from 'react';
import { Editor } from '@tiptap/react';
import { FormControl, IconButton, Paper, Popper, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogContent, DialogActions, DialogTitle, Input, Button } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ImageSearchOutlinedIcon from '@mui/icons-material/ImageSearchOutlined';
import { ClickAwayListener } from '@mui/material';

interface ImageButtonProps {
    editor: Editor | null
}

const toolbarButtonStyles = (isActive: boolean) => ({
    backgroundColor: isActive ? 'rgb(211, 227, 253)' : 'transparent',
    color: isActive ? 'rgba(0, 0, 128, 0.8)' : 'inherit', // Softer navy color
    borderRadius: '8px', // Rounded corners
});


const ImageButton: FC<ImageButtonProps> = ({ editor }) => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [imageUrl, setImageUrl] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
        setAnchorEl(null)
    }

    const onUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        }
        input.click()
    }

    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl('')
            setAnchorEl(null)
            setIsDialogOpen(false)
        }
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setImageUrl('')
    }

    return (
        <>
            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <FormControl size='small'>
                    <IconButton onClick={handleClick} className='button-base' size='small' sx={toolbarButtonStyles(false)}>
                        <AddPhotoAlternateOutlinedIcon fontSize='small' />
                    </IconButton>

                    <Popper open={open} anchorEl={anchorEl} placement='bottom-start'>
                        <Paper elevation={3} sx={{ p: 1, mt: 1 }}>
                            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <nav>
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={onUpload}>
                                                <ListItemIcon>
                                                    <FileUploadOutlinedIcon fontSize='small' />
                                                </ListItemIcon>
                                                <ListItemText primary="Upload" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => setIsDialogOpen(true)}>
                                                <ListItemIcon>
                                                    <ImageSearchOutlinedIcon fontSize='small' />
                                                </ListItemIcon>
                                                <ListItemText primary="Paste image url" />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </nav>
                            </Box>
                        </Paper>
                    </Popper>
                </FormControl>
            </ClickAwayListener>
            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Insert image URL</DialogTitle>
                <DialogContent>
                    <Input
                        placeholder='Insert image URL'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleImageUrlSubmit();
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ backgroundColor: 'black' }} variant='contained' onClick={handleImageUrlSubmit}>Insert</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default ImageButton