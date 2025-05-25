
export interface WalletConnection {
  address: string;
  chainId: number;
  isConnected: boolean;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const BNB_TESTNET_CONFIG = {
  chainId: '0x61', // 97 in hex
  chainName: 'BNB Smart Chain Testnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  blockExplorerUrls: ['https://testnet.bscscan.com/'],
};

export const connectWallet = async (): Promise<WalletConnection | null> => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    // Get current chain ID
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    console.log('Connected to wallet:', { accounts, chainId });

    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16),
      isConnected: true,
    };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return null;
  }
};

export const switchToBNBTestnet = async (): Promise<boolean> => {
  if (!window.ethereum) {
    return false;
  }

  try {
    // Try to switch to BNB testnet
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BNB_TESTNET_CONFIG.chainId }],
    });
    return true;
  } catch (switchError: any) {
    // Chain hasn't been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [BNB_TESTNET_CONFIG],
        });
        return true;
      } catch (addError) {
        console.error('Error adding BNB testnet:', addError);
        return false;
      }
    }
    console.error('Error switching to BNB testnet:', switchError);
    return false;
  }
};

export const isWalletConnected = async (): Promise<WalletConnection | null> => {
  if (!window.ethereum) {
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });

    if (accounts.length === 0) {
      return null;
    }

    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16),
      isConnected: true,
    };
  } catch (error) {
    console.error('Error checking wallet connection:', error);
    return null;
  }
};
