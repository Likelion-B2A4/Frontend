import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import SplashPageWeb from './pages/Splash.tsx';
import Intro from './pages/Intro.tsx';
import LogIn from './pages/LogIn.tsx';
import SignUp from './pages/SignUp.tsx';
import SignUpHosp from './pages/SignUpHosp.tsx';
import Calendar from './pages/Calendar.tsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SplashPageWeb />} />
        <Route path="/logointro" element={<Intro />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signuphosp" element={<SignUpHosp />} />
        <Route path="/medical-records" element={<Calendar />} />
      </Routes>
    </div>
  );
}

export default App;
