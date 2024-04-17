import './App.css';
import Home from './components/Home'
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {

    window.location.href = 'http://localhost:3001/auth';
  }, []);
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
 

// go register for oauth