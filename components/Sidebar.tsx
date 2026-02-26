'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { Hexagon, ChevronLeft } from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <section
      className={cn(
        'sticky left-0 top-0 flex h-screen flex-col justify-between bg-zinc-950/50 backdrop-blur-2xl border-r border-white/[0.04] pt-6 text-white max-md:hidden transition-all duration-300 ease-in-out z-40',
        isCollapsed ? 'w-20 px-3' : 'w-64 px-4'
      )}
    >
      <div className='flex flex-col gap-8'>

        {/* HEADER: LOGO & CLOSE ICON */}
        <div className={cn(
          "flex items-center transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-between pl-2"
        )}>
          <div
            onClick={() => isCollapsed && setIsCollapsed(false)}
            className={cn(
              "flex items-center gap-3 transition-opacity duration-300",
              isCollapsed ? "cursor-pointer hover:opacity-80" : "cursor-default"
            )}
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-xl shadow-lg shadow-blue-500/25">
              <Hexagon size={22} fill="currentColor" className="text-white" />
            </div>
            <h1 className={cn(
              "text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent whitespace-nowrap",
              isCollapsed ? "hidden" : "block"
            )}>
              Edux
            </h1>
          </div>

          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1.5 rounded-xl text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* NAVIGATION LINKS */}
        <div className='flex flex-col gap-1'>
          {sidebarLinks.map((link) => {
            const IconComponent = link.icon;
            const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

            return (
              <Link
                key={link.label}
                href={link.route}
                title={isCollapsed ? link.label : ''}
                className={cn(
                  'flex items-center gap-3 rounded-xl p-3 transition-all duration-200 group relative',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
                  isCollapsed ? 'justify-center' : 'justify-start',
                  isActive
                    ? 'bg-blue-500/10 border border-blue-500/15 text-blue-400 shadow-sm shadow-blue-500/5'
                    : 'border border-transparent text-zinc-500 hover:text-white hover:bg-white/[0.04]'
                )}
              >
                <IconComponent
                  className={cn(
                    "h-[18px] w-[18px] min-w-[18px] transition-all duration-200",
                    !isActive && "group-hover:scale-110"
                  )}
                />

                <p className={cn(
                  'text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300',
                  isActive ? 'font-semibold' : '',
                  isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block"
                )}>
                  {link.label}
                </p>

                {isActive && !isCollapsed && (
                  <div className="absolute right-3 size-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.5)]" />
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className={cn(
        "mb-6 rounded-xl bg-white/[0.02] p-3 border border-white/[0.04] overflow-hidden transition-all duration-300",
        isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
      )}>
        <p className="text-[10px] text-zinc-700 text-center font-medium tracking-wider uppercase">© {new Date().getFullYear()} Edux</p>
      </div>

    </section>
  )
}

export default Sidebar