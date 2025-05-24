import { AcademicCapIcon  } from '@heroicons/react/24/outline';
import { roboto } from '@/app/ui/fonts';

export default function schoolLogo() {
  return (
    <div
      className={`${roboto.className} flex flex-row items-center leading-none text-white`}
    >
      <AcademicCapIcon  className="h-10 w-10 rotate-[15deg]" />
      <p className="text-[40px]">ShoolApp</p>
    </div>
  );
}
