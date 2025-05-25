
import React, { useState } from 'react';
import WalletConnect from '@/components/WalletConnect';
import TokenForm from '@/components/TokenForm';
import ThemeHeatMap from '@/components/ThemeHeatMap';
import TrendingTweets from '@/components/TrendingTweets';
import { WalletConnection } from '@/utils/wallet';
import { Sparkles, Rocket, Shield, Zap } from 'lucide-react';

interface Theme {
  name: string;
  size: number;
  color: string;
  popularity: number;
  description: string;
}

const Index = () => {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [showTokenForm, setShowTokenForm] = useState(false);
  
  const features = [{
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI-Powered",
    description: "Create intelligent meme coins with AI agent capabilities"
  }, {
    icon: <Rocket className="h-6 w-6" />,
    title: "Fast Deployment",
    description: "Deploy to BNB Smart Chain testnet in minutes"
  }, {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure & Audited",
    description: "Built with security best practices and automatic auditing"
  }, {
    icon: <Zap className="h-6 w-6" />,
    title: "Deflationary",
    description: "Built-in burn mechanisms to increase token value over time"
  }];

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme.name);
    setShowTokenForm(true);
  };

  return (
    <div className="min-h-screen bg-crypto-dark">
      {/* Top Header with Wallet Connection */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-end">
          <WalletConnect onConnectionChange={setWallet} compact={true} />
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-neon-gradient opacity-10"></div>
      </div>

      {/* Social Intelligence Section */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold crypto-gradient-text mb-4">
              Social Intelligence Engine
            </h2>
            <div className="flex justify-center gap-4 mb-8">
              <span className="px-4 py-2 bg-crypto-purple/20 border border-crypto-purple/30 rounded-full text-crypto-cyan flex items-center gap-2">
                <Zap className="h-4 w-4" />
                FREEDOM
              </span>
              <span className="px-4 py-2 bg-crypto-blue/20 border border-crypto-blue/30 rounded-full text-crypto-cyan flex items-center gap-2">
                <Zap className="h-4 w-4" />
                DEFI3
              </span>
              <span className="px-4 py-2 bg-crypto-purple/20 border border-crypto-purple/30 rounded-full text-crypto-cyan flex items-center gap-2">
                <Zap className="h-4 w-4" />
                AITRADE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ThemeHeatMap onThemeSelect={handleThemeSelect} />
            <TrendingTweets selectedTheme={selectedTheme} />
          </div>
        </div>
      </div>

      {/* Token Form Section */}
      {showTokenForm && (
        <div className="px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <TokenForm wallet={wallet} selectedTheme={selectedTheme} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-crypto-purple/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 AI Agent Token Generator. Built for the future of decentralized finance.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href="#" className="text-crypto-cyan hover:text-crypto-blue-light transition-colors">
                Documentation
              </a>
              <a href="#" className="text-crypto-cyan hover:text-crypto-blue-light transition-colors">
                Support
              </a>
              <a href="#" className="text-crypto-cyan hover:text-crypto-blue-light transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
