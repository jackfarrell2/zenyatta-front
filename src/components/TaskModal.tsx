import React from 'react';
import { FC } from 'react';
import { Modal, Box, Button, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FocusContext, FocusContextType } from './ProcessDash';
import { TaskModalStateType, TaskModalContext, TaskModalContextType } from './Process';
import config from '../config';
import { useQuery } from '@tanstack/react-query';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';



const apiUrl = `${config.apiUrl}`

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '75vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
};

interface TaskModalProps {
    open: boolean
    setTaskModalState: (newState: TaskModalStateType) => void;
}

const TaskModal: FC<TaskModalProps> = ({ open, setTaskModalState }) => {
    const { focus } = React.useContext<FocusContextType>(FocusContext)
    const { taskModalState } = React.useContext<TaskModalContextType>(TaskModalContext)
    const [content, setContent] = React.useState('')

    const handleClose = () => {
        setTaskModalState({ open: false, step: 1 })
    }

    const { isLoading: taskLoading } = useQuery(
        ['taskContent', taskModalState],
        async () => {
            const response = await fetch(`${apiUrl}/task/${focus.process.toString()}/${taskModalState.step.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch task content');
            }
            const res = await response.json();
            return res;
        },
        {
            onSuccess: (res) => {
                setContent(res.data.content)
            },
            refetchOnWindowFocus: false,
        },
    );


    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Button onClick={handleClose} sx={{ color: 'primary' }}>
                    <CloseIcon sx={{ color: 'primary' }} />
                </Button>
                {taskLoading ? (
                    <div><CircularProgress /></div>
                ) : (
                    <>
                        <div>{content}</div>
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                licenseKey: 'GPL', // Or 'GPL'.
                                plugins: [Essentials, Paragraph, Bold, Italic],
                                toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|',],
                                initialData: '<p>Hello from CKEditor 5 in React!</p>',
                            }}
                        />
                    </>
                )}
            </Box>
        </Modal>
    )
}

export default TaskModal