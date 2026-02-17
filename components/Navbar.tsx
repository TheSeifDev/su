'use client'

import React, { useState } from 'react'
import { Bell, Search, User, LogOut, Settings, ChevronDown, Command, Home, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import MobileNav from './MobileNav'

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((path) => path !== '');

  return (
    <nav className="flex w-full items-center justify-between bg-zinc-950/70 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Trigger */}
        <MobileNav />

        {/* Dynamic Breadcrumbs (Hidden on very small screens) */}
        <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            <Home size={16} />
          </Link>

          {pathSegments.length > 0 && <ChevronRight size={14} className="text-zinc-700" />}

          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <React.Fragment key={href}>
                {isLast ? (
                  <span className="font-medium text-zinc-100 bg-white/5 px-2 py-0.5 rounded-md border border-white/5 capitalize">
                    {segment.replace(/-/g, ' ')}
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href={href} className="hover:text-zinc-200 transition-colors capitalize">
                      {segment.replace(/-/g, ' ')}
                    </Link>
                    <ChevronRight size={14} className="text-zinc-700" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden lg:flex items-center gap-2 rounded-lg bg-zinc-900/50 px-3 py-1.5 border border-white/10 group focus-within:border-blue-500/50 focus-within:bg-zinc-900 transition-all w-64">
          <Search size={14} className="text-zinc-500 group-focus-within:text-blue-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-white placeholder-zinc-600 outline-none w-full"
          />
          <kbd className="flex items-center gap-0.5 bg-white/5 border border-white/5 rounded px-1.5 py-0.5 text-[10px] text-zinc-500 font-medium">
            <Command size={10} /> K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-zinc-100 transition-all">
          <Bell size={18} />
          <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
        </button>

        <div className="h-5 w-px bg-white/10"></div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={cn(
              "flex items-center gap-2 pl-1 pr-1 sm:pr-2 py-1 rounded-full border transition-all duration-200",
              isProfileOpen ? "bg-white/10 border-white/10" : "bg-transparent border-transparent hover:bg-white/5"
            )}
          >
            <div className="h-8 w-8 rounded-full bg-linear-to-tr from-blue-500 to-indigo-500 p-[1.5px]">
              <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center overflow-hidden">
                <User size={16} className="text-white" />
              </div>
            </div>
            <ChevronDown size={14} className={cn("text-zinc-500 transition-transform hidden sm:block", isProfileOpen && "rotate-180")} />
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-zinc-950 border border-white/10 shadow-2xl z-50 py-1.5 animate-in fade-in zoom-in-95">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm text-white font-medium">Seif Ayman</p>
                  <p className="text-xs text-zinc-500 truncate">cto@nabdmasr.com</p>
                </div>
                <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 mx-1.5 mt-1 rounded-lg">
                  <Settings size={16} /> Account Settings
                </Link>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 mx-1.5 mb-1 rounded-lg text-left mt-1">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
    </nav>
  )
}

export default Navbar