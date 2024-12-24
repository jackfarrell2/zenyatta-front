import React from 'react';
import { FC } from 'react';
import Grid from '@mui/material/Grid2'
import { Box, CircularProgress } from '@mui/material'
import Process from './Process';
import FileExplorer from './FileExplorer';
import { useQuery } from '@tanstack/react-query';
import config from '../config'

const apiUrl = `${config.apiUrl}`

export interface APITask {
    id: string;
    label: string;
    targets: string[];
    isLeaf: boolean;
    subTasks: APITask[];
    linkedProcessId: number | null
}

const ProcessDash: FC = () => {
    const [tasks, setTasks] = React.useState([])
    const [title, setTitle] = React.useState('')
    const [focus, setFocus] = React.useState(0)
    const [reFocus, setRefocus] = React.useState(0)
    // Fetch tasks
    useQuery(
        ['tasks'],
        async () => {
            const response = await fetch(`${apiUrl}/process/1`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const res = await response.json();
            return res;
        },
        {
            onSuccess: (res) => {
                const processTasks = res.data.tasks;
                setTasks(processTasks);
                setTitle(res.data.title);
            },
        }
    );

    const handleFocus = (nodeToFocusIndex: number) => {
        if (nodeToFocusIndex === focus) {
            setRefocus((prev) => prev + 1);
        } else {
            setFocus(nodeToFocusIndex)
        }

    }


    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            {(tasks.length > 0) ? (
                <Grid container justifyContent='stretch' alignItems='flex-start'>
                    <Grid size={2}>
                        <FileExplorer title={title} tasks={tasks} handleFocus={handleFocus} />
                    </Grid>
                    <Grid size={10}>
                        <Process tasks={tasks} focus={focus} reFocus={reFocus} />
                    </Grid>
                </Grid>
            ) : (
                <Grid container justifyContent='center' alignItems='center'>
                    <CircularProgress />
                </Grid>
            )}
        </Box>
    )
}

export default ProcessDash