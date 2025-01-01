import React, { FC } from 'react';
import { Editor } from '@tiptap/react';
import { IconButton } from '@mui/material';
import { useMutation } from '@tanstack/react-query'
import config from '../../../../config';
import { FocusContext, FocusContextType } from '../../../process/ProcessDash';
import { ManualContext, ManualContextType } from '../../../process/ProcessDash';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const apiUrl = `${config.apiUrl}`

interface SaveButtonProps {
    editor: Editor | null,
}

const toolbarButtonStyles = (isActive: boolean) => ({
    backgroundColor: isActive ? 'rgb(211, 227, 253)' : 'transparent',
    color: isActive ? 'rgba(0, 0, 128, 0.8)' : 'inherit', // Softer navy color
    borderRadius: '8px', // Rounded corners
});

const SaveButton: FC<SaveButtonProps> = ({ editor }) => {
    const { focus } = React.useContext<FocusContextType>(FocusContext)
    const { manualState } = React.useContext<ManualContextType>(ManualContext)
    const updateTaskContent = useMutation(
        async () => {
            const response = await fetch(`${apiUrl}/task/${focus.process.toString()}/${manualState.step}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Token ${token}`, // TODO, when Users are added
                },
                body: JSON.stringify({ 'content': editor?.getJSON() })
            })

            if (!response.ok) {
                throw new Error('Failed to update task content')
            }

            return response.json()
        },
        {
            onSuccess: () => {
                window.location.reload()
            }
        }
    )

    const handleSave = async () => {
        try {
            await updateTaskContent.mutateAsync()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <IconButton onClick={handleSave} size='large' sx={toolbarButtonStyles(false)}>
            <SaveOutlinedIcon fontSize='large' sx={{ color: '#007bff' }} />
        </IconButton>
    )
}

export default SaveButton