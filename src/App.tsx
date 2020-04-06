import React from 'react';
import logo from './logo.svg';
import './App.css';

import Counter from './components/Counter';
import Auth0 from './components/Auth0';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <Counter />
        <Auth0 />
      </header>
    </div>
  );
}

export default App;
