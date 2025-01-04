import { FC } from 'react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';

interface ProcessHeaderProps {
    title: string
}

const ProcessHeader: FC<ProcessHeaderProps> = ({ title }) => {
    return (
        <Grid sx={{ backgroundColor: '#F9FBFD', p: '2vh', pl: '5vh', borderBottom: '1px solid black' }} container direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
            <AccountTreeIcon fontSize='large' sx={{ color: 'blue' }} />
            <Typography variant='h5' sx={{ fontFamily: 'Open Sans' }}>{title}</Typography>
        </Grid>
    )
}

export default ProcessHeader