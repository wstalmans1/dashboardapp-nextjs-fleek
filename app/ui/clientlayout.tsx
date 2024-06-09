"use client";

import React from 'react';
import { MetaMaskProvider } from '../blockchain/metamaskprovider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <MetaMaskProvider>
      {children}
    </MetaMaskProvider>
  );
}
