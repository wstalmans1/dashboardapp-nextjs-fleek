// hooks/useBlockchain.ts
import { useState, useEffect } from 'react';
import { getTotalDeposits, rsvp, payBill, contractAddress } from './contractfunctionspartysplit';
import { ethers } from 'ethers';

export function useBlockchain(provider: ethers.BrowserProvider, signer: ethers.Signer) {
    const [balance, setBalance] = useState<string | null>(null);
    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
  
    async function fetchBalance() {
      try {
        const balanceValue = await getTotalDeposits(provider, signer);
        setBalance(balanceValue.toString()); // Convert bigint to string
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  
    async function handleRSVP() {
      setTransactionHash(null);
      setLoading(true);
      try {
        const txHash = await rsvp(provider, signer);
        setTransactionHash(txHash);
        await fetchBalance();
      } catch (error) {
        console.error("Transaction failed:", error);
      } finally {
        setLoading(false);
      }
    }
  
    async function handlePayBill(venueAddress: string, billAmount: string) {
      if (!venueAddress || !billAmount) {
        alert("Please enter both venue address and bill amount");
        return;
      }
      setTransactionHash(null);
      setLoading(true);
      try {
        const txHash = await payBill(provider, signer, venueAddress, billAmount);
        setTransactionHash(txHash);
        await fetchBalance();
      } catch (error) {
        console.error("Transaction failed:", error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      fetchBalance();
    }, []);
  
    return {
      balance,
      transactionHash,
      loading,
      handleRSVP,
      handlePayBill,
      contractAddress,
    };
  }