import React from 'react';
import { FC } from 'react';
import { Modal, Box, Button, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FocusContext, FocusContextType } from '../process/ProcessDash';
import { TaskModalStateType, TaskModalContext, TaskModalContextType } from '../process/Process';
import config from '../../config';
import { useQuery } from '@tanstack/react-query';
import StepEditor from '../manual/StepEditor';

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

type ContentType = string | null

const TaskModal: FC<TaskModalProps> = ({ open, setTaskModalState }) => {
    const { focus } = React.useContext<FocusContextType>(FocusContext)
    const { taskModalState } = React.useContext<TaskModalContextType>(TaskModalContext)
    const [content, setContent] = React.useState<ContentType>(null)

    const handleClose = () => {
        setTaskModalState({ open: false, step: null })
        setContent(null)
    }

    const { isLoading: taskLoading } = useQuery(
        ['taskContent', taskModalState],
        async () => {
            if (taskModalState.step === null) {
                return null
            }
            const taskStep = taskModalState.step
            const response = await fetch(`${apiUrl}/task/${focus.process.toString()}/${taskStep.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch task content');
            }
            const res = await response.json();
            return res;
        },
        {
            onSuccess: (res) => {
                if (res) {
                    setContent(res.data.content)
                }
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
                {taskLoading || content === null ? (
                    <div><CircularProgress /></div>
                ) : (
                    <>
                        <StepEditor />
                    </>
                )}
            </Box>
        </Modal>
    )
}

export default TaskModal