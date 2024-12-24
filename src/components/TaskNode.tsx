import React from 'react';
import TaskBody from './taskcomponents/TaskBody';
import TaskHeader from './taskcomponents/TaskHeader';
import { Stack, Box } from '@mui/material'
import { Handle, Position } from '@xyflow/react';

interface TaskNodeProps {
    data: {
        label: string;
        isLeaf: boolean;
        linkedProcessId: number | null
    };
    isConnectable: boolean;
}

const handleDoubleClick = (data: TaskNodeProps['data']) => {
    if (data.isLeaf) {
        console.log('do what the leaf should do')
    } else {
        const linkedProcess = data.linkedProcessId
        // What do I want to do here?
        // 1. Make a call to the back end for THIS process (the linkedProcess)
        // a. Abstract api call to utils (i.e. (const tasks = apiCall(task#)))
        // 2. When I get a response, make this process the process in Process.tsx but NOT in FileExplorer.tsx.
        // I will have to restructure the state.
    }
}

const TaskNode: React.FC<TaskNodeProps> = ({ data, isConnectable }: TaskNodeProps) => {
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