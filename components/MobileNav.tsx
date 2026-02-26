'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X, Hexagon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [isOpen]);

  const portalContent = (
    <div className={cn("fixed inset-0 z-99999 transition-all duration-300", isOpen ? 'visible' : 'invisible')}>
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Drawer */}
      <aside
        className={cn(
          "absolute left-0 top-0 h-full w-72 bg-zinc-950 border-r border-white/[0.04] p-6 shadow-2xl shadow-black/50 transition-transform duration-300 ease-in-out flex flex-col justify-between",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-xl shadow-lg shadow-blue-500/25">
                <Hexagon size={22} fill="currentColor" className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                TADs
              </h1>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

              return (
                <Link
                  key={link.label}
                  href={link.route}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl p-3 transition-all duration-200 relative',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
                    isActive
                      ? 'bg-blue-500/10 border border-blue-500/15 text-blue-400 shadow-sm shadow-blue-500/5'
                      : 'text-zinc-500 hover:text-white hover:bg-white/[0.04]'
                  )}
                >
                  <IconComponent size={18} />
                  <span className="text-sm font-medium">{link.label}</span>
                  {isActive && (
                    <div className="absolute right-3 size-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.5)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mb-4 rounded-xl bg-white/[0.02] p-4 border border-white/[0.04]">
          <p className="text-[10px] text-zinc-700 text-center font-medium tracking-wider uppercase">© {new Date().getFullYear()} TADs</p>
        </div>
      </aside>
    </div>
  );

  return (
    <section className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-zinc-400 hover:text-white transition-colors duration-200 rounded-xl hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
      >
        <Menu size={22} />
      </button>

      {mounted && createPortal(portalContent, document.body)}
    </section>
  );
}

export default MobileNav