import React from 'react';
import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { FocusContext, FocusContextType } from '../process/ProcessDash';
import { ManualContext, ManualContextType } from '../process/Process';
import config from '../../config';
import { useQuery } from '@tanstack/react-query';
import StepEditor from './StepEditor';

const apiUrl = `${config.apiUrl}`

type ContentType = JSON | null

const Manual: FC = () => {
    const { focus } = React.useContext<FocusContextType>(FocusContext)
    const { manualState } = React.useContext<ManualContextType>(ManualContext)
    const [content, setContent] = React.useState<ContentType>(null)

    const { isLoading: taskLoading } = useQuery(
        ['taskContent', manualState],
        async () => {
            if (manualState.step === null) {
                return null
            }
            const taskStep = manualState.step
            const response = await fetch(`${apiUrl}/task/${focus.process.toString()}/${taskStep.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch task content');
            }
            const res = await response.json();
            return res;
        },
        {
            onSuccess: (res) => {
                if (res) {
                    setContent(res.data.content)
                }
            },
            refetchOnWindowFocus: false,
        },
    );


    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            {taskLoading || content === null ? (
                <div><CircularProgress /></div>
            ) : (
                <>
                    <StepEditor content={content} />
                </>
            )}
        </Box>
    )
}

export default Manual