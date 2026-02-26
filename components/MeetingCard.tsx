"use client";

import { ElementType } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { toast } from "sonner";
import { Copy } from "lucide-react"; // Added Lucide Copy icon

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
    <section className="flex min-h-64.5 w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-142">
      <article className="flex flex-col gap-5">
        <Icon size={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => {
            // Extract the icon component from the object
            const AvatarIcon = img.icon; 
            return (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-center rounded-full bg-dark-3 border-2 border-dark-1",
                  { absolute: index > 0 }
                )}
                style={{ top: 0, left: index * 28, width: 40, height: 40 }}
              >
                <AvatarIcon size={24} />
              </div>
            );
          })}
          <div className="flex-center absolute left-34 size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {ButtonIcon1 && (
                <ButtonIcon1 size={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast("Link Copied");
              }}
              className="bg-dark-4 px-6"
            >
              <Copy size={20} />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;