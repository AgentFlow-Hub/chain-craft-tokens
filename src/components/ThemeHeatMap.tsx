
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
    { name: "AI Agents", size: 120, color: "bg-gradient-to-br from-purple-500 to-pink-500", popularity: 95, description: "Autonomous AI systems and intelligent automation trending across social platforms" },
    { name: "Election Drama", size: 115, color: "bg-gradient-to-br from-red-500 to-orange-500", popularity: 93, description: "Political campaigns, debates, and election predictions dominating conversations" },
    { name: "Crypto Winter", size: 110, color: "bg-gradient-to-br from-blue-500 to-cyan-500", popularity: 90, description: "Market volatility, regulatory news, and institutional adoption discussions" },
    { name: "Space Memes", size: 105, color: "bg-gradient-to-br from-indigo-500 to-purple-500", popularity: 87, description: "SpaceX launches, Mars missions, and astronomical discoveries going viral" },
    { name: "Climate Action", size: 100, color: "bg-gradient-to-br from-green-600 to-teal-500", popularity: 85, description: "Environmental protests, green technology, and sustainability initiatives trending" },
    { name: "Gaming Culture", size: 95, color: "bg-gradient-to-br from-orange-500 to-red-500", popularity: 82, description: "New game releases, esports tournaments, and gaming community discussions" },
    { name: "Tech Layoffs", size: 90, color: "bg-gradient-to-br from-gray-500 to-slate-600", popularity: 80, description: "Job market changes, startup struggles, and tech industry transformation" },
    { name: "Viral Dances", size: 85, color: "bg-gradient-to-br from-pink-500 to-rose-500", popularity: 78, description: "TikTok trends, dance challenges, and social media viral content" },
    { name: "Health Tech", size: 80, color: "bg-gradient-to-br from-teal-500 to-blue-500", popularity: 75, description: "Medical breakthroughs, wellness apps, and digital health innovations" },
    { name: "Food Trends", size: 75, color: "bg-gradient-to-br from-yellow-500 to-orange-500", popularity: 72, description: "Viral recipes, restaurant reviews, and culinary cultural moments" }
  ];

  const handleThemeClick = (theme: Theme) => {
    setSelectedTheme(theme);
    onThemeSelect(theme);
  };

  return (
    <Card className="bg-gradient-to-br from-crypto-purple/20 to-crypto-blue/20 border-crypto-purple/30 backdrop-blur-sm bg-slate-900">
      <CardHeader className="bg-slate-900">
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Theme Heat Map
        </CardTitle>
        <p className="text-gray-300 text-sm">
          Based on previous 72 hours data, we analyzed X social data and discovered heat map of key themes
        </p>
      </CardHeader>
      <CardContent className="bg-slate-900">
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
                  <span className="text-xs text-gray-400">Click to use this theme for token creation</span>
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
