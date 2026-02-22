'use client'
import MeetingRoom from '@/components/MeetingLayout/MeetingRoom';
import MeetingSetup from '@/components/MeetingLayout/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'

const Meeting = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const { call, isCallLoading } = useGetCallById(params.id);

  if (!isLoaded || isCallLoading) return <Loader2 className="size-10 animate-spin text-blue-500" />


  return (
    <main className='w-full h-screen'>
      <StreamCall call={call} >
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting