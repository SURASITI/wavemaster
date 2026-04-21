// App.tsx (simplified)
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SetupPage from './pages/SetupPage';
import AthletesPage from './pages/AthletesPage';
import HeatsPage from './pages/HeatsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import SchedulePage from './pages/SchedulePage';
import { useAppState } from './hooks/useAppState';
import type { Role } from './types';

const PIN_ROLE_MAP: Record<string, Role> = {
  '7777': 'judge',
  '9999': 'admin',
};

function App() {
  const { state } = useAppState();
  const [role, setRole] = useState<Role>('viewer');

  useEffect(() => {
    const saved = localStorage.getItem('wavemaster:role');
    if (saved) setRole(saved as Role);
  }, []);

  const enterWithPin = (pin: string) => {
    const r = PIN_ROLE_MAP[pin] ?? 'viewer';
    setRole(r);
    localStorage.setItem('wavemaster:role', r);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage onEnter={enterWithPin} />} />
        <Route path="/setup" element={role === 'admin' ? <SetupPage state={state} /> : <Navigate to="/" />} />
        <Route path="/athletes" element={role === 'admin' ? <AthletesPage /> : <Navigate to="/" />} />
        <Route path="/heats" element={<HeatsPage role={role} />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;