'use client'

import { cn } from '@/lib/utils'
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks
} from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Loader2, Users, Grid3X3, LayoutPanelLeft, LayoutPanelTop, X, Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const layoutOptions = [
  { key: 'grid' as const, label: 'Grid View', icon: Grid3X3 },
  { key: 'speaker-left' as const, label: 'Speaker Left', icon: LayoutPanelLeft },
  { key: 'speaker-right' as const, label: 'Speaker Right', icon: LayoutPanelTop },
];

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal')
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setShowParticipants] = useState(false)

  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-zinc-950">
        <div className="relative">
          <Loader2 className="size-12 animate-spin text-blue-500" />
          <div className="absolute inset-0 size-12 animate-ping rounded-full bg-blue-500/20" />
        </div>
        <p className="text-sm font-medium text-zinc-500 animate-pulse">Connecting to meeting...</p>
      </div>
    )
  }

  let callLayout;
  switch (layout) {
    case 'grid':
      callLayout = <PaginatedGridLayout />
      break;
    case 'speaker-right':
      callLayout = <SpeakerLayout participantsBarPosition='left' />
      break;
    default:
      callLayout = <SpeakerLayout participantsBarPosition='right' />
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white">
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 size-96 rounded-full bg-blue-600/[0.03] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-purple-600/[0.03] blur-[120px]" />
      </div>

      {/* Main Video Area */}
      <div className="relative flex size-full items-center justify-center p-2 sm:p-3 lg:p-4 pb-24 sm:pb-28">
        <div className="flex size-full max-w-[1600px] items-center justify-center">
          {callLayout}
        </div>

        {/* ==================== PARTICIPANTS PANEL ==================== */}

        {/* Backdrop overlay (mobile only) */}
        {showParticipants && (
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm sm:hidden"
            onClick={() => setShowParticipants(false)}
          />
        )}

        <div className={cn(
          'fixed z-40 flex flex-col overflow-hidden transition-all duration-300 ease-in-out participants-panel-override',

          // Mobile: bottom drawer
          'max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:rounded-t-3xl',
          'max-sm:border-t max-sm:border-white/[0.08]',

          // Desktop: side panel
          'sm:absolute sm:right-3 sm:top-3 sm:bottom-24 sm:rounded-2xl',
          'sm:border sm:border-white/[0.06]',

          // Shared
          'bg-zinc-950/95 backdrop-blur-2xl shadow-2xl shadow-black/50',

          // Open/close states
          showParticipants
            ? 'max-sm:h-[60vh] sm:w-[340px] lg:w-[360px] translate-y-0 sm:translate-x-0 opacity-100'
            : 'max-sm:h-0 max-sm:translate-y-full sm:w-0 sm:translate-x-10 opacity-0 border-none pointer-events-none'
        )}>

          {/* ---- Panel Header ---- */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Users size={15} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Participants</span>
                <span className="flex items-center justify-center h-5 min-w-[20px] rounded-full bg-blue-500/15 px-1.5 text-[10px] font-bold text-blue-400 border border-blue-500/20">
                  {participantCount}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowParticipants(false)}
              className="flex size-8 items-center justify-center rounded-xl text-zinc-500 transition-all duration-200 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
            >
              <X size={16} />
            </button>
          </div>


          {/* ---- Participant List ---- */}
          <div className="flex-1 overflow-y-auto px-2 py-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>

          {/* ---- Panel Footer ---- */}
          <div className="border-t border-white/[0.04] px-5 py-3 shrink-0">
            <p className="text-[10px] font-medium text-zinc-700 text-center uppercase tracking-wider">
              {participantCount} {participantCount === 1 ? 'person' : 'people'} in this meeting
            </p>
          </div>
        </div>
      </div>

      {/* ==================== CONTROL DOCK ==================== */}
      <div className={cn(
        "fixed z-50 flex items-center justify-center custom-stream-controls",
        "animate-in fade-in slide-in-from-bottom-4 duration-500",
        // Mobile: full-width bottom bar
        "bottom-0 left-0 right-0 px-4 py-3.5",
        "bg-black/60 backdrop-blur-2xl border-t border-white/[0.06]",
        "gap-2 flex-wrap",
        // Desktop: floating glass pill
        "sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2",
        "sm:rounded-3xl sm:border sm:border-white/[0.08]",
        "sm:px-6 sm:py-3.5 sm:flex-nowrap sm:gap-3",
        "sm:bg-black/40 sm:shadow-[0_8px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]"
      )}>

        <CallControls />

        <div className="hidden sm:block h-7 w-px bg-white/[0.08]" />

        {/* Layout Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(
            'relative flex size-10 sm:size-11 items-center justify-center rounded-full transition-all duration-200 ease-out',
            'bg-white/[0.05] border border-white/[0.08] text-zinc-300',
            'hover:bg-white/[0.1] hover:text-white hover:scale-105',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40'
          )}>
            <LayoutList size={18} />
          </DropdownMenuTrigger>

          <DropdownMenuContent className='border border-white/[0.08] bg-zinc-900/95 backdrop-blur-2xl text-white rounded-2xl shadow-2xl p-1.5 mb-3 min-w-[180px]'>
            {layoutOptions.map((option) => (
              <DropdownMenuItem
                key={option.key}
                className={cn(
                  'cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-2.5',
                  layout === option.key
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'text-zinc-400 hover:bg-white/[0.06] hover:text-white'
                )}
                onClick={() => setLayout(option.key)}
              >
                <option.icon size={16} />
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Participants Toggle */}
        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className={cn(
            'relative flex size-10 sm:size-11 items-center justify-center rounded-full transition-all duration-200 ease-out',
            'border',
            showParticipants
              ? 'bg-blue-600 border-blue-500/50 text-white shadow-[0_0_20px_-3px_rgba(37,99,235,0.4)]'
              : 'bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.1] hover:text-white hover:scale-105',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40'
          )}
        >
          <Users size={18} />
          {/* Count badge */}
          <span className={cn(
            "absolute -top-1 -right-1 flex items-center justify-center h-4 min-w-[16px] rounded-full text-[9px] font-bold border-2 transition-all duration-200",
            showParticipants
              ? "bg-white text-blue-600 border-blue-600"
              : "bg-blue-500 text-white border-zinc-900"
          )}>
            {participantCount}
          </span>
        </button>

        {/* End Call */}
        {!isPersonalRoom && (
          <>
            <div className="hidden sm:block h-7 w-px bg-white/[0.08]" />
            <EndCallButton />
          </>
        )}
      </div>
    </section>
  )
}

export default MeetingRoom