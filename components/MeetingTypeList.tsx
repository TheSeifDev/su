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
  UserPlus,
  ArrowRight,
  Command
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

const actionCards = [
  {
    key: 'isInstantMeeting' as const,
    title: 'New Meeting',
    subtitle: 'Start an instant meeting',
    bullets: ['HD video & audio', 'Screen sharing', 'Up to 100 participants'],
    icon: Plus,
    shortcut: '⌘ N',
    lastUsed: '2 hours ago',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/15 border-orange-500/20',
    iconGlow: 'group-hover:bg-orange-500/25 group-hover:shadow-orange-500/20',
    hoverText: 'group-hover:text-orange-400',
    gradient: 'from-orange-500/10 via-transparent to-transparent',
  },
  {
    key: 'isJoiningMeeting' as const,
    title: 'Join Meeting',
    subtitle: 'via invitation link',
    bullets: ['Paste any meeting link', 'Auto-detect platform', 'Instant join'],
    icon: UserPlus,
    shortcut: '⌘ J',
    lastUsed: '5 hours ago',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/15 border-blue-500/20',
    iconGlow: 'group-hover:bg-blue-500/25 group-hover:shadow-blue-500/20',
    hoverText: 'group-hover:text-blue-400',
    gradient: 'from-blue-500/10 via-transparent to-transparent',
  },
  {
    key: 'isScheduleMeeting' as const,
    title: 'Schedule',
    subtitle: 'Plan your meeting',
    bullets: ['Pick date & time', 'Add description', 'Share invite link'],
    icon: Calendar,
    shortcut: '⌘ S',
    lastUsed: 'Yesterday',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/15 border-purple-500/20',
    iconGlow: 'group-hover:bg-purple-500/25 group-hover:shadow-purple-500/20',
    hoverText: 'group-hover:text-purple-400',
    gradient: 'from-purple-500/10 via-transparent to-transparent',
  },
  {
    key: 'recordings' as const,
    title: 'Recordings',
    subtitle: 'View your recordings',
    bullets: ['Cloud storage', 'Download & share', 'Auto-transcription'],
    icon: Video,
    shortcut: '⌘ R',
    lastUsed: '3 days ago',
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-500/15 border-yellow-500/20',
    iconGlow: 'group-hover:bg-yellow-500/25 group-hover:shadow-yellow-500/20',
    hoverText: 'group-hover:text-yellow-400',
    gradient: 'from-yellow-500/10 via-transparent to-transparent',
  },
];

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

  if (!client || !user) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="aspect-[4/3] rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
      ))}
    </div>
  );

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  const handleCardClick = (key: string) => {
    if (key === 'recordings') {
      router.push('/recordings');
    } else {
      setMeetingState(key as 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting');
    }
  };

  return (
    <section className="z-10 flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {actionCards.map((card) => (
          <div
            key={card.key}
            onClick={() => handleCardClick(card.key)}
            className={cn(
              'group relative flex flex-col justify-between w-full rounded-2xl p-5 cursor-pointer transition-all duration-300 ease-out overflow-hidden',
              'bg-white/[0.03] border border-white/[0.08] backdrop-blur-md',
              'hover:-translate-y-1.5 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/30 hover:border-white/15',
              'aspect-[3/2] xl:aspect-[16/13]'
            )}
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            {/* Content */}
            <div className="relative flex flex-col gap-3">
              {/* Icon + Shortcut */}
              <div className="flex items-start justify-between">
                <div className={`flex items-center justify-center size-12 rounded-2xl border ${card.iconBg} ${card.iconColor} transition-all duration-300 ease-out shadow-lg ${card.iconGlow} group-hover:shadow-xl group-hover:scale-105`}>
                  <card.icon className="size-5" />
                </div>
                <span className="flex items-center gap-1 rounded-lg bg-white/5 border border-white/[0.06] px-2 py-1 text-[10px] font-bold text-zinc-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <Command size={10} /> {card.shortcut.split(' ')[1]}
                </span>
              </div>
            </div>

            {/* Bottom content */}
            <div className="relative flex flex-col gap-2">
              {/* Bullet features (visible on hover in xl, always on smaller) */}
              <div className="flex flex-col gap-0.5 xl:opacity-0 xl:group-hover:opacity-100 xl:max-h-0 xl:group-hover:max-h-20 transition-all duration-300 overflow-hidden">
                {card.bullets.map((bullet, i) => (
                  <span key={i} className="text-[10px] font-medium text-zinc-600 flex items-center gap-1.5">
                    <span className="size-1 rounded-full bg-zinc-700" />
                    {bullet}
                  </span>
                ))}
              </div>

              {/* Title + subtitle + arrow */}
              <div className="flex items-end justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <h3 className={`text-base font-bold text-white transition-colors duration-300 ${card.hoverText} lg:text-lg`}>
                    {card.title}
                  </h3>
                  <p className="text-[11px] font-medium text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                    {card.subtitle}
                  </p>
                </div>
                <div className={`flex size-8 items-center justify-center rounded-full bg-white/5 border border-white/[0.06] ${card.iconColor} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0`}>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Last used */}
              <span className="text-[10px] font-medium text-zinc-700">
                Last used {card.lastUsed}
              </span>
            </div>
          </div>
        ))}
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
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex flex-col gap-2.5">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <AlignLeft className="size-4 text-blue-400" />
                Add a description
              </label>
              <Textarea
                className={cn(
                  'w-full min-h-[100px] resize-none rounded-xl bg-white/[0.03] p-4 text-sm text-white transition-all duration-200 ease-out',
                  'border border-white/10 placeholder:text-zinc-600',
                  'focus-visible:border-blue-500/60 focus-visible:ring-1 focus-visible:ring-blue-500/40 focus-visible:outline-none focus-visible:bg-white/[0.05]'
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
                    'w-full rounded-xl bg-white/[0.03] p-4 text-sm text-white transition-all duration-200 ease-out',
                    'border border-white/10 placeholder:text-zinc-600',
                    'focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 focus:outline-none focus:bg-white/[0.05]'
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
              'w-full rounded-xl bg-white/[0.03] p-4 text-sm text-white transition-all duration-200 ease-out',
              'border border-white/10 placeholder:text-zinc-600',
              'focus-visible:border-blue-500/60 focus-visible:ring-1 focus-visible:ring-blue-500/40 focus-visible:outline-none focus-visible:bg-white/[0.05]'
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