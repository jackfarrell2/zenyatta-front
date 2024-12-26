import React from 'react';
import { FC } from 'react';
import { Modal, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FocusContext, FocusContextType } from './ProcessDash';
import { TaskModalStateType, TaskModalContext, TaskModalContextType } from './Process';


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
    const handleClose = () => {
        setTaskModalState({ open: false, step: 1 })
    }
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Button onClick={handleClose} sx={{ color: 'primary' }}>
                    <CloseIcon sx={{ color: 'primary' }} />
                </Button>
                <div>
                    This is the content of {focus.process}'s {taskModalState.step}
                </div>
            </Box>
        </Modal>
    )
}

export default TaskModal