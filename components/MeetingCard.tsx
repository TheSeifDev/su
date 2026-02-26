"use client";

import { ElementType } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { toast } from "sonner";
import { Copy, Clock } from "lucide-react";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: ElementType;
  isPreviousMeeting?: boolean;
  buttonIcon1?: ElementType;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon: Icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1: ButtonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {

  return (
    <section className="group flex min-h-[240px] w-full flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:bg-white/[0.04] hover:border-white/10 hover:shadow-2xl hover:shadow-black/20 xl:max-w-[568px]">
      <article className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className={cn(
            "flex size-11 items-center justify-center rounded-xl border transition-all duration-300",
            isPreviousMeeting
              ? "bg-zinc-500/10 border-zinc-500/15 text-zinc-400"
              : "bg-blue-500/10 border-blue-500/15 text-blue-400 group-hover:bg-blue-500/20 group-hover:shadow-lg group-hover:shadow-blue-500/10"
          )}>
            <Icon size={20} />
          </div>
          {isPreviousMeeting && (
            <span className="flex items-center gap-1 rounded-full bg-zinc-500/10 border border-zinc-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Ended
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold text-white line-clamp-1">{title}</h1>
          <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-500">
            <Clock size={13} />
            <span>{date}</span>
          </div>
        </div>
      </article>
      <article className={cn("flex items-center justify-between mt-4", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => {
            const AvatarIcon = img.icon;
            return (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-center rounded-full bg-zinc-800 border-2 border-zinc-900 transition-all duration-200",
                  { absolute: index > 0 },
                  "group-hover:border-zinc-800"
                )}
                style={{ top: 0, left: index * 28, width: 36, height: 36 }}
              >
                <AvatarIcon size={16} className="text-zinc-400" />
              </div>
            );
          })}
          <div className="absolute left-[140px] flex size-9 items-center justify-center rounded-full border-2 border-zinc-900 bg-zinc-800 text-[10px] font-bold text-zinc-400">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2.5 max-sm:w-full max-sm:justify-end">
            <Button
              onClick={handleClick}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.97]"
            >
              {ButtonIcon1 && (
                <ButtonIcon1 size={16} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast("Link Copied");
              }}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-zinc-400 transition-all duration-300 hover:bg-white/[0.08] hover:text-white active:scale-[0.97]"
            >
              <Copy size={14} />
              &nbsp; Copy
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;