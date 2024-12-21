import React from 'react';
import TaskBody from './taskcomponents/TaskBody';
import TaskHeader from './taskcomponents/TaskHeader';
import { Stack, Box } from '@mui/material'
import { Handle, Position } from '@xyflow/react';

const handleStyle = { left: 10 };

interface TaskProps {
    data: {
        label: string;
    };
    isConnectable: boolean;
}

const Task: React.FC<TaskProps> = ({ data, isConnectable }: TaskProps) => {
    return (
        <Stack className='task-node' alignItems='stretch' spacing={0}>
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
                style={handleStyle}
                isConnectable={isConnectable}
            />
        </Stack>
    )
}

export default Task