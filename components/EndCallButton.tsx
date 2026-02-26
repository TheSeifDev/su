'use client'

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { PhoneOff } from 'lucide-react';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button onClick={async () => {
      await call.endCall();
      router.push('/')
    }}
      className='flex items-center gap-2 rounded-full bg-red-600 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-red-500 hover:shadow-[0_0_20px_-3px_rgba(239,68,68,0.4)] active:scale-[0.95]'>
      <PhoneOff size={16} />
      <span className="hidden sm:inline">End Call</span>
    </Button>
  )
}

export default EndCallButton