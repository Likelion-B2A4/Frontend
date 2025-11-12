import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import SplashPageWeb from './pages/Splash.tsx';
import Intro from './pages/Intro.tsx';
import LogIn from './pages/LogIn.tsx';
import SignUp from './pages/SignUp.tsx';
import SignUpHosp from './pages/SignUpHosp.tsx';
import Calendar from './pages/Calendar.tsx';
import AddSchedule from './pages/AddSchedule.tsx';
import EditSchedule from './pages/EditSchedule.tsx';
import Service from './pages/Service.tsx';
import Setting from './pages/Setting.tsx';
import SelectDoctor from './pages/SelectDoctor.tsx';

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
        <Route path="/add-schedule" element={<AddSchedule />} />
        <Route path="/edit-schedule" element={<EditSchedule />} />
        <Route path="/service" element={<Service />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/select-doctor" element={<SelectDoctor />} />
      </Routes>
    </div>
  );
}

export default App;
