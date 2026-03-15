import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UnitSelection from './pages/UnitSelection';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import Settings from './pages/Settings';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <BrowserRouter>
      <AnimatedBackground>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects" element={<Home />} />
          <Route path="/unit/:subjectId" element={<UnitSelection />} />
          <Route path="/test/:unitId" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AnimatedBackground>
    </BrowserRouter>
  );
}

export default App;
