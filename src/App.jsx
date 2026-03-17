import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UnitSelection from './pages/UnitSelection';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import Settings from './pages/Settings';
import Syllabus from './pages/Syllabus';
import PreTestForm from './pages/PreTestForm';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <BrowserRouter>
      <AnimatedBackground>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/subjects" element={<Home />} />
          <Route path="/subject/:subjectId" element={<UnitSelection />} />
          <Route path="/unit/:subjectId" element={<UnitSelection />} />
          <Route path="/test/:unitId" element={<TestPage />} />
          <Route path="/pretest/:unitId" element={<PreTestForm />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AnimatedBackground>
    </BrowserRouter>
  );
}

export default App;
