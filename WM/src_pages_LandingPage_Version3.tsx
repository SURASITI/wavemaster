// pages/LandingPage.tsx (simplified)
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LandingPage: React.FC<{ onEnter: (pin: string) => void }> = ({ onEnter }) => {
  const [pin, setPin] = useState('');
  const [countdown, setCountdown] = useState('--:--:--');

  useEffect(() => {
    // demo countdown
    const target = new Date(Date.now() + 1000 * 60 * 60); // +1h
    const t = setInterval(() => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const h = String(Math.floor(diff / (3600_000))).padStart(2, '0');
      const m = String(Math.floor((diff % 3600_000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setCountdown(`${h}:${m}:${s}`);
    }, 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: "url('/cover.jpg')" }}>
      <div className="bg-black/40 p-6 rounded text-white w-full max-w-md">
        <h1 className="text-3xl font-bold">WaveMaster</h1>
        <p className="mt-2">Competition starts in {countdown}</p>
        <div className="mt-4 flex gap-2">
          <input value={pin} onChange={(e) => setPin(e.target.value)} className="p-2 rounded text-black" placeholder="Enter PIN (optional)" />
          <button onClick={() => onEnter(pin)} className="px-4 py-2 bg-blue-500 rounded">Enter to Event</button>
          <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="ml-2">
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-white">
              <path fill="currentColor" d="M12 2l8 8h-6v8h-4v-8H4z" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;