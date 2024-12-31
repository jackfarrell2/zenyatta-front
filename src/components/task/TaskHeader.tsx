import React from 'react';
import Grid from '@mui/material/Grid2'
import { Box, AppBar, Toolbar, IconButton, } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import BackHandIcon from '@mui/icons-material/BackHand';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';

const TaskHeader: React.FC = () => {
    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <AppBar position='static'>
                <Toolbar sx={{ height: '100%', backgroundColor: 'lightgreen' }}>
                    <Grid sx={{ height: '100%', width: '100%' }} container justifyContent='flex-end' alignItems='space-between'>
                        <Grid size={4}>
                            <IconButton>
                                <BackHandIcon fontSize='small' />
                            </IconButton>
                            <IconButton>
                                <EditIcon fontSize='small' />
                            </IconButton>
                        </Grid>
                        <Grid size={8}>
                            <Box>
                                <Grid container justifyContent='flex-end' alignItems='center'>
                                    <IconButton>
                                        <SavedSearchIcon fontSize='small' />
                                    </IconButton>
                                    <IconButton>
                                        <ArticleIcon fontSize='small' />
                                    </IconButton>
                                    <IconButton>
                                        <AccountTreeIcon fontSize='small' />
                                    </IconButton>
                                    <IconButton>
                                        <WarningIcon fontSize='small' />
                                    </IconButton>
                                    <IconButton>
                                        <OpenInFullIcon fontSize='small' />
                                    </IconButton>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TaskHeader