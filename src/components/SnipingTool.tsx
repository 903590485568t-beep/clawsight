'use client';

import { useState } from 'react';
import { Search, Zap, Filter, Bell, Settings, Activity, Trash2, CheckCircle, Clock, Target } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
    id: string;
    token: string;
    amount: string;
    status: 'pending' | 'active' | 'completed';
    time: string;
}

export const SnipingTool = () => {
    const [activeTab, setActiveTab] = useState<'token' | 'contract' | 'image'>('token');
    const [inputValue, setInputValue] = useState('');
    const [settings, setSettings] = useState({
        autoBuy: true,
        mevProt: true,
        copyTrade: false,
        antiRug: true
    });
    // Initial state cleared as requested
    const [activeOrders, setActiveOrders] = useState<Order[]>([]);

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSnipe = () => {
        if (!inputValue) {
            toast.error("Please enter a token identifier!");
            return;
        }

        const newOrder: Order = {
            id: Date.now().toString(),
            token: inputValue.toUpperCase(),
            amount: '1.0 SOL', // Default mock amount
            status: 'active',
            time: 'Just now'
        };

        setActiveOrders([newOrder, ...activeOrders]);
        setInputValue('');
        toast.success(`Sniping order created for ${newOrder.token}!`);
    };

    const cancelOrder = (id: string) => {
        setActiveOrders(prev => prev.filter(o => o.id !== id));
        toast.info("Order cancelled.");
    };

    return (
        <div className="w-full h-full flex flex-col relative group">
            {/* Corner Accents for the whole tool */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="bg-surface/80 border border-neon-red/30 rounded-xl backdrop-blur-md overflow-hidden flex flex-col h-full relative z-10">
                {/* Background Grid Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,51,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,51,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                {/* Header with Radar */}
                <div className="flex items-center justify-between p-3 border-b border-neon-red/30 bg-black/40">
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-neon-red animate-pulse" />
                        <span className="text-sm font-bold tracking-wider text-white uppercase">Target Lock</span>
                    </div>
                    <div className="relative w-6 h-6 rounded-full border border-neon-red/50 flex items-center justify-center bg-black/50">
                        <div className="w-full h-full border-t border-neon-red animate-[radar-spin_3s_linear_infinite] rounded-full absolute inset-0" />
                        <div className="w-1 h-1 bg-neon-red rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-neon-red/30 shrink-0">
                    <button 
                        onClick={() => setActiveTab('token')}
                        className={`flex-1 py-3 text-center text-sm transition-all relative overflow-hidden ${activeTab === 'token' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                    >
                        {activeTab === 'token' && <div className="absolute inset-0 bg-neon-red/20 animate-pulse-slow" />}
                        <span className="relative z-10">TOKEN</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('contract')}
                        className={`flex-1 py-3 text-center text-sm transition-all relative overflow-hidden ${activeTab === 'contract' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                    >
                        {activeTab === 'contract' && <div className="absolute inset-0 bg-neon-red/20 animate-pulse-slow" />}
                        <span className="relative z-10">CONTRACT</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('image')}
                        className={`flex-1 py-3 text-center text-sm transition-all relative overflow-hidden ${activeTab === 'image' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                    >
                        {activeTab === 'image' && <div className="absolute inset-0 bg-neon-red/20 animate-pulse-slow" />}
                        <span className="relative z-10">IMAGE</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-4 relative z-10">
                    <div className="flex flex-col gap-2">
                        <div className="relative group/input">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-red font-mono text-lg animate-pulse">{'>'}</span>
                            <input 
                                type="text" 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={
                                    activeTab === 'token' ? "SEARCH_TARGET..." : 
                                    activeTab === 'contract' ? "CONTRACT_ADDR..." : 
                                    "IMG_SOURCE..."
                                }
                                className="w-full h-12 pl-8 pr-4 text-sm font-mono text-white bg-black/60 border border-gray-800 rounded focus:border-neon-red focus:outline-none focus:shadow-[0_0_15px_rgba(255,0,51,0.3)] transition-all placeholder:text-gray-600"
                            />
                            {/* Input Scanline */}
                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-neon-red group-focus-within/input:w-full transition-all duration-500" />
                        </div>
                        <button 
                            onClick={handleSnipe}
                            className="h-10 w-full font-bold text-sm text-black uppercase transition-all bg-neon-red rounded hover:shadow-[0_0_15px_#ff0033] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                EXECUTE
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* Quick Filters */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div 
                            onClick={() => toggleSetting('autoBuy')}
                            className={`flex items-center justify-between p-2 rounded bg-black/40 border border-gray-800 hover:border-neon-red/30 transition-colors cursor-pointer group/setting select-none ${settings.autoBuy ? 'border-neon-red/30' : ''}`}
                        >
                            <span className={`transition-colors ${settings.autoBuy ? 'text-white' : 'text-gray-400 group-hover/setting:text-white'}`}>AUTO_BUY</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${settings.autoBuy ? 'bg-neon-red/20' : 'bg-gray-800'}`}>
                                <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300 ${settings.autoBuy ? 'right-0.5 bg-neon-red shadow-[0_0_5px_#ff0033]' : 'left-0.5 bg-gray-500'}`} />
                            </div>
                        </div>

                        <div 
                            onClick={() => toggleSetting('mevProt')}
                            className={`flex items-center justify-between p-2 rounded bg-black/40 border border-gray-800 hover:border-neon-red/30 transition-colors cursor-pointer group/setting select-none ${settings.mevProt ? 'border-neon-red/30' : ''}`}
                        >
                            <span className={`transition-colors ${settings.mevProt ? 'text-white' : 'text-gray-400 group-hover/setting:text-white'}`}>MEV_PROT</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${settings.mevProt ? 'bg-neon-red/20' : 'bg-gray-800'}`}>
                                <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300 ${settings.mevProt ? 'right-0.5 bg-neon-red shadow-[0_0_5px_#ff0033]' : 'left-0.5 bg-gray-500'}`} />
                            </div>
                        </div>

                        <div 
                            onClick={() => toggleSetting('copyTrade')}
                            className={`flex items-center justify-between p-2 rounded bg-black/40 border border-gray-800 hover:border-neon-red/30 transition-colors cursor-pointer group/setting select-none ${settings.copyTrade ? 'border-neon-red/30' : ''}`}
                        >
                            <span className={`transition-colors ${settings.copyTrade ? 'text-white' : 'text-gray-400 group-hover/setting:text-white'}`}>COPY_TRADE</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${settings.copyTrade ? 'bg-neon-red/20' : 'bg-gray-800'}`}>
                                <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300 ${settings.copyTrade ? 'right-0.5 bg-neon-red shadow-[0_0_5px_#ff0033]' : 'left-0.5 bg-gray-500'}`} />
                            </div>
                        </div>

                        <div 
                            onClick={() => toggleSetting('antiRug')}
                            className={`flex items-center justify-between p-2 rounded bg-black/40 border border-gray-800 hover:border-neon-red/30 transition-colors cursor-pointer group/setting select-none ${settings.antiRug ? 'border-neon-red/30' : ''}`}
                        >
                            <span className={`transition-colors ${settings.antiRug ? 'text-white' : 'text-gray-400 group-hover/setting:text-white'}`}>ANTI_RUG</span>
                            <div className={`w-8 h-4 rounded-full relative transition-colors ${settings.antiRug ? 'bg-neon-red/20' : 'bg-gray-800'}`}>
                                <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-300 ${settings.antiRug ? 'right-0.5 bg-neon-red shadow-[0_0_5px_#ff0033]' : 'left-0.5 bg-gray-500'}`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Orders List */}
                <div className="flex-1 p-4 border-t border-neon-red/30 bg-black/20 overflow-y-auto">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                            <Activity className="w-3 h-3 text-neon-red" />
                            Active Processes
                        </span>
                        <span className="text-[10px] text-neon-red/70">{activeOrders.length} RUNNING</span>
                    </div>
                    
                    <div className="space-y-2">
                        {activeOrders.length === 0 ? (
                            <div className="text-center py-8 opacity-30 flex flex-col items-center">
                                <Settings className="w-8 h-8 mb-2 animate-[spin_10s_linear_infinite]" />
                                <span className="text-xs font-mono">NO_ACTIVE_TASKS</span>
                            </div>
                        ) : (
                            activeOrders.map(order => (
                                <div key={order.id} className="p-2 bg-black/60 border border-gray-800 rounded flex items-center justify-between group hover:border-neon-red/50 transition-all hover:translate-x-1">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-white font-mono">{order.token}</span>
                                            <span className="text-[10px] px-1 bg-neon-red/20 text-neon-red rounded">{order.amount}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                                            <Clock className="w-3 h-3" />
                                            {order.time}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#00ff00]" />
                                        <button 
                                            onClick={() => cancelOrder(order.id)}
                                            className="p-1 hover:bg-red-900/50 rounded transition-colors text-gray-500 hover:text-red-500"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
