
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, CheckCircle, AlertCircle, ExternalLink, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { connectWallet, switchToBNBTestnet, isWalletConnected, WalletConnection } from '@/utils/wallet';

interface WalletConnectProps {
  onConnectionChange: (connection: WalletConnection | null) => void;
  compact?: boolean;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
  onConnectionChange,
  compact = false
}) => {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const connection = await isWalletConnected();
    setWallet(connection);
    onConnectionChange(connection);
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      if (!window.ethereum) {
        toast({
          title: "MetaMask Required",
          description: "Please install MetaMask to connect your wallet.",
          variant: "destructive"
        });
        return;
      }
      const connection = await connectWallet();
      if (connection) {
        // Check if we're on BNB testnet
        if (connection.chainId !== 97) {
          const switched = await switchToBNBTestnet();
          if (switched) {
            // Recheck connection after network switch
            const updatedConnection = await isWalletConnected();
            setWallet(updatedConnection);
            onConnectionChange(updatedConnection);
            toast({
              title: "Wallet Connected",
              description: "Successfully connected to BNB Smart Chain Testnet"
            });
          } else {
            toast({
              title: "Network Switch Failed",
              description: "Please manually switch to BNB Smart Chain Testnet",
              variant: "destructive"
            });
          }
        } else {
          setWallet(connection);
          onConnectionChange(connection);
          toast({
            title: "Wallet Connected",
            description: "Successfully connected to BNB Smart Chain Testnet"
          });
        }
      }
    } catch (error: any) {
      console.error('Connection error:', error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isOnBNBTestnet = wallet?.chainId === 97;

  // Compact mode - just the button
  if (compact) {
    if (!wallet) {
      return (
        <Button 
          onClick={handleConnect} 
          disabled={isConnecting}
          className="bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue hover:shadow-lg hover:shadow-crypto-neon-purple/50 transition-all duration-300"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-3 py-2 bg-black/20 rounded-lg">
          {isOnBNBTestnet ? (
            <CheckCircle className="h-4 w-4 text-green-400" />
          ) : (
            <AlertCircle className="h-4 w-4 text-yellow-400" />
          )}
          <span className="text-white font-mono text-sm">{formatAddress(wallet.address)}</span>
        </div>
        
        {!isOnBNBTestnet && (
          <Button 
            onClick={switchToBNBTestnet} 
            size="sm"
            variant="outline" 
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
          >
            Switch Network
          </Button>
        )}
      </div>
    );
  }

  // Full card mode
  return (
    <Card className="bg-gradient-to-br from-crypto-purple/20 to-crypto-blue/20 border-crypto-purple/30 backdrop-blur-sm">
      <CardContent className="p-6 bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Connection
          </h3>
          
          {wallet && (
            <div className="flex items-center gap-2">
              {isOnBNBTestnet ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              )}
              <span className="text-sm text-gray-300">
                {isOnBNBTestnet ? 'BNB Testnet' : 'Wrong Network'}
              </span>
            </div>
          )}
        </div>

        {!wallet ? (
          <div className="text-center py-4">
            <p className="text-gray-300 mb-4">
              Connect your wallet to create tokens on BNB Smart Chain Testnet
            </p>
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting}
              className="bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue hover:shadow-lg hover:shadow-crypto-neon-purple/50 transition-all duration-300"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
              <span className="text-gray-300">Address:</span>
              <span className="text-white font-mono">{formatAddress(wallet.address)}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
              <span className="text-gray-300">Network:</span>
              <span className={`font-medium ${isOnBNBTestnet ? 'text-green-400' : 'text-yellow-400'}`}>
                {isOnBNBTestnet ? 'BNB Smart Chain Testnet' : `Chain ID: ${wallet.chainId}`}
              </span>
            </div>

            {!isOnBNBTestnet && (
              <Button 
                onClick={switchToBNBTestnet} 
                variant="outline" 
                className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
              >
                Switch to BNB Testnet
              </Button>
            )}

            {/* Prominent Get Testnet BNB Button */}
            <Button
              asChild
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold"
            >
              <a 
                href="https://testnet.binance.org/faucet-smart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Coins className="h-4 w-4" />
                Get Free Testnet BNB
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>

            <p className="text-xs text-gray-400 text-center">
              Click above to get free testnet BNB from the official faucet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletConnect;
