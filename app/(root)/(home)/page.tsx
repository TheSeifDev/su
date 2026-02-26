'use client'

import { useState, useEffect } from 'react';
import MeetingTypeList from '@/components/MeetingTypeList';
import {
  Video,
  Calendar,
  Clock,
  Users,
  Zap,
  TrendingUp,
  BarChart3,
  ChevronRight,
  Circle,
  User
} from 'lucide-react';

const Home = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

  // Greeting based on time
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  // Mini stats data (UI only)
  const stats = [
    { label: 'Total Meetings', value: '24', icon: Video, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Upcoming Today', value: '3', icon: Calendar, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Recordings', value: '12', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Active Now', value: '1', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  // Recent meetings (UI only)
  const recentMeetings = [
    { title: 'Team Standup', time: '09:00 AM', duration: '15 min', status: 'completed', participants: 4 },
    { title: 'Product Review', time: '11:30 AM', duration: '45 min', status: 'completed', participants: 8 },
    { title: 'Client Onboarding', time: '02:00 PM', duration: '30 min', status: 'live', participants: 3 },
    { title: 'Sprint Planning', time: '04:00 PM', duration: '1 hr', status: 'scheduled', participants: 6 },
  ];

  // Timeline events (UI only)
  const timeline = [
    { time: '09:00', title: 'Morning Standup', passed: true },
    { time: '11:00', title: 'Design Review', passed: true },
    { time: '14:00', title: 'Client Call', passed: false, current: true },
    { time: '16:00', title: 'Sprint Planning', passed: false },
    { time: '17:30', title: 'Team Retro', passed: false },
  ];

  return (
    <section className='flex size-full flex-col gap-6'>
      {/* ==================== HERO SECTION ==================== */}
      <div className='relative w-full rounded-3xl border border-white/[0.08] overflow-hidden'>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-500/10 to-purple-600/15" />
        <div className="absolute -top-32 -right-32 size-80 rounded-full bg-blue-500/15 blur-[100px] animate-pulse" />
        <div className="absolute -bottom-20 -left-20 size-60 rounded-full bg-indigo-500/15 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 rounded-full bg-purple-500/10 blur-[60px] animate-pulse" style={{ animationDelay: '2s' }} />

        <div className='relative flex flex-col gap-6 p-6 lg:p-6 backdrop-blur-sm'>
          {/* Top row: Greeting + Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-blue-300/80">{greeting}</p>
              <h1 className='text-4xl font-extrabold tracking-tight text-white lg:text-5xl xl:text-6xl'>
                {time}
                <span className="text-lg font-semibold text-zinc-500 ml-1 lg:text-xl">{seconds}</span>
              </h1>
              <p className='text-sm font-medium text-zinc-400 lg:text-base mt-0.5'>
                {date}
              </p>
            </div>
            <div className='flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-2.5 backdrop-blur-xl w-max'>
              <div className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              <span className="text-sm font-medium text-zinc-300">Next: Team Standup at 3:00 PM</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="group flex items-center gap-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3.5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.07] hover:border-white/10 cursor-default">
                <div className={`flex size-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color} transition-all duration-300`}>
                  <stat.icon size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                  <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== ACTION CARDS ==================== */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Quick Actions</h2>
          <span className="text-xs font-medium text-zinc-600">Press shortcuts to quick launch</span>
        </div>
        <MeetingTypeList />
      </div>

      {/* ==================== BOTTOM GRID: Recent + Timeline + Analytics ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Recent Meetings --- */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Meetings</h2>
            <button className="flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200">
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {recentMeetings.map((meeting, i) => (
              <div key={i} className="group flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/10">
                <div className="flex items-center gap-4">
                  <div className={`flex size-10 items-center justify-center rounded-xl ${meeting.status === 'live' ? 'bg-emerald-500/15 text-emerald-400' :
                    meeting.status === 'completed' ? 'bg-zinc-500/15 text-zinc-400' :
                      'bg-blue-500/15 text-blue-400'
                    }`}>
                    <Video size={18} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-white">{meeting.title}</span>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span>{meeting.time}</span>
                      <span className="text-zinc-700">•</span>
                      <span>{meeting.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {/* Avatar stack */}
                  <div className="hidden sm:flex -space-x-2">
                    {Array.from({ length: Math.min(meeting.participants, 3) }).map((_, j) => (
                      <div key={j} className="flex size-7 items-center justify-center rounded-full border-2 border-zinc-900 bg-zinc-800 text-zinc-400">
                        <User size={12} />
                      </div>
                    ))}
                    {meeting.participants > 3 && (
                      <div className="flex size-7 items-center justify-center rounded-full border-2 border-zinc-900 bg-zinc-800 text-[10px] font-bold text-zinc-400">
                        +{meeting.participants - 3}
                      </div>
                    )}
                  </div>
                  {/* Status badge */}
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${meeting.status === 'live' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' :
                    meeting.status === 'completed' ? 'bg-zinc-500/10 text-zinc-500 border border-zinc-500/10' :
                      'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                    }`}>
                    {meeting.status === 'live' && <Circle size={6} className="fill-emerald-400 animate-pulse" />}
                    {meeting.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Right Column: Timeline + Analytics --- */}
        <div className="flex flex-col gap-6">
          {/* Upcoming Schedule */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white">Today&apos;s Schedule</h2>
            <div className="flex flex-col gap-0 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
              {timeline.map((event, i) => (
                <div key={i} className="flex gap-4 group">
                  {/* Timeline bar */}
                  <div className="flex flex-col items-center">
                    <div className={`size-3 rounded-full border-2 transition-all duration-300 ${event.current
                      ? 'border-blue-400 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]'
                      : event.passed
                        ? 'border-zinc-600 bg-zinc-600'
                        : 'border-zinc-700 bg-transparent'
                      }`} />
                    {i < timeline.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[40px] ${event.passed ? 'bg-zinc-700' : 'bg-zinc-800'
                        }`} />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`flex flex-col gap-0.5 pb-5 ${event.current ? '' : ''}`}>
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${event.current ? 'text-blue-400' : event.passed ? 'text-zinc-600' : 'text-zinc-500'
                      }`}>{event.time}</span>
                    <span className={`text-sm font-medium ${event.current ? 'text-white' : event.passed ? 'text-zinc-600 line-through' : 'text-zinc-300'
                      }`}>{event.title}</span>
                    {event.current && (
                      <span className="mt-1 inline-flex w-max items-center gap-1 rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-400">
                        <Circle size={5} className="fill-blue-400 animate-pulse" /> Now
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Analytics */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white">Analytics</h2>
            <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
              {/* Hours */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Clock size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-zinc-500">Hours this week</span>
                    <span className="text-lg font-bold text-white">12.5h</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <TrendingUp size={14} /> +18%
                </div>
              </div>
              <div className="h-px bg-white/5" />
              {/* Weekly bars (static UI) */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-zinc-500">Weekly Activity</span>
                <div className="flex items-end gap-1.5 h-16">
                  {[40, 65, 55, 80, 45, 90, 30].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <div
                        className={`w-full rounded-t-md transition-all duration-500 ${i === 5 ? 'bg-blue-500' : 'bg-white/10 hover:bg-white/20'
                          }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-zinc-600 font-medium">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <span key={day} className="flex-1 text-center">{day}</span>
                  ))}
                </div>
              </div>
              <div className="h-px bg-white/5" />
              {/* Productivity score */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                    <BarChart3 size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-zinc-500">Productivity</span>
                    <span className="text-lg font-bold text-white">87%</span>
                  </div>
                </div>
                <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-[10px] font-bold uppercase text-amber-400">
                  Great
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home