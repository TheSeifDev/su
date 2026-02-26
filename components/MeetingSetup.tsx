'use client';

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Video, Mic, MicOff, VideoOff, Settings, ArrowRight } from 'lucide-react';

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
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
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950 px-4 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-blue-600/[0.04] blur-[150px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/15 text-blue-400 mb-2">
            <Video size={24} />
          </div>
          <h1 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>Ready to join?</h1>
          <p className="text-sm font-medium text-zinc-500 max-w-sm">Setup your audio and video before entering the meeting</p>
        </div>

        {/* Video Preview */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/50 shadow-2xl shadow-black/40">
          <div className="aspect-video w-full">
            <VideoPreview />
          </div>
          {/* Status indicators */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-xl border transition-all duration-200",
              isMicCamtoggledOn
                ? "bg-red-500/20 border-red-500/30 text-red-400"
                : "bg-white/10 border-white/10 text-white"
            )}>
              {isMicCamtoggledOn ? <MicOff size={12} /> : <Mic size={12} />}
              {isMicCamtoggledOn ? 'Muted' : 'Mic On'}
            </div>
            <div className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-xl border transition-all duration-200",
              isMicCamtoggledOn
                ? "bg-red-500/20 border-red-500/30 text-red-400"
                : "bg-white/10 border-white/10 text-white"
            )}>
              {isMicCamtoggledOn ? <VideoOff size={12} /> : <Video size={12} />}
              {isMicCamtoggledOn ? 'Cam Off' : 'Cam On'}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className='flex w-full flex-col items-center gap-5 sm:flex-row sm:justify-center'>
          {/* Toggle */}
          <button
            onClick={() => setIsMicCamtoggledOn(!isMicCamtoggledOn)}
            className={cn(
              'flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-200 border',
              isMicCamtoggledOn
                ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/15'
                : 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:bg-white/[0.06] hover:text-white'
            )}
          >
            {isMicCamtoggledOn ? <MicOff size={16} /> : <Mic size={16} />}
            {isMicCamtoggledOn ? 'Mic & Camera Off' : 'Mic & Camera On'}
          </button>

          {/* Device Settings */}
          <div className={cn(
            'flex items-center justify-center rounded-xl transition-all duration-200 ease-out',
            'bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.06] hover:text-white',
            'focus-within:ring-2 focus-within:ring-blue-500/30'
          )}>
            <DeviceSettings />
          </div>
        </div>

        {/* Join Button */}
        <Button
          className={cn(
            "group flex w-full max-w-xs items-center justify-center gap-2.5 rounded-xl px-8 py-6 text-base font-bold text-white transition-all duration-300 ease-out",
            "bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)]",
            "active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
          )}
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
        >
          Join Meeting
          <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </div>
  )
}

export default MeetingSetup