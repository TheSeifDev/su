import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className='flex size-full flex-col gap-6 text-white'>
      <div className="flex flex-col gap-1.5">
        <h1 className='text-2xl font-bold tracking-tight lg:text-3xl'>
          Upcoming Meetings
        </h1>
        <p className="text-sm font-medium text-zinc-500">Scheduled meetings that haven&apos;t started yet</p>
      </div>

      <CallList type='upcoming' />
    </section>
  )
}

export default Upcoming