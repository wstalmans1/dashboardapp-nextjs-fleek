"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


declare global { interface Window { ethereum: any }}
interface MetaMaskContextProps { walletAddress: string | null; connectWallet: () => void}
const MetaMaskContext = createContext<MetaMaskContextProps | undefined>(undefined);


export const MetaMaskProvider = ({ children }: { children: ReactNode }) => {
  
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // ****** Get an account from MetaMask ******
  const connectWallet = async () => {
    if (window.ethereum) {
      console.log("Metamask detected");
      try {
        const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
      } catch (error) {console.error("Error connecting to MetaMask:", error)}
    } else {console.error("MetaMask not detected")}
  };

  // ****** Event listener: listen for account changes and reflect them in front-end ******
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        setWalletAddress(accounts[0] || null);
      };
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      // Cleanup function to remove the listener when then component unmounts
      return () => { window.ethereum.removeListener("accountsChanged", handleAccountsChanged)};
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <MetaMaskContext.Provider value={{ walletAddress, connectWallet }}>
      {children}
    </MetaMaskContext.Provider>
  );
};


export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a MetaMaskProvider');
  }
  return context;
};
