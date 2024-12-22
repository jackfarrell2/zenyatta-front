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
    id: string,
    label: string,
    targets: string[]
}

const ProcessDash: FC = () => {
    const [tasks, setTasks] = React.useState([])
    const [focus, setFocus] = React.useState(0)
    // Fetch tasks
    useQuery(
        ['tasks'],
        async () => {
            const response = await fetch(`${apiUrl}/processes`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const res = await response.json();
            return res;
        },
        {
            onSuccess: (res) => {
                const processTasks = res.data.tasks;
                setTasks(processTasks)
            },
        }
    );
    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            {(tasks.length > 0) ? (
                <Grid container justifyContent='stretch' alignItems='flex-start'>
                    <Grid size={2}>
                        <FileExplorer tasks={tasks} />
                    </Grid>
                    <Grid size={10}>
                        <Process tasks={tasks} focus={focus} />
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