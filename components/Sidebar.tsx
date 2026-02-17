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
        'sticky left-0 top-0 flex h-screen flex-col justify-between bg-black/20 backdrop-blur-xl border-r border-white/10 pt-6 text-white max-md:hidden transition-all duration-300 ease-in-out z-40',
        isCollapsed ? 'w-20 px-3' : 'w-65 px-4'
      )}
    >
      <div className='flex flex-col gap-8'>

        {/* HEADER: LOGO & CLOSE ICON */}
        <div className={cn(
          "flex items-center transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-between pl-2"
        )}>

          {/* 1. LOGO: Clicking this OPENS the sidebar if it's collapsed */}
          <div
            onClick={() => isCollapsed && setIsCollapsed(false)}
            className={cn(
              "flex items-center gap-3 transition-opacity duration-300",
              isCollapsed ? "cursor-pointer hover:opacity-80" : "cursor-default"
            )}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
              <Hexagon size={24} fill="currentColor" className="text-white" />
            </div>

            {/* Logo Text (Hidden when collapsed) */}
            <h1 className={cn(
              "text-xl font-bold bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent whitespace-nowrap",
              isCollapsed ? "hidden" : "block"
            )}>
              Edux
            </h1>
          </div>

          {/* 2. CLOSE ICON: Only visible when sidebar is OPEN */}
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        {/* NAVIGATION LINKS */}
        <div className='flex flex-col gap-2'>
          {sidebarLinks.map((link) => {
            const IconComponent = link.icon;
            const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

            return (
              <Link
                key={link.label}
                href={link.route}
                title={isCollapsed ? link.label : ''}
                className={cn(
                  'flex items-center gap-3 rounded-xl p-4 transition-all duration-300 group relative',
                  isCollapsed ? 'justify-center' : 'justify-start',
                  isActive
                    ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                    : 'border border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
                )}
              >
                <IconComponent
                  className={cn(
                    "h-5 w-5 min-w-5 transition-transform duration-300",
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
              </Link>
            )
          })}
        </div>
      </div>

      {/* Footer / User info (Optional - hides on collapse) */}
      <div className={cn(
        "mb-6 rounded-xl bg-white/5 p-3 border border-white/5 overflow-hidden transition-all duration-300",
        isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
      )}>
        <p className="text-xs text-zinc-500 text-center">© {new Date().getFullYear()} Edux</p>
      </div>

    </section>
  )
}

export default Sidebar