import MeetingTypeList from '@/components/MeetingLayout/MeetingTypeList';
import React from 'react'

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <section className='flex size-full flex-col gap-4'>
      <div className='w-full h-56 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-2xl relative overflow-hidden'>
        <div className='flex h-full flex-col justify-between gap-8 max-md:px-5 max-md:py-6 p-6 lg:p-8'>
          <h2 className='max-w-67.5 w-max rounded bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md transition-all'>
            Upcoming Meeting at: 12:30 PM
          </h2>

          <div className='flex flex-col gap-1'>
            <h1 className='text-3xl font-extrabold tracking-tight lg:text-5xl'>
              {time}
            </h1>
            <p className='text-base font-medium text-zinc-400 lg:text-xl'>
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}

export default Home