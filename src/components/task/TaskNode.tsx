import React from 'react';
import TaskBody from './TaskBody';
import TaskHeader from './TaskHeader';
import { Stack, Box, Paper } from '@mui/material'
import { Handle, Position } from '@xyflow/react';
import { FocusContext, FocusContextType } from '../process/ProcessDash';
import { TaskModalContext, TaskModalContextType } from '../process/Process';
interface TaskNodeProps {
    data: {
        label: string;
        isLeaf: boolean;
        linkedProcessId: number;
        stepNumber: number;
    };
    isConnectable: boolean;
}

const TaskNode: React.FC<TaskNodeProps> = ({ data, isConnectable }: TaskNodeProps) => {
    const { setFocus } = React.useContext<FocusContextType>(FocusContext)
    const { setTaskModalState } = React.useContext<TaskModalContextType>(TaskModalContext)
    const handleDoubleClick = (data: TaskNodeProps['data']) => {
        if (data.isLeaf) {
            setTaskModalState({ open: true, step: data.stepNumber })
        } else {
            setFocus({ process: data.linkedProcessId, step: data.stepNumber })
        }
    }
    return (
        <>
            <Paper elevation={12}>
                <Stack className={data.isLeaf ? 'task-node' : 'process-node'} alignItems='stretch' spacing={0} onDoubleClick={() => handleDoubleClick(data)}>
                    <Handle
                        type='target'
                        position={Position.Top}
                        isConnectable={isConnectable}
                    />
                    <Box sx={{ height: '15%' }}>
                        <TaskHeader />
                    </Box>
                    <Box sx={{ height: '85%' }}>
                        <TaskBody content={data.label} />
                    </Box>
                    <Handle
                        type='source'
                        position={Position.Bottom}
                        id='a'
                        isConnectable={isConnectable}
                    />
                </Stack>
            </Paper>
        </>
    )
}

export default TaskNode