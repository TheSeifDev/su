import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='flex h-screen w-full bg-zinc-950 text-white overflow-hidden'>
      <Sidebar />
      {/* Increased z-index here to ensure Navbar stays above content */}
      <div className="flex flex-1 flex-col h-screen overflow-hidden relative z-10">
        <Navbar />
        <section className='flex-1 overflow-y-auto px-4 pb-6 pt-4 sm:px-8 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent'>
          {/* Content is below because it follows Navbar in the DOM and has no higher Z */}
          <div className="mx-auto w-full max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}
export default HomeLayout