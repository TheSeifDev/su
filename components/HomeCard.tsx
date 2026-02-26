'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <section
      className={cn(
        'group relative flex w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-md transition-all duration-300 ease-out xl:max-w-[270px] min-h-[260px]',
        'hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:shadow-black/20',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-white/10 border border-white/10 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-105">
        <Image src={img} alt="meeting" width={27} height={27} />
      </div>
      
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-white transition-colors duration-300">{title}</h1>
        <p className="text-sm font-medium text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">{description}</p>
      </div>
    </section>
  );
};

export default HomeCard;