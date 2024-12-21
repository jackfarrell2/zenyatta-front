import React from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';

interface TaskBodyProps {
    content: string
}

const TaskBody: React.FC<TaskBodyProps> = ({ content }) => {
    return (
        <Box sx={{ height: '100%' }} >
            <Grid container alignItems="center" justifyContent="center" style={{ height: '100%' }}>
                <Typography>{content}</Typography>
            </Grid>
        </Box>
    )
}

export default TaskBody