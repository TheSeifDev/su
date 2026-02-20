'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { meetingCards } from '@/constants/meetingCards'
// import MeetingModal from './MeetingModal'

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<string | undefined>(undefined);

  // const createMeeting = () => {

  // }

  return (
    <>
      <section className='grid grid-cols-2 gap-5 lg:grid-cols-4 z-10'>
        {meetingCards.map((card, index) => {
          const IconComponent = card.icon;

          return (
            <div
              key={index}
              onClick={() => setMeetingState(card.meetingState)}
              className={cn(
                'group flex flex-col justify-between w-full aspect-square rounded-3xl p-5 cursor-pointer transition-all duration-300 ease-out',
                'bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:-translate-y-1',
                card.colorGroup
              )}
            >
              <div className={cn(
                'flex items-center justify-center size-12 rounded-2xl bg-white/10 border border-white/5 text-zinc-400 transition-all duration-300 ease-out shadow-lg',
                card.iconHover
              )}>
                <IconComponent className='size-5 transition-transform duration-300 ease-out group-hover:scale-110' />
              </div>

              <div className='flex flex-col gap-1'>
                <h3 className='text-lg font-bold text-white transition-colors duration-300 group-hover:text-blue-400 lg:text-xl'>
                  {card.title}
                </h3>
                <p className='text-xs font-medium text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 lg:text-sm'>
                  {card.description}
                </p>
              </div>
            </div>
          )
        })}
        {/* <MeetingModal
          isOpen={meetingState === 'isInstantMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Instant Meeting Modal"
          className="text-center"
          buttonText="Start Meeting"
          handleClick={createMeeting}
        /> */}
      </section>
      {meetingState && (
        <div className="text-center text-sm text-zinc-400 p-4 bg-white/5 rounded-xl border border-white/10 w-max mx-auto mt-4 backdrop-blur-md z-10 transition-all">
          Active Modal State: <span className="text-blue-400 font-bold">{meetingState}</span>
        </div>
      )}
    </>
  )
}

export default MeetingTypeList