import React from 'react';
import logo from './logo.svg';
import './App.css';

import SpaceXProvider from './components/SpaceXProvider';
import LaunchGrid from "./components/LaunchGrid";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>SpaceX Launches</h1>
      </header>
      <SpaceXProvider>
        <LaunchGrid />
      </SpaceXProvider>
    </div>
  );
}

export default App;
