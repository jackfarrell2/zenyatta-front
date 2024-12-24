import React from 'react';
import { FC } from 'react';
import Grid from '@mui/material/Grid2'
import { Box, CircularProgress } from '@mui/material'
import Process from './Process';
import FileExplorer from './FileExplorer';

export interface APITask {
    id: string;
    stepNumber: number;
    label: string;
    targets: string[];
    isLeaf: boolean;
    subTasks: APITask[];
    linkedProcessId?: number;
    parentProcessId: number;
}

const ProcessDash: FC = () => {
    const [fileExplorerProcess, setFileExplorerProcess] = React.useState(1)
    const [processViewProcess, setProcessViewProcess] = React.useState(1)
    const [focus, setFocus] = React.useState(0)
    const [reFocus, setRefocus] = React.useState(0)

    const handleFocus = (nodeToFocusStep: number) => {
        const indexToFocus = nodeToFocusStep - 1 // 0 index
        if (nodeToFocusStep === focus) {
            setRefocus((prev) => prev + 1);
        } else {
            setFocus(indexToFocus)
        }

    }


    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Grid container justifyContent='stretch' alignItems='flex-start'>
                <Grid size={2}>
                    <FileExplorer process={fileExplorerProcess} handleFocus={handleFocus} setProcessViewProcess={setProcessViewProcess} processViewProcess={processViewProcess} />
                </Grid>
                <Grid size={10}>
                    <Process process={processViewProcess} focus={focus} reFocus={reFocus} />
                </Grid>
            </Grid>
            <Grid container justifyContent='center' alignItems='center'>
                <CircularProgress />
            </Grid>
        </Box>
    )
}

export default ProcessDash