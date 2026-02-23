import { cn } from '@/lib/utils'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
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

  if (callingState !== CallingState.JOINED) return <Loader2 />


  let callLayout
  switch (layout) {
    case 'grid':
      callLayout = <PaginatedGridLayout />
    case 'speaker-right':
      callLayout = <SpeakerLayout participantsBarPosition='left' />
    default:
      callLayout = <SpeakerLayout participantsBarPosition='right' />
  }

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-5xl items-center">
          {callLayout}
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', { 'show-block': showParticipants })}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
        <CallControls />

        <DropdownMenu>

          <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className='border-gray-900 bg-black text-white'>
            {['Grid', 'Speaker-Left', 'Speaker-right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem className='cursor-pointer'
                  onClick={() => {
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }} >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-gray-950' />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <Users size={20} className='text-white' />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}

export default MeetingRoom