import React from 'react';
import './index.css';

// import ProcessDash from './components/ProcessDash';
import StepEditor from './components/StepEditor';
import { Box } from '@mui/material'

const testing: boolean = true;

function App() {
  if (testing) {
    return (
      <Box sx={{
        height: '100vh',
        width: '100vw',
      }}>
        <StepEditor />
      </Box>
    )
  } else {
    return (
      <div>
        Application
      </div>
    )
  }
}

export default App;
