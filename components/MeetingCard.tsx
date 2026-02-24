'use client';
// import Image from 'next/image'
import React from 'react'

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { toast } from "sonner"

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}


const MeetingCard = () => {
  return (
    <section className='flex min-h-64.5 w-full flex-col justify-between rounded-xl px-5 py-8 xl:max-w-142'>
      <article className='flex flex-col gap-5'>
        {/* <Image src={} /> */}
        <div className='flex justify-between'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'></h1>
            <p className='text-base font-normal'></p>
          </div>
        </div>
      </article>
    </section>
  )
}

export default MeetingCard