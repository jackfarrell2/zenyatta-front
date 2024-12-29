import { FC } from 'react';
import { Editor } from '@tiptap/react';
import { SelectChangeEvent, FormControl, Select, MenuItem } from '@mui/material';
import '../styles/Editor.css';
import { cn } from '../util';

interface FontFamilyButtonProps {
    editor: Editor | null
}

const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Verdana', value: 'Verdana' },
    { label: 'Tahoma', value: 'Tahoma' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Comic Sans MS', value: 'Comic Sans MS' },
];

const FontFamilyButton: FC<FontFamilyButtonProps> = ({ editor }) => {

    const handleFontChange = (event: SelectChangeEvent) => {
        editor?.chain().focus().setFontFamily(event.target.value).run()
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
            <Select
                labelId='font-select-label'
                id='font-select'
                value={editor?.getAttributes('textStyle').fontFamily || 'Arial'}
                onChange={handleFontChange}
                sx={{
                    width: 150,
                    '.MuiSelect-select': {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }
                }}
            >
                {fonts.map((fontOption) => (
                    <MenuItem
                        key={fontOption.value}
                        value={fontOption.value}
                        style={{ fontFamily: fontOption.value || 'inherit' }}
                        className={cn(
                            'menu-item',
                            editor?.getAttributes('textStyle').fontFamily === fontOption.value && 'menu-item-active'
                        )}
                    >
                        {fontOption.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default FontFamilyButton