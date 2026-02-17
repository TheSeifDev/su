'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-slate-900 p-6 pt-26 text-white max-sm:hidden lg:w-66'>
      <div className='flex flex-col gap-6'>
        {sidebarLinks.map((link) => {
          const IconComponent = link.icon;
          const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              key={link.label}
              href={link.route} 
              className={cn('flex items-center gap-4 rounded-lg p-4 justify-start',{
                  'bg-blue-500': isActive,
                })}
            >
              <IconComponent className="h-6 w-6" />
              <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Sidebar