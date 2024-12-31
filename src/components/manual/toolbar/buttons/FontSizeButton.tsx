import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import { Editor } from '@tiptap/react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


interface FontSizeButtonProps {
    editor: Editor | null
}

const toolbarButtonStyles = (isActive: boolean) => ({
    backgroundColor: isActive ? 'rgb(211, 227, 253)' : 'transparent',
    color: isActive ? 'rgba(0, 0, 128, 0.8)' : 'inherit', // Softer navy color
    borderRadius: '8px', // Rounded corners
});

const buttonStyles: React.CSSProperties = {
    height: '1.75rem',
    width: '2.5rem',
    fontSize: '0.875rem',
    textAlign: 'center',
    border: '1px solid #A3A3A3',
    borderRadius: '0.125rem',
    background: 'transparent',
    cursor: 'text',
};

const inputStyles: React.CSSProperties = {
    height: '1.75rem',
    width: '2.5rem',
    fontSize: '0.875rem',
    textAlign: 'center',
    border: '1px solid #A3A3A3',
    borderRadius: '0.125rem',
    background: 'transparent',
    outline: 'none',
    boxShadow: 'none',
};

const FontSizeButton: FC<FontSizeButtonProps> = ({ editor }) => {

    const currentFontSize = editor?.getAttributes('textStyle').fontSize
        ? editor?.getAttributes('textStyle').fontSize.replace('px', '')
        : '16';

    const [fontSize, setFontSize] = React.useState(currentFontSize);
    const [inputValue, setInputValue] = React.useState(fontSize);
    const [isEditing, setIsEditing] = React.useState(false);

    const updateFontSize = (newSize: string, stopEdit: boolean) => {
        const size = parseInt(newSize);
        if (!isNaN(size) && size > 0 && size < 99) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            if (stopEdit) {
                setIsEditing(false)
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue, true);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateFontSize(inputValue, true);
            editor?.commands.focus();
        }
    };

    const increment = () => {
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString(), true);
    }

    const decrement = () => {
        const newSize = parseInt(fontSize) - 1;
        if (newSize > 0) {
            updateFontSize(newSize.toString(), true);
        }
    }

    const fontSizeAttribute = editor?.getAttributes('textStyle').fontSize;

    React.useEffect(() => {
        const theFontSize = fontSizeAttribute ? fontSizeAttribute.replace('px', '') : '16';
        setFontSize(theFontSize)
    }, [editor, fontSizeAttribute])

    return (
        <div>
            <IconButton
                sx={toolbarButtonStyles(false)}
                onClick={decrement}
                size='small'
            >
                <RemoveIcon fontSize='small' />
            </IconButton>
            {isEditing ? (
                <input type='text' value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} onKeyDown={handleKeyDown} style={inputStyles} />
            ) : (
                <button onClick={() => {
                    setIsEditing(true);
                    updateFontSize(currentFontSize, false);
                }} style={buttonStyles}>
                    {currentFontSize}
                </button>
            )}
            <IconButton
                sx={toolbarButtonStyles(false)}
                onClick={increment}
                size='small'
            >
                <AddIcon fontSize='small' />
            </IconButton>
        </div>
    )
}

export default FontSizeButton