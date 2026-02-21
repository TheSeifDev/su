'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { meetingCards } from '@/constants/meetingCards'
import MeetingModal from './MeetingModal'
import { Video } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<string | undefined>(undefined);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  })
  const [callDetails, setCallDetails] = useState<Call>()

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast.error("Please select a date and time for the meeting.");
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) throw new Error("Failed to create call")

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
          members: [
            { user_id: user.id }
          ]
        }
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

      toast.success("Meeting created successfully")
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast.error("Failed to create meeting")
    }
  }

  return (
    <>
      <section className='z-10 grid grid-cols-2 gap-5 lg:grid-cols-4'>
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
      </section>

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        description="Instantly spin up a room and invite your team to join."
        buttonText="Start Meeting"
        headerIcon={<Video className="size-8" />}
        buttonIcon={<Video className="size-5" />}
        secondaryButtonText="Cancel"
        handleClick={createMeeting}
      />
    </>
  )
}

export default MeetingTypeList