'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between 
      bg-black/20 backdrop-blur-xl border-r border-white/10 
      p-4 pt-20 text-white max-sm:hidden lg:w-66'>

      <div className='flex flex-col gap-3'>
        {sidebarLinks.map((link) => {
          const IconComponent = link.icon;
          const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              key={link.label}
              href={link.route}
              className={cn(
                // Base Layout: Compact, Rounded, Smooth Transition
                'flex items-center gap-3 rounded-xl px-3 py-2.5 justify-start transition-all duration-300 group',

                // Active State: Glassy Blue with border (Matches your source style)
                isActive
                  ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                  : 'border border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
              )}
            >
              <IconComponent
                className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  !isActive && "group-hover:scale-110"
                )}
              />
              <p className={cn(
                'text-base font-medium max-lg:hidden',
                isActive ? 'font-semibold' : ''
              )}>
                {link.label}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Sidebar