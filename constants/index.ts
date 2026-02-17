import { Home, Calendar, Clock, Video, User } from 'lucide-react';

export const sidebarLinks = [
  {
    label: 'Home',
    route: '/',
    icon: Home,
  },
  {
    label: 'Upcoming',
    route: '/upcoming',
    icon: Calendar,
  },
  {
    label: 'Previous',
    route: '/previous',
    icon: Clock,
  },
  {
    label: 'Recordings',
    route: '/recordings',
    icon: Video,
  },
  {
    label: 'Personal Room',
    route: '/personal-room',
    icon: User,
  },
];