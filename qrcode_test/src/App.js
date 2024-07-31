import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScanPage from './components/ScanPage';
import ExpiredPage from './components/ExpiredPage';
import Home from './components/Home';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/id/:id" element={<ScanPage />} />
          <Route path="/expired" element={<ExpiredPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
