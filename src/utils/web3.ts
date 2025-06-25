/**
 * Web3 Utilities
 * Provides safe access to MetaMask and other Web3 functionality
 */

/**
 * Check if MetaMask is installed and available
 */
export const isMetaMaskAvailable = (): boolean => {
  return typeof window !== 'undefined' && window.ethereum !== undefined;
};

/**
 * Get the current Ethereum address if connected
 */
export const getCurrentAddress = async (): Promise<string | null> => {
  if (!isMetaMaskAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('MetaMask not found. Web3 functionality will be disabled.');
    }
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error('Error getting Ethereum address:', error);
    return null;
  }
};

/**
 * Request connection to MetaMask
 */
export const connectToMetaMask = async (): Promise<string | null> => {
  if (!isMetaMaskAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('MetaMask not found. Web3 functionality will be disabled.');
    }
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    return null;
  }
};

/**
 * Get the current network ID
 */
export const getNetworkId = async (): Promise<string | null> => {
  if (!isMetaMaskAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('MetaMask not found. Web3 functionality will be disabled.');
    }
    return null;
  }

  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    return chainId;
  } catch (error) {
    console.error('Error getting network ID:', error);
    return null;
  }
};

/**
 * Initialize Web3 functionality
 */
export const initializeWeb3 = (): void => {
  if (isMetaMaskAvailable()) {
    console.log('MetaMask is available. Web3 functionality enabled.');
    
    // Set up event listeners for account and chain changes
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      console.log('MetaMask accounts changed:', accounts);
      // Dispatch custom event for the application to handle
      window.dispatchEvent(new CustomEvent('web3AccountsChanged', { detail: accounts }));
    });
    
    window.ethereum.on('chainChanged', (chainId: string) => {
      console.log('MetaMask chain changed:', chainId);
      // Dispatch custom event for the application to handle
      window.dispatchEvent(new CustomEvent('web3ChainChanged', { detail: chainId }));
    });
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.warn('MetaMask not found. Web3 functionality will be disabled.');
    }
  }
};

// Add TypeScript interface for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

export default {
  isMetaMaskAvailable,
  getCurrentAddress,
  connectToMetaMask,
  getNetworkId,
  initializeWeb3
};