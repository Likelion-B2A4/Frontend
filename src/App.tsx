import './App.css';
import {Route, Routes } from 'react-router-dom';
import SplashPageWeb from './pages/Splash.tsx';
import Intro from './pages/Intro.tsx';
import LogIn from './pages/LogIn.tsx';
import Hospitalmap from './pages/Hospitalmap.tsx';

function App() {
  return (
    <div style={{ width: "360px", height: "680px", margin: "0 auto" }}>
      <Routes>
        <Route path="/" element={<SplashPageWeb />} />
        <Route path="/logointro" element={<Intro />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/hospitalmap" element={<Hospitalmap/>}/>
      </Routes>
    </div>
  );
}

export default App;
