
import React, { useState } from 'react';
import WalletConnect from '@/components/WalletConnect';
import TokenForm from '@/components/TokenForm';
import { WalletConnection } from '@/utils/wallet';
import { Sparkles, Rocket, Shield, Zap } from 'lucide-react';

const Index = () => {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  
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

      {/* Main Content - Centered */}
      <div className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <TokenForm wallet={wallet} />
        </div>
      </div>

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
