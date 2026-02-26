import CallList from '@/components/CallList'
import React from 'react'

const Previous = () => {
  return (
    <section className='flex size-full flex-col gap-6 text-white'>
      <div className="flex flex-col gap-1.5">
        <h1 className='text-2xl font-bold tracking-tight lg:text-3xl'>
          Previous Meetings
        </h1>
        <p className="text-sm font-medium text-zinc-500">Review your past meeting history</p>
      </div>

      <CallList type='ended' />
    </section>
  )
}

export default Previous