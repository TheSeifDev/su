'use client';

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value:boolean) => void }) => {
  const [isMicCamtoggledOn, setIsMicCamtoggledOn] = useState(false)

  const call = useCall();

  if (!call) {
    throw new Error("useCall must be used within a StreamCall component");
  }

  useEffect(() => {
    if (isMicCamtoggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }

  }, [isMicCamtoggledOn, call?.camera, call?.microphone])

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-slate-950 px-4 text-white">
      
      {/* Sleek Header */}
      <div className="flex flex-col items-center gap-2">
        <h1 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>Ready to join?</h1>
        <p className="text-sm font-medium text-zinc-400">Setup your audio and video before entering</p>
      </div>

      {/* Video Preview Container (Glassmorphism & Rounded Corners) */}
      <div className="relative flex aspect-video w-full max-w-2xl items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-xl">
        <VideoPreview />
      </div>

      {/* Controls Container */}
      <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-6'>
        
        {/* Custom Styled Checkbox */}
        <label className='group flex cursor-pointer items-center justify-center gap-3 font-medium text-zinc-300 transition-colors hover:text-white'>
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={isMicCamtoggledOn}
              onChange={(e) => setIsMicCamtoggledOn(e.target.checked)}
              className={cn(
                "peer size-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-black/40 transition-all duration-200",
                "checked:border-blue-500 checked:bg-blue-600",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/50 group-hover:border-white/40"
              )}
            />
            {/* Custom SVG Check Icon (Only visible when checked) */}
            <svg 
              className="pointer-events-none absolute size-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          Join with mic and camera off
        </label>

        {/* Device Settings Wrapper */}
        <div className={cn(
          'flex items-center justify-center rounded-xl transition-all duration-300 ease-out',
          'bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white',
          'focus-within:ring-2 focus-within:ring-blue-500/50'
        )}>
          <DeviceSettings />
        </div>
      </div>

      {/* Modern Join Button */}
      <Button 
        className={cn(
          "mt-4 flex items-center justify-center gap-2 rounded-xl px-8 py-6 text-base font-semibold text-white transition-all duration-300 ease-out",
          "bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_20px_-3px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
        )}
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup