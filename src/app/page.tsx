'use client';

import { WalletContextProvider } from '@/components/WalletContextProvider';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SnipingTool } from '@/components/SnipingTool';
import { LiveFeed } from '@/components/LiveFeed';

export default function Home() {
  return (
    <WalletContextProvider>
      <main className="relative min-h-screen text-foreground selection:bg-neon-red selection:text-white overflow-hidden flex flex-col">
        {/* Global Scanline Overlay */}
        <div className="scanline-overlay pointer-events-none fixed inset-0 z-[100]" />
        
        <Header />
        
        {/* Main Dashboard Area */}
        <div className="flex-1 container px-4 pt-24 pb-4 mx-auto lg:px-6 h-[calc(100vh-20px)] flex flex-col justify-center overflow-hidden">
            {/* 3-Column Layout: Hero (3) | Sniping (6) | LiveFeed (3) */}
            <div className="grid items-stretch gap-4 lg:grid-cols-12 h-full overflow-hidden">
                {/* Hero Section - Left Side */}
                <div className="lg:col-span-3 h-full min-h-[400px]">
                    <Hero />
                </div>
                
                {/* Sniping Tool - Center */}
                <div className="lg:col-span-6 h-full min-h-[400px]">
                    <SnipingTool />
                </div>

                {/* Live Feed - Right Side */}
                <div className="lg:col-span-3 h-full min-h-0 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <LiveFeed />
                    </div>
                </div>
            </div>
        </div>
        
        {/* Advanced Background Effects - Z-Index -1 to be behind content */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,51,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,51,0.08)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-30" />
            
            {/* Ambient Glows - Increased Opacity */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neon-red/20 rounded-full blur-[150px] animate-pulse-slow mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-neon-red/10 rounded-full blur-[180px] animate-pulse-slow delay-1000 mix-blend-screen" />
            
            {/* Moving Particles/Orbs */}
            <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-neon-red/30 rounded-full blur-[80px] animate-float mix-blend-screen" />
        </div>
      </main>
    </WalletContextProvider>
  );
}
