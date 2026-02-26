import Link from 'next/link';
import Image from 'next/image';

import { Button } from './ui/button';

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className="flex h-screen w-full items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 py-10 text-white backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4">
            {iconUrl && (
              <div className="flex items-center justify-center">
                <Image src={iconUrl} width={72} height={72} alt="icon" />
              </div>
            )}
            <p className="text-center text-xl font-semibold text-white">{title}</p>
          </div>

          <Button
            asChild
            className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Alert;