import { BanknotesIcon, ClockIcon, UserGroupIcon, InboxIcon, CubeIcon } from '@heroicons/react/24/outline';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  contract: CubeIcon,
};
  
  export default function CardWrapper() {
    return (
      <>
        {/* NOTE: comment in this code when you get to this point in the course */}
  
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </>
    );
  }
  
  export function Card({
    title,
    value,
    type,
    children,
    tooltipText,
  }: {
    title: string;
    value?: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected' | 'contract';
    children?: React.ReactNode;
    tooltipText?: string;
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="group relative rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className={`ml-2 text-sm font-medium ${inter.className}`}>{title}</h3>
        </div>
        {value !== undefined ? (  
          <p className={`truncate rounded-xl bg-white px-4 py-8 text-center text-sm font-medium ${inter.className}`} >
            {value}
          </p>
        ) : null}
        {children && (
          <div className={`rounded-xl bg-white px-4 py-8 text-center text-sm font-medium ${inter.className}`}>
            {children}
          </div>
        )}
              
        {/* Tooltip */}
        {tooltipText && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden w-64 rounded-md bg-black p-2 text-xs text-white shadow-lg group-hover:block">
            {tooltipText}
          </div>
        )}
      </div>
    );
  }
  