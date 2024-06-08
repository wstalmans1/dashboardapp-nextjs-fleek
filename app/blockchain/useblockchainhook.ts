// hooks/useBlockchain.ts
import { useState, useEffect } from 'react';
import { getTotalDeposits, rsvp, payBill, contractAddress } from './contractfunctionspartysplit';

export function useBlockchain() {
    const [balance, setBalance] = useState<string | null>(null);
    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
  
    async function fetchBalance() {
      try {
        const balanceValue = await getTotalDeposits();
        setBalance(balanceValue.toString()); // Convert bigint to string
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  
    async function handleRSVP() {
      setTransactionHash(null);
      setLoading(true);
      try {
        const txHash = await rsvp();
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
        const txHash = await payBill(venueAddress, billAmount);
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