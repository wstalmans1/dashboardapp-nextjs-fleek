// pages/index.tsx
"use client";

import { Card } from '../ui/dashboard/cards';
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
        <Card title="Contract" value={contractAddress} type="contract" tooltipText="This is the partysplit contract address" />
        <Card title="Balance" value={balance !== null ? balance : 'Connect a wallet for the balance to load...'} type="collected" tooltipText="The partysplit contract holds currently this as balance" />
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card title="Total Customers" value={numberOfCustomers} type="customers" /> */}
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Contribute" type="contribution" tooltipText="Participation in the splitparty contract requires a contribution of 0.01 ETH. Click on the button to make your contribution">
          <div className="flex flex-col items-center">
            <button onClick={handleRSVP} className="mt-2 p-2 bg-blue-500 text-white rounded">Click to Pay</button>
            {loading && <p>Waiting for your transaction to be confirmed...</p>}
            <p className="mt-2 px-4 text-xs break-words max-w-full px-4">Transaction Hash: {transactionHash}</p>
          </div>
        </Card>
        <Card title="Pay Bill" type="payment" tooltipText="After clicking 'Pay Bill', the balance of the contract wil be used to pay the 'Bill Amount' to the 'Venue Address' and the remainder of the balance will be equally paid back to the contributors" >
          <div className="flex flex-col items-center">
            <input className="mt-2 p-2 border rounded" type="text" placeholder="Venue Address" id="venueAddress" />
            <input className="mt-2 p-2 border rounded" type="text" placeholder="Bill Amount" id="billAmount" />
            <button
              onClick={() => {
                const venueAddress = (document.getElementById('venueAddress') as HTMLInputElement).value;
                const billAmount = (document.getElementById('billAmount') as HTMLInputElement).value;
                handlePayBill(venueAddress, billAmount);
              }}
              className="mt-2 p-2 bg-green-500 text-white rounded"
            >
              Pay Bill
            </button>
          </div>
        </Card>
      </div>
    </main>
  );
}
