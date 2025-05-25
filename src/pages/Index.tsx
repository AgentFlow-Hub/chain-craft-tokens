
import React, { useState } from 'react';
import WalletConnect from '@/components/WalletConnect';
import TokenForm from '@/components/TokenForm';
import { WalletConnection } from '@/utils/wallet';
import { Sparkles, Rocket, Shield, Zap } from 'lucide-react';

const Index = () => {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered",
      description: "Create intelligent meme coins with AI agent capabilities"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Fast Deployment",
      description: "Deploy to BNB Smart Chain testnet in minutes"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Audited",
      description: "Built with security best practices and automatic auditing"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Deflationary",
      description: "Built-in burn mechanisms to increase token value over time"
    }
  ];

  return (
    <div className="min-h-screen bg-crypto-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-neon-gradient opacity-10"></div>
        <div className="relative px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-crypto-neon-purple via-crypto-neon-blue to-crypto-cyan bg-clip-text text-transparent">
              AI Agent Token
              <br />
              Generator
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Create the next generation of meme coins powered by AI agents. Deploy to BNB Smart Chain with 
              community-driven governance, deflationary tokenomics, and lightning-fast transactions.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-crypto-purple/20 to-crypto-blue/20 rounded-xl border border-crypto-purple/30 backdrop-blur-sm hover:shadow-lg hover:shadow-crypto-neon-purple/20 transition-all duration-300"
                >
                  <div className="text-crypto-cyan mb-4">{feature.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wallet Connection - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <WalletConnect onConnectionChange={setWallet} />
                
                {/* Quick Stats */}
                <div className="mt-6 p-6 bg-gradient-to-br from-crypto-purple/10 to-crypto-blue/10 rounded-xl border border-crypto-purple/20 backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-4">Platform Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tokens Created:</span>
                      <span className="text-crypto-cyan font-mono">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Value Locked:</span>
                      <span className="text-crypto-cyan font-mono">$2.4M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Users:</span>
                      <span className="text-crypto-cyan font-mono">8,945</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Creation Form - Main Content */}
            <div className="lg:col-span-2">
              <TokenForm wallet={wallet} />
            </div>
          </div>
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
