import CallList from '@/components/CallList'
import React from 'react'

const Recordings = () => {
  return (
    <section className='flex size-full flex-col gap-6 text-white'>
      <div className="flex flex-col gap-1.5">
        <h1 className='text-2xl font-bold tracking-tight lg:text-3xl'>
          Recordings
        </h1>
        <p className="text-sm font-medium text-zinc-500">Access your saved meeting recordings</p>
      </div>

      <CallList type="recordings" />
    </section>
  )
}

export default Recordings