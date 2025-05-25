import React, { useState } from 'react';
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
}
const TokenForm: React.FC<TokenFormProps> = ({
  wallet
}) => {
  const [tokenData, setTokenData] = useState<TokenData>({
    name: '',
    symbol: '',
    description: '',
    totalSupply: '1000000',
    decimals: '18',
    burnMechanism: '2',
    // 2% burn rate
    websiteDomain: '',
    twitterHandle: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const {
    toast
  } = useToast();
  const handleInputChange = (field: keyof TokenData, value: string) => {
    setTokenData(prev => ({
      ...prev,
      [field]: value
    }));
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
      // Simulate token creation process
      console.log('Creating token with data:', tokenData);
      console.log('Connected wallet:', wallet);

      // In a real implementation, this would interact with a smart contract
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast({
        title: "Token Created Successfully!",
        description: `${tokenData.name} (${tokenData.symbol}) has been deployed to BNB testnet`
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
    } catch (error) {
      console.error('Token creation error:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to create token. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };
  const isFormValid = tokenData.name && tokenData.symbol && tokenData.totalSupply;
  const canCreate = wallet && wallet.chainId === 97 && isFormValid;
  return <Card className="bg-gradient-to-br from-crypto-purple/20 to-crypto-blue/20 border-crypto-purple/30 backdrop-blur-sm bg-slate-900">
      <CardHeader className="bg-slate-900">
        <CardTitle className="text-white flex items-center gap-2">
          <Coins className="h-6 w-6" />
          Token Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Token Info */}
        <div className="space-y-4 bg-slate-900">
          <h4 className="text-crypto-cyan font-medium">Basic Information</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tokenName" className="text-gray-300">Token Name *</Label>
              <Input id="tokenName" placeholder="e.g., AI Agent Coin" value={tokenData.name} onChange={e => handleInputChange('name', e.target.value)} className="bg-black/20 border-crypto-purple/30 text-white placeholder:text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tokenSymbol" className="text-gray-300">Token Symbol *</Label>
              <Input id="tokenSymbol" placeholder="e.g., MDAI" value={tokenData.symbol} onChange={e => handleInputChange('symbol', e.target.value.toUpperCase())} className="bg-black/20 border-crypto-purple/30 text-white placeholder:text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea id="description" placeholder="Describe your AI Agent meme coin..." value={tokenData.description} onChange={e => handleInputChange('description', e.target.value)} className="bg-black/20 border-crypto-purple/30 text-white placeholder:text-gray-400 min-h-[100px]" />
          </div>
        </div>

        <Separator className="bg-crypto-purple/30" />

        {/* Tokenomics */}
        <div className="space-y-4">
          <h4 className="text-crypto-cyan font-medium flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Tokenomics
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalSupply" className="text-gray-300">Total Supply *</Label>
              <Input id="totalSupply" type="number" placeholder="1000000" value={tokenData.totalSupply} onChange={e => handleInputChange('totalSupply', e.target.value)} className="bg-black/20 border-crypto-purple/30 text-white placeholder:text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="decimals" className="text-gray-300">Decimals</Label>
              <Input id="decimals" type="number" placeholder="18" value={tokenData.decimals} onChange={e => handleInputChange('decimals', e.target.value)} className="bg-black/20 border-crypto-purple/30 text-white placeholder:text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="burnRate" className="text-gray-300">Burn Rate (%)</Label>
              <Input id="burnRate" type="number" placeholder="2" value={tokenData.burnMechanism} onChange={e => handleInputChange('burnMechanism', e.target.value)} className="bg-black/20 border-crypto-purple/30 text-white placeholder:text-gray-400" />
            </div>
          </div>
        </div>

        <Separator className="bg-crypto-purple/30" />

        {/* Social & Web */}
        <div className="space-y-4">
          <h4 className="text-crypto-cyan font-medium">Social & Website</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website" className="text-gray-300 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website Domain
              </Label>
              <Input id="website" placeholder="moondogeai.io" value={tokenData.websiteDomain} onChange={e => handleInputChange('websiteDomain', e.target.value)} className="bg-black/20 border-crypto-purple/30 text-white placeholder:text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitter" className="text-gray-300 flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter Handle
              </Label>
              <Input id="twitter" placeholder="@MoonDogeAI" value={tokenData.twitterHandle} onChange={e => handleInputChange('twitterHandle', e.target.value)} className="bg-black/20 border-crypto-purple/30 text-white placeholder:text-gray-400" />
            </div>
          </div>
        </div>

        {/* Create Button */}
        <div className="pt-6">
          <Button onClick={handleCreateToken} disabled={!canCreate || isCreating} className="w-full bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue hover:shadow-lg hover:shadow-crypto-neon-purple/50 transition-all duration-300 h-12 text-lg font-semibold disabled:opacity-50">
            {isCreating ? 'Creating Token...' : 'Create AI Agent Coin'}
          </Button>
          
          {!wallet && <p className="text-center text-gray-400 text-sm mt-2">
              Connect your wallet to create a token
            </p>}
          
          {wallet && wallet.chainId !== 97 && <p className="text-center text-yellow-400 text-sm mt-2">
              Switch to BNB Smart Chain Testnet to continue
            </p>}
        </div>
      </CardContent>
    </Card>;
};
export default TokenForm;