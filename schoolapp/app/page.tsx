import AcmeLogo from '@/app/ui/school-logo';
import Link from 'next/link';
import Image from 'next/image';
import { roboto } from './ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-cyan-600 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-5 md:w-2/5">
          <p className={`${roboto.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>SchoolApp</strong>
            <br />
            It is a pleasure to welcome you to our institutional application.{' '}
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="flex items-center rounded-lg bg-cyan-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-cyan-400 md:text-base"
            >
              <span>Log in</span>
            </Link>

            <Link
              href="/signup"
              className="flex items-center rounded-lg bg-cyan-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-cyan-400 md:text-base"
            >
              <span>Sign Up</span>
            </Link>
          </div>


        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.webp"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.webp"
            width={460}
            height={520}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
