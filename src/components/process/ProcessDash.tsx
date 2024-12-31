import React from 'react';
import { FC } from 'react';
import Grid from '@mui/material/Grid2'
import { Box } from '@mui/material'
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

export interface FocusState {
    process: number;
    step: number;
}

const defaultFocusState: FocusState = {
    process: 0,
    step: 1
}

export interface FocusContextType {
    focus: FocusState;
    setFocus: React.Dispatch<React.SetStateAction<FocusState>>;
}

const defaultFocusContext: FocusContextType = {
    focus: defaultFocusState,
    setFocus: () => { },
}

export const FocusContext = React.createContext<FocusContextType>(defaultFocusContext)

const ProcessDash: FC = () => {
    const initialProcess = 1 // Hard coded first process for now
    const fileExplorerProcess = initialProcess
    const [focus, setFocus] = React.useState<FocusState>({ process: initialProcess, step: 0 })

    return (
        <FocusContext.Provider value={{ focus, setFocus }}>
            <Box sx={{ height: '100%', width: '100%' }}>
                <Grid container justifyContent='stretch' alignItems='center'>
                    <Grid size={2}>
                        <FileExplorer process={fileExplorerProcess} />
                    </Grid>
                    <Grid size={10}>
                        <Process initialProcess={initialProcess} />
                    </Grid>
                </Grid>
            </Box>
        </FocusContext.Provider>
    )
}

export default ProcessDash