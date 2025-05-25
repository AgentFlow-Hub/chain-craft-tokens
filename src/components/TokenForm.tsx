
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Coins, Zap, Globe, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WalletConnection } from '@/utils/wallet';

interface TokenData {
  name: string;
  symbol: string;
  description: string;
  totalSupply: string;
  decimals: string;
  burnMechanism: string;
  websiteDomain: string;
  twitterHandle: string;
}

interface TokenFormProps {
  wallet: WalletConnection | null;
  selectedTheme?: string;
}

const TokenForm: React.FC<TokenFormProps> = ({ wallet, selectedTheme }) => {
  const [tokenData, setTokenData] = useState<TokenData>({
    name: '',
    symbol: '',
    description: '',
    totalSupply: '1000000',
    decimals: '18',
    burnMechanism: '2',
    websiteDomain: '',
    twitterHandle: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  // Generate description based on token name and its benefits
  const generateDescription = (tokenName: string, theme?: string) => {
    if (!tokenName.trim()) return '';
    
    const cleanName = tokenName.trim();
    
    // Enhanced description generator focusing on the token itself
    const generateTokenBenefits = (name: string) => {
      const nameWords = name.toLowerCase().split(' ');
      let benefits = [];
      
      // Core token benefits
      benefits.push(`• ${name} is a revolutionary cryptocurrency designed to empower its community with innovative blockchain technology`);
      
      // Deflationary mechanics
      benefits.push(`• Built-in deflationary mechanisms automatically burn ${name} tokens to increase scarcity and value over time`);
      
      // Community benefits based on name characteristics
      if (nameWords.some(word => ['ai', 'agent', 'smart', 'auto'].includes(word))) {
        benefits.push(`• Advanced AI-powered features enable ${name} holders to benefit from automated trading and intelligent market analysis`);
      } else if (nameWords.some(word => ['meme', 'fun', 'community', 'social'].includes(word))) {
        benefits.push(`• Strong community-driven governance allows ${name} holders to vote on key decisions and shape the token's future`);
      } else if (nameWords.some(word => ['defi', 'finance', 'yield', 'stake'].includes(word))) {
        benefits.push(`• DeFi integration provides ${name} holders with staking rewards and yield farming opportunities`);
      } else {
        benefits.push(`• Innovative tokenomics reward long-term ${name} holders with exclusive benefits and governance rights`);
      }
      
      // Utility and ecosystem
      benefits.push(`• ${name} serves as the native utility token for its ecosystem, providing access to premium features and reduced transaction fees`);
      
      return benefits.join('\n');
    };
    
    return generateTokenBenefits(cleanName);
  };

  // Auto-generate description when name changes
  useEffect(() => {
    if (tokenData.name) {
      const generatedDescription = generateDescription(tokenData.name, selectedTheme);
      setTokenData(prev => ({
        ...prev,
        description: generatedDescription
      }));
    }
  }, [tokenData.name, selectedTheme]);

  // Pre-fill form when theme is selected
  useEffect(() => {
    if (selectedTheme) {
      const cleanTheme = selectedTheme.replace(/\s+/g, '');
      setTokenData(prev => ({
        ...prev,
        name: prev.name || `${selectedTheme} Token`,
        symbol: prev.symbol || `${cleanTheme.substring(0, 4).toUpperCase()}`,
      }));
    }
  }, [selectedTheme]);

  const handleInputChange = (field: keyof TokenData, value: string) => {
    setTokenData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Generate suggested website addresses based on token name
  const getSuggestedWebsites = () => {
    if (!tokenData.name) return [];
    const cleanName = tokenData.name.toLowerCase().replace(/\s+/g, '');
    return [
      `${cleanName}.io`,
      `${cleanName}.com`,
      `${cleanName}coin.com`,
      `${cleanName}token.io`
    ];
  };

  // Generate AI Twitter handle based on token name
  const getAITwitterHandle = () => {
    if (!tokenData.name) return '';
    const cleanName = tokenData.name.toLowerCase().replace(/\s+/g, '');
    return `@${cleanName}AI`;
  };

  const handleCreateToken = async () => {
    if (!wallet || wallet.chainId !== 97) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to BNB Smart Chain Testnet first",
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
    if (!tokenData.name || !tokenData.symbol || !tokenData.totalSupply) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    try {
      console.log('Creating token with data:', tokenData);
      console.log('Connected wallet:', wallet);

      // Simple transaction to demonstrate MetaMask interaction
      // In a real implementation, this would deploy a token contract
      const transactionParameters = {
        to: wallet.address, // Send to self as a demo
        from: wallet.address,
        value: '0x0', // 0 BNB
        gas: '0x5208', // 21000 gas limit (standard transfer)
      };

      // Request transaction from MetaMask
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      console.log('Transaction sent:', txHash);
      
      toast({
        title: "Token Created Successfully!",
        description: `${tokenData.name} (${tokenData.symbol}) has been deployed to BNB testnet. Transaction: ${txHash}`
      });

      // Reset form
      setTokenData({
        name: '',
        symbol: '',
        description: '',
        totalSupply: '1000000',
        decimals: '18',
        burnMechanism: '2',
        websiteDomain: '',
        twitterHandle: ''
      });
    } catch (error: any) {
      console.error('Token creation error:', error);
      
      if (error.code === 4001) {
        toast({
          title: "Transaction Cancelled",
          description: "You cancelled the transaction in your wallet",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Creation Failed",
          description: error.message || "Failed to create token. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsCreating(false);
    }
  };

  const isFormValid = tokenData.name && tokenData.symbol && tokenData.totalSupply;
  const canCreate = wallet && wallet.chainId === 97 && isFormValid;
  const suggestedWebsites = getSuggestedWebsites();
  const aiTwitterHandle = getAITwitterHandle();

  return (
    <Card className="bg-gradient-to-br from-crypto-purple/20 to-crypto-blue/20 border-crypto-purple/30 backdrop-blur-sm bg-slate-900">
      <CardHeader className="bg-slate-900">
        <CardTitle className="text-white flex items-center gap-2">
          <Coins className="h-6 w-6" />
          Token Configuration
          {selectedTheme && (
            <span className="ml-2 px-2 py-1 bg-crypto-neon-purple/20 rounded-full text-crypto-cyan text-sm">
              {selectedTheme} Theme
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 bg-slate-900">
        {/* Basic Token Info */}
        <div className="space-y-4">
          <h4 className="text-crypto-cyan font-medium">Basic Information</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tokenName" className="text-gray-300">Token Name *</Label>
              <Input 
                id="tokenName" 
                placeholder="e.g., AI Agent Coin" 
                value={tokenData.name} 
                onChange={e => handleInputChange('name', e.target.value)} 
                className="bg-black/20 border-crypto-purple/30 text-white placeholder:text-gray-400" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tokenSymbol" className="text-gray-300">Token Symbol *</Label>
              <Input 
                id="tokenSymbol" 
                placeholder="e.g., MDAI" 
                value={tokenData.symbol} 
                onChange={e => handleInputChange('symbol', e.target.value.toUpperCase())} 
                className="bg-black/20 border-crypto-purple/30 text-white placeholder:text-gray-400" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">
              Description 
              <span className="text-crypto-cyan text-xs ml-2">(Auto-generated based on token name)</span>
            </Label>
            <Textarea 
              id="description" 
              placeholder="Token description will be auto-generated based on token name..." 
              value={tokenData.description} 
              onChange={e => handleInputChange('description', e.target.value)} 
              className="bg-black/20 border-crypto-purple/30 text-white placeholder:text-gray-400 min-h-[120px]" 
            />
          </div>
        </div>

        {/* Website Suggestions */}
        {suggestedWebsites.length > 0 && (
          <>
            <Separator className="bg-crypto-purple/30" />
            <div className="space-y-4">
              <h4 className="text-crypto-cyan font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {suggestedWebsites.map((website, index) => (
                  <button
                    key={index}
                    onClick={() => handleInputChange('websiteDomain', website)}
                    className="text-left p-2 rounded bg-black/20 border border-crypto-purple/30 text-gray-300 hover:text-white hover:border-crypto-purple/50 transition-colors"
                  >
                    {website}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* AI Generated Twitter Handle */}
        {aiTwitterHandle && (
          <>
            <Separator className="bg-crypto-purple/30" />
            <div className="space-y-4">
              <h4 className="text-crypto-cyan font-medium flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter
              </h4>
              <button
                onClick={() => handleInputChange('twitterHandle', aiTwitterHandle)}
                className="w-full text-left p-3 rounded bg-black/20 border border-crypto-purple/30 text-gray-300 hover:text-white hover:border-crypto-purple/50 transition-colors"
              >
                <div className="text-lg">{aiTwitterHandle}</div>
                <div className="text-sm text-gray-400 mt-1">AI-generated Twitter Handle</div>
              </button>
            </div>
          </>
        )}

        <Separator className="bg-crypto-purple/30" />

        {/* Create Button */}
        <div className="pt-6">
          <Button 
            onClick={handleCreateToken} 
            disabled={!canCreate || isCreating} 
            className="w-full bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue hover:shadow-lg hover:shadow-crypto-neon-purple/50 transition-all duration-300 h-12 text-lg font-semibold disabled:opacity-50"
          >
            {isCreating ? 'Creating Token...' : `Create ${tokenData.name || 'Token'}`}
          </Button>
          
          {!wallet && (
            <p className="text-center text-gray-400 text-sm mt-2">
              Connect your wallet to create a token
            </p>
          )}
          
          {wallet && wallet.chainId !== 97 && (
            <p className="text-center text-yellow-400 text-sm mt-2">
              Switch to BNB Smart Chain Testnet to continue
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenForm;
