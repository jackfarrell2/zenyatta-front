import { FC } from 'react';
import { Editor } from '@tiptap/react';
import { SelectChangeEvent, FormControl, Select, MenuItem } from '@mui/material';
import '../../../../styles/Editor.css';
import { cn } from '../../../../util';
import { type Level } from '@tiptap/extension-heading';

interface HeadingButtonProps {
    editor: Editor | null
}

const headings = [
    { label: 'Normal text', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
];

const HeadingButton: FC<HeadingButtonProps> = ({ editor }) => {

    const handleHeadingChange = (event: SelectChangeEvent) => {
        if (parseInt(event.target.value) === 0) {
            editor?.chain().focus().setParagraph().run()
        } else {
            editor?.chain().focus().toggleHeading({ level: parseInt(event.target.value) as Level }).run();
        }
    }

    const getCurrentHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive('heading', { level })) {
                return `${level}`
            }
        }

        return '0';
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
            <Select
                labelId='heading-select-label'
                id='heading-select'
                value={getCurrentHeading()}
                onChange={handleHeadingChange}
                sx={{
                    width: 150,
                    '.MuiSelect-select': {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }
                }}
            >
                {headings.map(({ label, value, fontSize }) => (
                    <MenuItem
                        key={value}
                        sx={{ fontSize: fontSize }}
                        value={value}
                        className={cn(
                            'heading-menu-item',
                            ((value === 0 && !editor?.isActive('heading')) || (editor?.isActive('heading', { level: value }))) && 'heading-menu-item-active'
                        )}
                    >
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default HeadingButton