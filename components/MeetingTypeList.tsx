'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import ReactDatePicker from 'react-datepicker';
import { toast } from "sonner";
import {
  Loader,
  Calendar,
  Check,
  Link as LinkIcon,
  Video,
  Clock,
  AlignLeft,
  Plus,
  UserPlus
} from 'lucide-react';

import MeetingModal from './MeetingModal';

import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();

  const client = useStreamVideoClient();
  const { user } = useUser();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast.error('Please select a date and time');
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) throw new Error('Failed to create meeting');

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
          members: [{ user_id: user.id, role: 'host' }]
        },
      });

      setCallDetail(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast.success('Meeting Created');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create Meeting');
    }
  };

  if (!client || !user) return <Loader className="animate-spin text-white" />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <section className="z-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* 1. New Meeting Card */}
      <div
        onClick={() => setMeetingState('isInstantMeeting')}
        className={cn(
          'group flex flex-col justify-between w-full aspect-square rounded-3xl p-5 cursor-pointer transition-all duration-300 ease-out',
          'bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:-translate-y-1 hover:bg-white/10'
        )}
      >
        <div className="flex items-center justify-center size-12 rounded-2xl bg-orange-500/20 border border-orange-500/30 text-orange-400 transition-all duration-300 ease-out shadow-lg group-hover:bg-orange-500/30">
          <Plus className="size-5 transition-transform duration-300 ease-out group-hover:scale-110" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-orange-400 lg:text-xl">
            New Meeting
          </h3>
          <p className="text-xs font-medium text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 lg:text-sm">
            Start an instant meeting
          </p>
        </div>
      </div>

      {/* 2. Join Meeting Card */}
      <div
        onClick={() => setMeetingState('isJoiningMeeting')}
        className={cn(
          'group flex flex-col justify-between w-full aspect-square rounded-3xl p-5 cursor-pointer transition-all duration-300 ease-out',
          'bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:-translate-y-1 hover:bg-white/10'
        )}
      >
        <div className="flex items-center justify-center size-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 transition-all duration-300 ease-out shadow-lg group-hover:bg-blue-500/30">
          <UserPlus className="size-5 transition-transform duration-300 ease-out group-hover:scale-110" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-blue-400 lg:text-xl">
            Join Meeting
          </h3>
          <p className="text-xs font-medium text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 lg:text-sm">
            via invitation link
          </p>
        </div>
      </div>

      {/* 3. Schedule Meeting Card */}
      <div
        onClick={() => setMeetingState('isScheduleMeeting')}
        className={cn(
          'group flex flex-col justify-between w-full aspect-square rounded-3xl p-5 cursor-pointer transition-all duration-300 ease-out',
          'bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:-translate-y-1 hover:bg-white/10'
        )}
      >
        <div className="flex items-center justify-center size-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400 transition-all duration-300 ease-out shadow-lg group-hover:bg-purple-500/30">
          <Calendar className="size-5 transition-transform duration-300 ease-out group-hover:scale-110" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-purple-400 lg:text-xl">
            Schedule Meeting
          </h3>
          <p className="text-xs font-medium text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 lg:text-sm">
            Plan your meeting
          </p>
        </div>
      </div>

      {/* 4. View Recordings Card */}
      <div
        onClick={() => router.push('/recordings')}
        className={cn(
          'group flex flex-col justify-between w-full aspect-square rounded-3xl p-5 cursor-pointer transition-all duration-300 ease-out',
          'bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:-translate-y-1 hover:bg-white/10'
        )}
      >
        <div className="flex items-center justify-center size-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 transition-all duration-300 ease-out shadow-lg group-hover:bg-yellow-500/30">
          <Video className="size-5 transition-transform duration-300 ease-out group-hover:scale-110" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-yellow-400 lg:text-xl">
            View Recordings
          </h3>
          <p className="text-xs font-medium text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 lg:text-sm">
            Meeting Recordings
          </p>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Schedule Meeting Modal */}
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          description="Plan your meeting for a future date and time."
          headerIcon={<Calendar className="size-8" />}
          buttonText="Schedule Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-6 pt-2">
            <div className="flex flex-col gap-2.5">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <AlignLeft className="size-4 text-blue-400" />
                Add a description
              </label>
              <Textarea
                className={cn(
                  'w-full min-h-25 resize-none rounded-xl bg-black/20 p-4 text-sm text-white transition-all duration-300 ease-out',
                  'border border-white/10 placeholder:text-zinc-600',
                  'focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:outline-none focus-visible:bg-black/40'
                )}
                placeholder="What is this meeting about?"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <Clock className="size-4 text-blue-400" />
                Select Date and Time
              </label>
              <div className="relative w-full">
                <ReactDatePicker
                  selected={values.dateTime}
                  onChange={(date: Date | null) => setValues({ ...values, dateTime: date! })}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className={cn(
                    'w-full rounded-xl bg-black/20 p-4 text-sm text-white transition-all duration-300 ease-out',
                    'border border-white/10 placeholder:text-zinc-600',
                    'focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:outline-none focus:bg-black/40'
                  )}
                />
              </div>
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          description="Copy the link below and share it with your team."
          headerIcon={<Check className="size-8 text-green-400" />}
          buttonText="Copy Meeting Link"
          secondaryButtonText="Close"
          buttonIcon={<LinkIcon className="size-5" />}
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success('Link Copied successfully');
          }}
        />
      )}

      {/* Join Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Join a Meeting"
        description="Type or paste the meeting link below."
        headerIcon={<LinkIcon className="size-8" />}
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <div className="flex flex-col gap-2.5 pt-2">
          <Input
            placeholder="Paste Meeting link here"
            onChange={(e) => setValues({ ...values, link: e.target.value })}
            className={cn(
              'w-full rounded-xl bg-black/20 p-4 text-sm text-white transition-all duration-300 ease-out',
              'border border-white/10 placeholder:text-zinc-600',
              'focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:outline-none focus-visible:bg-black/40'
            )}
          />
        </div>
      </MeetingModal>

      {/* Instant Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        description="Instantly spin up a room and invite your team to join."
        headerIcon={<Video className="size-8" />}
        buttonText="Start Meeting"
        buttonIcon={<Video className="size-5" />}
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;