"use client";

import { Card } from '../ui/dashboard/cards';
//import RevenueChart from '@/app/ui/dashboard/revenue-chart';
//import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { Inter } from 'next/font/google';
import { contractAddress } from '../blockchain/contractfunctionspartysplit';
 
const inter = Inter({ subsets: ['latin'] });

export default async function Page() {
  return (
    <main>
      <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={contractAddress} type="collected" />
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
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