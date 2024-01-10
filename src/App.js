import React from 'react';
import Tictac from './components/Tictac';
import QuoteComponent from './components/QuoteComponent';
import Game from './components/Game';
import { createPath } from 'react-router';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
      <QuoteComponent/>
      
        <Routes>
        <Route path="/" element={<Tictac />} />
        <Route path="/game" element={<Game />} />
        <Route path="/tictac" element={<Tictac />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
