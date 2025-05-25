
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap } from 'lucide-react';

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
    { name: "AI", size: 120, color: "bg-gradient-to-br from-purple-500 to-pink-500", popularity: 95, description: "Artificial Intelligence discussions and breakthroughs" },
    { name: "Sports", size: 110, color: "bg-gradient-to-br from-green-500 to-emerald-500", popularity: 92, description: "Latest sports news and highlights" },
    { name: "Tech", size: 105, color: "bg-gradient-to-br from-blue-500 to-cyan-500", popularity: 88, description: "Technology trends and innovations" },
    { name: "Gaming", size: 100, color: "bg-gradient-to-br from-orange-500 to-red-500", popularity: 85, description: "Gaming community and new releases" },
    { name: "Climate", size: 90, color: "bg-gradient-to-br from-green-600 to-teal-500", popularity: 78, description: "Climate change and environmental discussions" },
    { name: "Politics", size: 85, color: "bg-gradient-to-br from-red-500 to-pink-500", popularity: 75, description: "Political news and debates" },
    { name: "Memes", size: 80, color: "bg-gradient-to-br from-yellow-500 to-orange-500", popularity: 72, description: "Viral memes and internet culture" },
    { name: "Finance", size: 75, color: "bg-gradient-to-br from-indigo-500 to-purple-500", popularity: 68, description: "Financial markets and investment trends" },
    { name: "Health", size: 70, color: "bg-gradient-to-br from-teal-500 to-blue-500", popularity: 65, description: "Health and wellness discussions" },
    { name: "Movies", size: 65, color: "bg-gradient-to-br from-pink-500 to-rose-500", popularity: 62, description: "Film industry news and reviews" }
  ];

  const handleThemeClick = (theme: Theme) => {
    setSelectedTheme(theme);
    onThemeSelect(theme);
  };

  return (
    <Card className="bg-gradient-to-br from-crypto-purple/20 to-crypto-blue/20 border-crypto-purple/30 backdrop-blur-sm">
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
                  text-white font-bold text-sm hover:scale-110 transition-all duration-300
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
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-crypto-cyan font-medium">{selectedTheme.name}</h4>
                <p className="text-gray-300 text-sm">{selectedTheme.description}</p>
                <p className="text-crypto-neon-purple text-xs">Popularity: {selectedTheme.popularity}%</p>
              </div>
              <Button
                onClick={() => onThemeSelect(selectedTheme)}
                className="bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue hover:shadow-lg hover:shadow-crypto-neon-purple/50"
              >
                <Zap className="h-4 w-4 mr-2" />
                Create Token
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThemeHeatMap;
