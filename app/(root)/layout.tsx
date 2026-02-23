import React, { ReactNode } from 'react'

import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Edux Platform",
  description: "Video calling app for universitys",
  // icons:{
  //   icon= '/'
  // }
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout  