'use client'

import { cn } from '@/lib/utils'
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks
} from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Loader2, Users } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import EndCallButton from '../EndCallButton'

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal')
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setShowParticipants] = useState(false)

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950">
        <Loader2 className="size-10 animate-spin text-blue-500" />
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
    <section className="relative h-screen w-full overflow-hidden bg-slate-950 text-white">
      {/* Main Video Area */}
      <div className="relative flex size-full items-center justify-center p-2 sm:p-4 pb-28 sm:pb-32">
        <div className="flex size-full max-w-350 items-center justify-center stream-video-rounded">
          {callLayout}
        </div>

        {/* Floating Participants Panel (Responsive) */}
        <div className={cn(
          'absolute z-40 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl transition-all duration-300 ease-out shadow-2xl',
          'max-sm:bottom-24 max-sm:left-2 max-sm:right-2 max-sm:top-2',
          'sm:right-6 sm:top-6 sm:bottom-32',
          showParticipants
            ? 'w-full sm:w-100 translate-x-0 opacity-100'
            : 'w-0 translate-x-10 opacity-0 border-none sm:w-0'
        )}>
          <div className="h-full w-full sm:w-100 ">
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        </div>
      </div>

      <div className={cn(
        "fixed z-50 flex items-center justify-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] custom-stream-controls",
        "bottom-4 left-2 right-2 px-4 py-3 flex-wrap",
        "sm:bottom-8 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:px-6 sm:py-3 sm:flex-nowrap"
      )}>

        <CallControls />

        {/* Layout Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(
            'flex size-10 sm:size-12 items-center justify-center rounded-full transition-all duration-300 ease-out',
            'bg-white/5 border border-white/10 text-zinc-300',
            'hover:bg-white/10 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50'
          )}>
            <LayoutList size={20} className="text-white sm:size-5 size-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className='border border-white/10 bg-slate-900/90 backdrop-blur-2xl text-white rounded-2xl shadow-2xl p-2 mb-4'>
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className={cn(
                    'cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200',
                    'hover:bg-white/10 hover:text-white text-zinc-300',
                    layout === item.toLowerCase() && 'bg-blue-500 text-white hover:bg-blue-600'
                  )}
                  onClick={() => {
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }}
                >
                  {item}
                </DropdownMenuItem>
                {index !== 2 && (
                  <DropdownMenuSeparator className='bg-white/5 my-1' />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Stats Button */}
        <div className={cn(
          'flex size-10 sm:size-12 items-center justify-center rounded-full transition-all duration-300 ease-out',
          'bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white hover:scale-105 [&>button]:p-0'
        )}>
          <CallStatsButton />
        </div>

        {/* Participants Toggle */}
        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className={cn(
            'flex size-10 sm:size-12 items-center justify-center rounded-full transition-all duration-300 ease-out',
            'border border-white/10',
            showParticipants
              ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white hover:scale-105',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50'
          )}
        >
          <Users className="text-white sm:size-5 size-4" />
        </button>

        {/* End Call Separator & Button */}
        {!isPersonalRoom && (
          <>
            <div className="mx-1 h-6 sm:h-8 w-px bg-white/10" />
            <EndCallButton />
          </>
        )}
      </div>
    </section>
  )
}

export default MeetingRoom