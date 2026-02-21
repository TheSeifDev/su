import React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;

  // Primary Action
  buttonText: string;
  handleClick: () => void;
  buttonIcon?: React.ReactNode;
  isLoading?: boolean;

  // Secondary Action (Optional)
  secondaryButtonText?: string;
  onSecondaryClick?: () => void;

  // Visuals (Optional)
  image?: string;
  headerIcon?: React.ReactNode;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  description,
  className,
  children,
  buttonText,
  handleClick,
  buttonIcon,
  isLoading = false,
  image,
  headerIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "flex w-full max-w-130 flex-col gap-6 border border-white/10 bg-slate-950/20 p-6 sm:p-8",
        "backdrop-blur-2xl text-white shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] sm:rounded-3xl",
        className
      )}>
        <div className="flex flex-col gap-6">

          {(image || headerIcon) && (
            <div className="flex w-full justify-center pb-2">
              {image ? (
                <Image
                  src={image}
                  alt="Modal illustration"
                  width={72}
                  height={72}
                  className="object-contain drop-shadow-xl"
                />
              ) : (
                <div className="flex size-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-200 shadow-inner">
                  {headerIcon}
                </div>
              )}
            </div>
          )}

          <DialogHeader className="flex flex-col gap-2 text-center sm:text-center">
            <DialogTitle className="text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </DialogTitle>

            {description && (
              <DialogDescription className="text-sm font-medium text-zinc-400">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          {children && (
            <div className="py-2">
              {children}
            </div>
          )}
          <DialogFooter className="mt-2 flex-col gap-3 sm:flex-row sm:justify-end sm:space-x-0">
            <button
              disabled={isLoading}
              onClick={handleClick}
              className={cn(
                "group flex w-full flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-semibold text-white transition-all duration-300 ease-out",
                "hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
                "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600 disabled:active:scale-100 disabled:hover:shadow-none"
              )}
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin text-white/80" />
              ) : (
                <>
                  {buttonIcon && (
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {buttonIcon}
                    </span>
                  )}
                  {buttonText}
                </>
              )}
            </button>

          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal