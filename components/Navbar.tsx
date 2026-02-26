'use client'

import React, { useState } from 'react'
import { Bell, Search, Command, Home, ChevronRight, Settings, LogOut, User, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const pathname = usePathname();
  const pathSegments = pathname?.split('/').filter((path) => path !== '') || [];
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between bg-zinc-950/80 backdrop-blur-2xl border-b border-white/[0.04] px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <MobileNav />
        <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-md p-0.5">
            <Home size={16} />
          </Link>

          {pathSegments.length > 0 && <ChevronRight size={14} className="text-zinc-700" />}

          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <React.Fragment key={href}>
                {isLast ? (
                  <span className="font-semibold text-zinc-100 bg-white/5 px-2.5 py-1 rounded-lg border border-white/[0.06] capitalize text-xs">
                    {segment.replace(/-/g, ' ')}
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href={href} className="hover:text-zinc-200 transition-colors duration-200 capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-md px-1 py-0.5">
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
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar */}
        <div className={cn(
          "hidden lg:flex items-center gap-2.5 rounded-xl px-4 py-2 border transition-all duration-300 ease-out",
          isSearchFocused
            ? "w-80 bg-zinc-900/90 border-blue-500/30 shadow-lg shadow-blue-500/5"
            : "w-56 bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/10"
        )}>
          <Search size={14} className={cn("transition-colors duration-300", isSearchFocused ? "text-blue-400" : "text-zinc-500")} />
          <input
            type="text"
            placeholder="Search meetings..."
            className="bg-transparent text-sm text-white placeholder-zinc-600 outline-none w-full"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <kbd className={cn(
            "flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold transition-all duration-300",
            isSearchFocused ? "bg-blue-500/10 border border-blue-500/20 text-blue-400" : "bg-white/5 border border-white/[0.06] text-zinc-600"
          )}>
            <Command size={9} /> K
          </kbd>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={cn(
              "relative p-2.5 rounded-xl text-zinc-400 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
              isNotifOpen ? "bg-white/10 text-white" : "hover:bg-white/5 hover:text-zinc-100"
            )}
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          </button>

          {/* Notification Dropdown */}
          {isNotifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-zinc-950 border border-white/[0.08] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-5 py-4 border-b border-white/5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Notifications</h3>
                    <span className="flex items-center justify-center size-5 rounded-full bg-blue-500 text-[10px] font-bold text-white">3</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  {[
                    { title: 'Meeting starting in 5 min', desc: 'Team Standup is about to begin', time: '2 min ago', unread: true },
                    { title: 'Recording ready', desc: 'Product Review recording is available', time: '1 hr ago', unread: true },
                    { title: 'New participant joined', desc: 'Ahmed joined your personal room', time: '3 hrs ago', unread: false },
                  ].map((notif, i) => (
                    <div key={i} className={cn(
                      "flex items-start gap-3 px-5 py-3.5 transition-colors duration-200 hover:bg-white/[0.03] cursor-pointer",
                      notif.unread && "bg-blue-500/[0.03]"
                    )}>
                      {notif.unread && <div className="mt-1.5 size-2 rounded-full bg-blue-500 shrink-0" />}
                      <div className={cn("flex flex-col gap-0.5", !notif.unread && "ml-5")}>
                        <span className="text-sm font-semibold text-white">{notif.title}</span>
                        <span className="text-xs text-zinc-500">{notif.desc}</span>
                        <span className="text-[10px] text-zinc-700 mt-0.5">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 px-5 py-3">
                  <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-5 w-px bg-white/[0.06]"></div>

        {/* Profile */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

    </nav>
  )
}

export default Navbar