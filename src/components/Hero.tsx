'use client';

import { motion } from 'framer-motion';
import { Rocket, MessageCircle, Copy, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

export const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "The ultimate sniping tool on Solana.";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("To Be Announced");
    toast.success("Contract address copied!");
  };

  return (
    <section className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full h-full"
      >
        <div className="relative overflow-hidden bg-black/80 border rounded-2xl border-neon-red/50 neon-box h-full flex flex-col justify-center group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-red to-transparent animate-pulse-slow" />
            
            {/* Corner Accents */}
            <div className="corner-accent corner-tl" />
            <div className="corner-accent corner-tr" />
            <div className="corner-accent corner-bl" />
            <div className="corner-accent corner-br" />

            {/* Scanline Beam */}
            <div className="scanline-beam opacity-30" />

            <div className="p-6 text-center flex flex-col justify-between h-full relative z-10">
                <div>
                    <div className="flex justify-center mb-4">
                        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-neon-red/10 border border-neon-red shadow-[0_0_30px_rgba(255,0,51,0.5)]">
                            <Rocket className="w-12 h-12 text-neon-red animate-pulse-slow" />
                            {/* Radar Effect */}
                            <div className="absolute inset-0 rounded-full border-t-2 border-neon-red/50 animate-[radar-spin_2s_linear_infinite]" />
                        </div>
                    </div>

                    <h1 className="mb-1 text-4xl font-bold text-white neon-text glitch-hover cursor-default" data-text="ClawSight">ClawSight</h1>
                    <p className="mb-4 text-xl font-medium tracking-widest text-neon-red animate-pulse">$ClawSight</p>

                    <div className="mb-6 h-12 flex items-center justify-center">
                        <p className="text-gray-400 text-sm font-mono">
                            <span className="text-neon-red mr-2">{'>'}</span>
                            {text}
                            <span className="animate-pulse">_</span>
                        </p>
                    </div>

                    {/* Contract Address Mock */}
                    <div className="relative mb-6 group/copy">
                        <div className="flex items-center justify-between max-w-xs px-3 py-2 mx-auto transition-colors border rounded bg-black/50 border-gray-800 hover:border-neon-red/50">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-3 h-3 text-neon-red" />
                                <span className="font-mono text-xs text-gray-300">CA: Soon...</span>
                            </div>
                            <button onClick={handleCopy} className="text-gray-500 transition-colors hover:text-white">
                                <Copy className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="p-2 border rounded bg-black/40 border-gray-800 hover:border-neon-red/30 transition-colors">
                            <div className="text-lg font-bold text-white">1B</div>
                            <div className="text-[10px] text-gray-500 uppercase">Supply</div>
                        </div>
                        <div className="p-2 border rounded bg-black/40 border-gray-800 hover:border-neon-red/30 transition-colors">
                            <div className="text-lg font-bold text-white">0%</div>
                            <div className="text-[10px] text-gray-500 uppercase">Tax</div>
                        </div>
                        <div className="p-2 border rounded bg-black/40 border-gray-800 hover:border-neon-red/30 transition-colors">
                            <div className="text-lg font-bold text-white">LOCKED</div>
                            <div className="text-[10px] text-gray-500 uppercase">Liquidity</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="inline-block px-6 py-2 mb-6 text-lg font-bold text-black uppercase transition-transform bg-neon-red rounded-full shadow-[0_0_20px_#ff0033] hover:scale-105 hover:rotate-1">
                        SOON...
                    </div>

                    <div className="flex justify-center gap-4">
                        <a 
                            href="https://x.com/ClawSight_" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 transition-all border border-transparent rounded-full hover:text-neon-red hover:border-neon-red hover:shadow-[0_0_15px_#ff0033] bg-black/30 hover:scale-110"
                        >
                            {/* X (Twitter) Logo */}
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#" className="p-2 text-gray-400 transition-all border border-transparent rounded-full hover:text-neon-red hover:border-neon-red hover:shadow-[0_0_15px_#ff0033] bg-black/30 hover:scale-110">
                            <MessageCircle className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </section>
  );
};
