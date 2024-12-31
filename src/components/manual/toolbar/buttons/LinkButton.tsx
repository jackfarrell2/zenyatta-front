import React, { FC } from 'react';
import { Editor } from '@tiptap/react';
import { FormControl, IconButton, Paper, Popper, Input, Button, Box } from '@mui/material';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { ClickAwayListener } from '@mui/material';

interface LinkButtonProps {
    editor: Editor | null
}

const toolbarButtonStyles = (isActive: boolean) => ({
    backgroundColor: isActive ? 'rgb(211, 227, 253)' : 'transparent',
    color: isActive ? 'rgba(0, 0, 128, 0.8)' : 'inherit', // Softer navy color
    borderRadius: '8px', // Rounded corners
});


const LinkButton: FC<LinkButtonProps> = ({ editor }) => {
    const [value, setValue] = React.useState(editor?.getAttributes('link').href || '');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const onChange = (href: string) => {
        if (
            !/^https?:\/\//i.test(href) && // not starting with http:// or https://
            !/^mailto:/i.test(href)       // not mailto:
        ) {
            href = `https://${href}`;
        }
        editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
        setValue('')
        setAnchorEl(null)
    }

    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <FormControl size='small'>
                <IconButton onClick={handleClick} className='button-base' size='small' sx={toolbarButtonStyles(false)}>
                    <InsertLinkIcon fontSize='small' />
                </IconButton>

                <Popper open={open} anchorEl={anchorEl} placement='bottom-start'>
                    <Paper elevation={3} sx={{ p: 1, mt: 1 }}>
                        <Box sx={{
                            p: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '8px'
                        }}>
                            <Input placeholder='https://example.com' value={value} onChange={(e) => setValue(e.target.value)} />
                            <Button sx={{ textTransform: 'none', backgroundColor: 'black' }} variant='contained' size='small' onClick={() => onChange(value)}>Apply</Button>
                        </Box>
                    </Paper>
                </Popper>
            </FormControl>
        </ClickAwayListener>
    )
}


export default LinkButton