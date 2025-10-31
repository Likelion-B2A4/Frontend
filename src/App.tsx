import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import SplashPageWeb from './pages/splash.tsx';
import Intro from './pages/Intro.tsx';
import LogIn from './pages/LogIn.tsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SplashPageWeb />} />
        <Route path="/logointro" element={<Intro />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
