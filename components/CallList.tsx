'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useGetCalls } from '@/hooks/useGetCalls';
import MeetingCard from './MeetingCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, History, Calendar, Video, Play, Inbox } from 'lucide-react';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  const getEmptyDescription = () => {
    switch (type) {
      case 'ended':
        return 'Your completed meetings will appear here';
      case 'upcoming':
        return 'Schedule a meeting to see it here';
      case 'recordings':
        return 'Record a meeting to access it later';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading) return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex min-h-[240px] w-full flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="flex flex-col gap-4">
            <div className="size-11 rounded-xl bg-white/[0.06] animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-5 w-48 rounded-lg bg-white/[0.06] animate-pulse" />
              <div className="h-4 w-32 rounded-lg bg-white/[0.04] animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="size-8 rounded-full bg-white/[0.06] border-2 border-zinc-900 animate-pulse" />
              ))}
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-24 rounded-xl bg-white/[0.06] animate-pulse" />
              <div className="h-9 w-28 rounded-xl bg-white/[0.04] animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === 'ended'
                ? History
                : type === 'upcoming'
                  ? Calendar
                  : Video
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              'No Description'
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            link={
              type === 'recordings'
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
            }
            buttonIcon1={type === 'recordings' ? Play : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center gap-5 rounded-3xl border border-white/[0.06] bg-white/[0.02] py-20 backdrop-blur-sm">
          <div className="flex size-20 items-center justify-center rounded-3xl bg-white/[0.04] border border-white/[0.06] text-zinc-600">
            <Inbox size={32} />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-lg font-bold text-zinc-300">{noCallsMessage}</p>
            <p className="text-sm text-zinc-600">{getEmptyDescription()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallList;