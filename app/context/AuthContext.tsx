'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

export default function AuthContext({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider session={undefined}>
      {children}
    </SessionProvider>
  );
} 