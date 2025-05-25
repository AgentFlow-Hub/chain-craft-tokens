
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
    { name: "Degen Apes", size: 120, color: "bg-gradient-to-br from-purple-500 to-pink-500", popularity: 95, description: "Community-driven token inspired by legendary ape traders and diamond hands culture" },
    { name: "AI Uprising", size: 115, color: "bg-gradient-to-br from-blue-500 to-cyan-500", popularity: 93, description: "Revolutionary AI agent token representing the future of autonomous trading systems" },
    { name: "Moon Mission", size: 110, color: "bg-gradient-to-br from-yellow-500 to-orange-500", popularity: 90, description: "Deflationary rocket ship token designed for astronomical gains and space exploration vibes" },
    { name: "Pepe Renaissance", size: 105, color: "bg-gradient-to-br from-green-500 to-teal-500", popularity: 87, description: "Revival of classic meme culture with modern DeFi mechanics and community governance" },
    { name: "Diamond Hands", size: 100, color: "bg-gradient-to-br from-indigo-500 to-purple-500", popularity: 85, description: "Ultra-hodler token with burn mechanics rewarding long-term believers and strong hands" },
    { name: "Shib Army", size: 95, color: "bg-gradient-to-br from-orange-500 to-red-500", popularity: 82, description: "Dog-themed community token building on the legacy of successful canine cryptocurrencies" },
    { name: "Chad Energy", size: 90, color: "bg-gradient-to-br from-red-500 to-pink-500", popularity: 80, description: "Alpha mindset token for confident traders and market leaders with winning mentality" },
    { name: "Wojak Feels", size: 85, color: "bg-gradient-to-br from-gray-500 to-blue-500", popularity: 78, description: "Emotional trading token capturing the feels of retail investors and market psychology" },
    { name: "Based Gains", size: 80, color: "bg-gradient-to-br from-green-600 to-lime-500", popularity: 75, description: "Fundamentally sound token with based tokenomics and sustainable growth mechanisms" },
    { name: "Space Karen", size: 75, color: "bg-gradient-to-br from-slate-500 to-gray-600", popularity: 72, description: "Satirical token commenting on tech billionaire space race and social media drama" }
  ];

  const handleThemeClick = (theme: Theme) => {
    setSelectedTheme(theme);
    onThemeSelect(theme);
  };

  return (
    <Card className="bg-slate-900/80 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Theme Heat Map
        </CardTitle>
        <p className="text-gray-300 text-sm">
          Based on previous 72 hours data, we analyzed X social data and discovered heat map of key themes
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 bg-black/20 rounded-lg p-4 overflow-hidden">
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
          <div className="mt-4 p-3 bg-black/20 rounded-lg border border-crypto-purple/30">
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
