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
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Drawer */}
      <aside
        className={cn(
          "absolute left-0 top-0 h-full w-70 bg-zinc-950 border-r border-white/10 p-6 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
                <Hexagon size={24} fill="currentColor" className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Edux
              </h1>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400">
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

              return (
                <Link
                  key={link.label}
                  href={link.route}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl p-4 transition-all duration-300',
                    isActive
                      ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <IconComponent size={20} />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mb-4 rounded-xl bg-white/5 p-4 border border-white/5">
          <p className="text-xs text-zinc-500 text-center">© {new Date().getFullYear()} Edux</p>
        </div>
      </aside>
    </div>
  );

  return (
    <section className="md:hidden">
      <button onClick={() => setIsOpen(true)} className="p-2 text-zinc-400">
        <Menu size={24} />
      </button>

      {mounted && createPortal(portalContent, document.body)}
    </section>
  );
}

export default MobileNav