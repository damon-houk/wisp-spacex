import React from 'react';
import './App.css';

import SpaceXProvider from './components/SpaceXProvider';
import LaunchGrid from "./components/LaunchGrid";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <img/><h1>SpaceX Launches</h1>
      </header>
      <SpaceXProvider>
        <LaunchGrid />
      </SpaceXProvider>
    </div>
  );
}

export default App;
