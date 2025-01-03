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

export interface ManualStateType {
    open: boolean;
    process: number | null;
    step: number | null;
}

const defaultManualState: ManualStateType = {
    open: false,
    process: null,
    step: null,
}

export interface ManualContextType {
    manualState: ManualStateType
    setManualState: React.Dispatch<React.SetStateAction<ManualStateType>>;
}

const defaultManualContext: ManualContextType = {
    manualState: defaultManualState,
    setManualState: () => { }
}

export const ManualContext = React.createContext<ManualContextType>(defaultManualContext)


export interface FocusState {
    process: number;
    step: number;
    refocus: number;
}

const defaultFocusState: FocusState = {
    process: 0,
    step: 1,
    refocus: 0,
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
    const initialProcess = 1
    const fileExplorerProcess = initialProcess
    const [focus, setFocus] = React.useState<FocusState>({ process: initialProcess, step: 0, refocus: 0 })
    const [fileExplorerSize, setFileExplorerSize] = React.useState(2);
    const [manualState, setManualState] = React.useState<ManualStateType>(defaultManualState)

    return (
        <ManualContext.Provider value={{ manualState, setManualState }}>
            <FocusContext.Provider value={{ focus, setFocus }}>
                <Box sx={{
                    height: '100%',
                    width: '100%',
                    maxHeight: '100vh',
                    maxWidth: '100vw',
                    overflow: 'hidden',
                }}>
                    <Grid container justifyContent='stretch' alignItems='center'>
                        <Grid size={fileExplorerSize}>
                            <FileExplorer process={fileExplorerProcess} fileExplorerSize={fileExplorerSize} setFileExplorerSize={setFileExplorerSize} />
                        </Grid>
                        <Grid size={12 - fileExplorerSize}>
                            <Process initialProcess={initialProcess} />
                        </Grid>
                    </Grid>
                </Box>
            </FocusContext.Provider>
        </ManualContext.Provider>
    )
}

export default ProcessDash