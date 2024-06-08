"use client";

import { Card } from '../ui/dashboard/cards';
//import RevenueChart from '@/app/ui/dashboard/revenue-chart';
//import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { Inter } from 'next/font/google';
import { useBlockchain } from '../blockchain/useblockchainhook';
 
const inter = Inter({ subsets: ['latin'] });

export default function Page() {

  const { balance, transactionHash, loading, handleRSVP, handlePayBill, contractAddress } = useBlockchain();

  return (
    <main>
      <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Contract" value={contractAddress} type="contract" />
        <Card title="Balance" value={balance !== null ? balance : 'Loading...'} type="collected" />
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card title="Total Customers" value={numberOfCustomers} type="customers" /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> */}
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}