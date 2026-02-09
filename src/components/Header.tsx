'use client';

import dynamic from 'next/dynamic';
import { ShieldCheck, Activity, Wifi, Battery } from 'lucide-react';
import { useState, useEffect } from 'react';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export const Header = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-neon-red/30">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="relative">
          <ShieldCheck className="w-8 h-8 text-neon-red animate-pulse-slow group-hover:animate-none" />
          <div className="absolute inset-0 bg-neon-red/20 blur-lg rounded-full opacity-50 animate-pulse" />
        </div>
        <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-wider text-white neon-text group-hover:glitch-hover" data-text="ClawSight">
            ClawSight
            </span>
            <span className="text-[10px] text-neon-red tracking-[0.2em] font-mono">TERMINAL v1.0</span>
        </div>
      </div>

      {/* System Status Bar */}
      <div className="hidden md:flex items-center gap-6 px-4 py-1 bg-black/40 border border-gray-800 rounded-full font-mono text-xs text-gray-400">
        <div className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-neon-red animate-pulse" />
            <span>SYSTEM: ONLINE</span>
        </div>
        <div className="w-px h-3 bg-gray-700" />
        <div className="flex items-center gap-2">
            <Wifi className="w-3 h-3 text-neon-red" />
            <span>NET: MAINNET</span>
        </div>
        <div className="w-px h-3 bg-gray-700" />
        <div className="flex items-center gap-2">
            <span>{time}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <WalletMultiButton />
      </div>
    </header>
  );
};
