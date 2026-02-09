'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { TrendingUp, User, RefreshCw, Radio, Zap, ExternalLink, Activity, Clock } from 'lucide-react';
import { toast } from 'sonner';

// --- Types ---
interface PumpToken {
    mint: string;
    name: string;
    symbol: string;
    uri: string;
    image_uri: string; // resolved image URL
    market_cap: number;
    creator: string;
    created_timestamp: number;
    description: string;
}

// --- Helpers ---
const formatMarketCap = (mc: number) => {
    if (!mc) return 'N/A';
    if (mc >= 1000000) return `$${(mc / 1000000).toFixed(1)}M`;
    if (mc >= 1000) return `$${(mc / 1000).toFixed(1)}K`;
    return `$${mc.toFixed(0)}`;
};

const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    return `${Math.floor(seconds / 3600)}h`;
};

export const LiveFeed = () => {
    // --- State ---
    const [tokens, setTokens] = useState<PumpToken[]>([]);
    const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
    const [lastPing, setLastPing] = useState<number>(0);
    const [isHovered, setIsHovered] = useState(false);
    
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
    const pendingTokens = useRef<PumpToken[]>([]);

    // --- Helpers ---
    const resolveUrl = (url: string) => {
        if (!url) return '/placeholder.png'; 
        if (url.startsWith('ipfs://')) {
            // Use a faster gateway
            return url.replace('ipfs://', 'https://cf-ipfs.com/ipfs/');
        }
        return url;
    };

    const fetchTokenImage = async (uri: string): Promise<string | null> => {
        try {
            const targetUrl = resolveUrl(uri);
            const res = await fetch(`/api/proxy?url=${encodeURIComponent(targetUrl)}`);
            if (!res.ok) return null;
            const data = await res.json();
            return resolveUrl(data.image || data.image_uri);
        } catch (e) {
            return null;
        }
    };

    // --- Flush Pending ---
    useEffect(() => {
        if (!isHovered && pendingTokens.current.length > 0) {
            setTokens(prev => {
                const combined = [...pendingTokens.current, ...prev];
                // Keep only unique by mint
                const unique = Array.from(new Map(combined.map(item => [item.mint, item])).values());
                return unique.slice(0, 25);
            });
            pendingTokens.current = [];
        }
    }, [isHovered]);

    const connect = useCallback(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) return;

        if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);

        setStatus('connecting');
        setError(null);
        
        try {
            const ws = new WebSocket('wss://pumpportal.fun/api/data');
            wsRef.current = ws;

            ws.onopen = () => {
                console.log("Connected to PumpPortal");
                setStatus('connected');
                setError(null);
                // Subscribe to new token creations
                ws.send(JSON.stringify({ method: "subscribeNewToken" })); 
            };

            ws.onmessage = async (event) => {
                setLastPing(Date.now());
                setMsgCount(prev => prev + 1);
                try {
                    const data = JSON.parse(event.data);
                    
                    if (data.errors) {
                        console.error("PumpPortal Error:", data.errors);
                        setError(`API Error: ${data.errors.join(', ')}`);
                        return;
                    }

                    // Only handle 'new_token' txType (or similar, PumpPortal sends creation events)
                    // The structure for new tokens usually has 'mint', 'name', 'symbol', 'uri'
                    if (!data.mint) return;

                    // Preliminary token object
                    const newToken: PumpToken = {
                        mint: data.mint,
                        name: data.name || 'Unknown',
                        symbol: data.symbol || '???',
                        uri: data.uri || '',
                        image_uri: '/placeholder.png', // placeholder initially
                        market_cap: (data.vSolInBondingCurve || 0) * 195, // Approx SOL price $195
                        creator: data.traderPublicKey || 'Unknown',
                        created_timestamp: Date.now(),
                        description: ''
                    };

                    // Fetch image in background if URI exists
                    if (newToken.uri) {
                        fetchTokenImage(newToken.uri).then(img => {
                            if (img) {
                                setTokens(prev => prev.map(t => t.mint === newToken.mint ? { ...t, image_uri: img } : t));
                            }
                        });
                    }

                    if (isHovered) {
                        pendingTokens.current = [newToken, ...pendingTokens.current];
                    } else {
                        setTokens(prev => {
                            const next = [newToken, ...prev];
                            // Limit to 50 items to prevent memory issues but keep history
                            return next.slice(0, 50);
                        });
                    }

                } catch (e) {
                    console.error("Parse error", e);
                }
            };

            ws.onclose = (e) => {
                setStatus('disconnected');
                console.log("WS Closed", e.code, e.reason);
                reconnectTimeout.current = setTimeout(connect, 3000);
            };

            ws.onerror = (err) => {
                console.error("WS Error", err);
                setError("Connection Failed");
                ws.close();
            };

        } catch (err: any) {
            setError(`Init Error: ${err.message}`);
            setStatus('disconnected');
        }

    }, [isHovered]);

    useEffect(() => {
        connect();
        return () => {
            if (wsRef.current) wsRef.current.close();
            if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
        };
    }, [connect]);

    return (
        <div 
            className="flex flex-col w-full h-full bg-surface/80 border border-neon-red/30 rounded-xl backdrop-blur-md overflow-hidden relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-neon-red opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Header */}
            <div className="p-3 border-b border-neon-red/30 flex items-center justify-between shrink-0 bg-black/40 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Radio className={`w-5 h-5 ${status === 'connected' ? 'text-neon-red' : 'text-gray-500'}`} />
                        {status === 'connected' && (
                            <span className="absolute top-0 right-0 w-2 h-2 bg-neon-red rounded-full animate-ping" />
                        )}
                    </div>
                    <h2 className="text-lg font-bold text-white uppercase tracking-wider">Live Feed</h2>
                </div>
                <div className="flex items-center gap-3">
                    {isHovered && pendingTokens.current.length > 0 && (
                        <div className="text-xs px-2 py-1 bg-neon-red text-black font-bold rounded animate-pulse">
                            +{pendingTokens.current.length} NEW
                        </div>
                    )}
                    <div className="text-[10px] text-gray-500 font-mono flex items-center gap-2">
                        {error && <span className="text-red-500 font-bold">ERR: {error}</span>}
                        <span>{status === 'connected' ? `ONLINE (${msgCount})` : 'CONNECTING...'}</span>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2 relative z-10 custom-scrollbar">
                {tokens.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2 opacity-50">
                        <RefreshCw className="w-8 h-8 animate-spin" />
                        <p className="text-xs font-mono">INITIALIZING_STREAM...</p>
                    </div>
                ) : (
                    tokens.map((token) => (
                        <div 
                            key={token.mint} 
                            className="group/item relative p-3 bg-black/60 border border-gray-800 rounded hover:border-neon-red/50 transition-all hover:translate-x-1 hover:bg-black/80 overflow-hidden cursor-pointer"
                        >
                            {/* Hover Scanline */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-red/10 to-transparent translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                            
                            <div className="flex gap-3 relative z-10">
                                {/* Image */}
                                <div className="relative w-12 h-12 shrink-0 rounded bg-gray-900 border border-gray-700 overflow-hidden group-hover/item:border-neon-red/50 transition-colors">
                                    <img 
                                        src={token.image_uri} 
                                        alt={token.symbol} 
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/placeholder.png';
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="font-bold text-white truncate text-sm">{token.name}</span>
                                            <span className="text-[10px] text-gray-500 font-mono shrink-0">${token.symbol}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-mono shrink-0">
                                            {getTimeAgo(token.created_timestamp)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1 text-green-400 font-mono">
                                            <TrendingUp className="w-3 h-3" />
                                            {formatMarketCap(token.market_cap)}
                                        </div>
                                        <a 
                                            href={`https://pump.fun/${token.mint}`} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="text-gray-500 hover:text-neon-red transition-colors flex items-center gap-1 text-[10px]"
                                        >
                                            PUMP <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                    
                                    <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-600 truncate font-mono">
                                        <User className="w-3 h-3" />
                                        <span className="truncate">{token.creator.slice(0, 4)}...{token.creator.slice(-4)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};