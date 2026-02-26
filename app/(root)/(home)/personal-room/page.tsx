"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Play, Link2, Hash, MessageSquare } from "lucide-react";

const Table = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-200 hover:bg-white/[0.04]">
      <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
        <Icon size={18} />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">{title}</span>
        <span className="text-sm font-semibold text-white truncate">{description}</span>
      </div>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-8 text-white">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Personal Meeting Room</h1>
        <p className="text-sm font-medium text-zinc-500">Your permanent meeting space — share this link with anyone</p>
      </div>

      <div className="flex w-full flex-col gap-3 xl:max-w-[700px]">
        <Table icon={MessageSquare} title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table icon={Hash} title="Meeting ID" description={meetingId!} />
        <Table icon={Link2} title="Invite Link" description={meetingLink} />
      </div>

      <div className="flex gap-3">
        <Button
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.97] gap-2"
          onClick={startRoom}
        >
          <Play size={16} />
          Start Meeting
        </Button>
        <Button
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-400 transition-all duration-300 hover:bg-white/[0.06] hover:text-white active:scale-[0.97] gap-2"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast("Link Copied");
          }}
        >
          <Copy size={15} />
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;