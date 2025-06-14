import AcmeLogo from '@/app/ui/school-logo';
import SignupForm from '../ui/signup-form';
import { Suspense } from 'react';

export default function SignupPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full flex-col space-y-2.5">
                <div className="flex h-full w-full items-end rounded-lg bg-cyan-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo />
                    </div>
                </div>
                <Suspense>
                    <SignupForm />
                </Suspense>
            </div>
        </main>
    );
}