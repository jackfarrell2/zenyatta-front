import React from 'react';

import Process from './components/Process';

const testing: boolean = true;

function App() {
  if (testing) {
    return (
      <Process />
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
