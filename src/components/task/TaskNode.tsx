import React from 'react';
import TaskBody from './TaskBody';
import TaskHeader from './TaskHeader';
import { Stack, Box, Paper } from '@mui/material'
import { Handle, Position } from '@xyflow/react';
import { FocusContext, FocusContextType } from '../process/ProcessDash';
import { ManualContext, ManualContextType } from '../process/ProcessDash';
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
    const { focus, setFocus } = React.useContext<FocusContextType>(FocusContext)
    const { setManualState } = React.useContext<ManualContextType>(ManualContext)
    const handleDoubleClick = (data: TaskNodeProps['data']) => {
        if (data.isLeaf) {
            setManualState({ open: true, process: focus.process, step: data.stepNumber })
            setFocus({ process: focus.process, step: data.stepNumber - 1 })
        } else {
            setFocus({ process: data.linkedProcessId, step: 0 })
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
                        <TaskHeader data={data} />
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