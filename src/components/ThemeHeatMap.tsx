
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap, Info } from 'lucide-react';

interface Theme {
  name: string;
  size: number;
  color: string;
  popularity: number;
  description: string;
}

interface ThemeHeatMapProps {
  onThemeSelect: (theme: Theme) => void;
}

const ThemeHeatMap: React.FC<ThemeHeatMapProps> = ({ onThemeSelect }) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const themes: Theme[] = [
    { name: "AI Agent", size: 125, color: "bg-gradient-to-br from-blue-500 to-cyan-500", popularity: 98, description: "Autonomous AI agents revolutionizing on-chain trading and decision-making protocols" },
    { name: "RWA", size: 120, color: "bg-gradient-to-br from-emerald-500 to-teal-500", popularity: 95, description: "Real World Assets tokenization bringing traditional finance assets onto blockchain" },
    { name: "DePIN", size: 115, color: "bg-gradient-to-br from-purple-500 to-indigo-500", popularity: 92, description: "Decentralized Physical Infrastructure Networks connecting real-world hardware to crypto" },
    { name: "Degen Apes", size: 110, color: "bg-gradient-to-br from-orange-500 to-red-500", popularity: 90, description: "Community-driven token inspired by legendary ape traders and diamond hands culture" },
    { name: "Solana Memes", size: 105, color: "bg-gradient-to-br from-violet-500 to-purple-500", popularity: 88, description: "High-speed meme coins leveraging Solana's fast transactions and low fees ecosystem" },
    { name: "GameFi 2.0", size: 100, color: "bg-gradient-to-br from-pink-500 to-rose-500", popularity: 85, description: "Next generation gaming tokens with play-to-earn mechanics and NFT integration" },
    { name: "Base Layer", size: 95, color: "bg-gradient-to-br from-blue-600 to-indigo-600", popularity: 83, description: "Coinbase's Layer 2 solution driving mainstream adoption and institutional DeFi" },
    { name: "Liquid Staking", size: 90, color: "bg-gradient-to-br from-green-500 to-emerald-500", popularity: 80, description: "Unlocking staked ETH liquidity through innovative liquid staking derivative protocols" },
    { name: "Bitcoin L2", size: 85, color: "bg-gradient-to-br from-yellow-500 to-orange-500", popularity: 78, description: "Layer 2 solutions bringing smart contracts and DeFi capabilities to Bitcoin network" },
    { name: "Restaking", size: 80, color: "bg-gradient-to-br from-slate-500 to-gray-600", popularity: 75, description: "EigenLayer restaking protocols creating new yield opportunities and security models" }
  ];

  const handleThemeClick = (theme: Theme) => {
    setSelectedTheme(theme);
    onThemeSelect(theme);
  };

  return (
    <Card className="bg-slate-900/90 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Token Narrative Heat Map
        </CardTitle>
        <p className="text-gray-300 text-sm">
          Based on previous 72 hours data, we analyzed X social data and discovered heat map of trending narratives
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 bg-black/30 rounded-lg p-4 overflow-hidden border border-slate-700/30">
          <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2">
            {themes.map((theme, index) => (
              <button
                key={theme.name}
                onClick={() => handleThemeClick(theme)}
                className={`
                  ${theme.color} rounded-full flex items-center justify-center
                  text-white font-bold text-xs hover:scale-110 transition-all duration-300
                  hover:shadow-lg hover:shadow-crypto-neon-purple/50 cursor-pointer
                  ${selectedTheme?.name === theme.name ? 'ring-2 ring-crypto-neon-purple scale-110' : ''}
                `}
                style={{
                  width: `${theme.size}px`,
                  height: `${theme.size}px`,
                  transform: `translate(${(index % 3 - 1) * 20}px, ${Math.sin(index) * 10}px)`,
                }}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
        
        {selectedTheme && (
          <div className="mt-4 p-3 bg-black/30 rounded-lg border border-crypto-purple/30">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-crypto-cyan mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-crypto-cyan font-medium mb-1">{selectedTheme.name}</h4>
                <p className="text-gray-300 text-sm mb-2">{selectedTheme.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-crypto-neon-purple text-xs">Popularity: {selectedTheme.popularity}%</p>
                  <span className="text-xs text-gray-400">Trending narrative for token creation</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThemeHeatMap;
