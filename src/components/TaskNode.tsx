import React from 'react';
import TaskBody from './taskcomponents/TaskBody';
import TaskHeader from './taskcomponents/TaskHeader';
import { Stack, Box } from '@mui/material'
import { Handle, Position } from '@xyflow/react';
import { FocusContext, FocusContextType } from './ProcessDash';
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
    const handleDoubleClick = (data: TaskNodeProps['data']) => {
        if (data.isLeaf) {
            console.log('do what the leaf should do')
        } else {
            setFocus({ process: data.linkedProcessId, step: data.stepNumber })
        }
    }
    return (
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
    )
}

export default TaskNode