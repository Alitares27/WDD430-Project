'use client';

import {
    UserGroupIcon,
    HomeIcon,
    BookOpenIcon,
    PencilSquareIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    {
        name: 'Students',
        href: '/dashboard/Students',
        icon: UserGroupIcon,
    },
    { name: 'Courses', href: '/dashboard/Courses', icon: BookOpenIcon },
    { name: 'Teachers', href: '/dashboard/Teachers', icon: UserIcon },
    { name: 'Enrollments', href: '/dashboard/Enrollments', icon: PencilSquareIcon },
    { name: 'Users', href: '/dashboard/Users', icon: UserIcon },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-cyan-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-50 text-cyan-600': pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
