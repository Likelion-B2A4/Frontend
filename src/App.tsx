import './App.css';
import {Route, Routes } from 'react-router-dom';
import SplashPageWeb from './pages/Splash.tsx';
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
