import React from 'react';
import './index.css';

import ProcessDash from './components/process/ProcessDash';
import { Box } from '@mui/material'

const testing: boolean = false;

function App() {
  if (testing) {
    return (
      <Box sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'auto'
      }}>
        <div></div>
      </Box>
    )
  } else {
    return (
      <Box sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'auto'
      }}>
        <ProcessDash />
      </Box>
    )
  }
}

export default App;
