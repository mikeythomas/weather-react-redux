import React from 'react';
import { CityList } from './features/CityList';
import { Details } from './features/Details';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-wrapper">
        <div className="App-pane App-leftPane">
          <CityList />
        </div>
        <div className="App-pane App-rightPane">
          <Details />
        </div>
      </div>
    </div>
  );
}

export default App;
