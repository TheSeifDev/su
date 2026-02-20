import { Calendar, Plus, Users, Video } from "lucide-react";

export const meetingCards = [
  {
    title: 'New Meeting',
    description: 'Start an instant meeting',
    icon: Plus,
    meetingState: 'isInstantMeeting',
    colorGroup: 'hover:bg-blue-500/10 hover:border-blue-500/20 hover:shadow-blue-500/10',
    iconHover: 'group-hover:bg-blue-600 group-hover:shadow-blue-500/20 group-hover:text-white group-hover:border-blue-500',
  },
  {
    title: 'Join Meeting',
    description: 'Via invitation link',
    icon: Users,
    meetingState: 'isJoiningMeeting',
    colorGroup: 'hover:bg-blue-500/10 hover:border-blue-500/20 hover:shadow-blue-500/10',
    iconHover: 'group-hover:bg-blue-600 group-hover:shadow-blue-500/20 group-hover:text-white group-hover:border-blue-500',
  },
  {
    title: 'Schedule',
    description: 'Plan your meeting',
    icon: Calendar,
    meetingState: 'isScheduleMeeting',
    colorGroup: 'hover:bg-blue-500/10 hover:border-blue-500/20 hover:shadow-blue-500/10',
    iconHover: 'group-hover:bg-blue-600 group-hover:shadow-blue-500/20 group-hover:text-white group-hover:border-blue-500',
  },
  {
    title: 'Recordings',
    description: 'View your recordings',
    icon: Video,
    meetingState: 'isViewRecordings',
    colorGroup: 'hover:bg-blue-500/10 hover:border-blue-500/20 hover:shadow-blue-500/10',
    iconHover: 'group-hover:bg-blue-600 group-hover:shadow-blue-500/20 group-hover:text-white group-hover:border-blue-500',
  }
]