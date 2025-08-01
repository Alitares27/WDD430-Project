
import React from 'react';
import QuickAccessItem from './QuickAccessItem';
import { UserPlusIcon, UserGroupIcon, PencilSquareIcon , BookmarkSquareIcon  } from '@heroicons/react/24/outline';


const QuickAccessSection: React.FC = () => {
  const accessItems = [
    { icon: UserPlusIcon, label: 'Add Student', href: '/dashboard/Students/Create' },
    { icon: UserGroupIcon, label: 'Add Teacher', href: '/dashboard/Teachers/Create' },
    { icon: PencilSquareIcon , label: 'Enrollments', href: '/dashboard/Enrollments' },
    { icon: BookmarkSquareIcon, label: 'Courses', href: '/dashboard/Courses/' },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-cyan-900 mb-6">Quick Access</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {accessItems.map((item, index) => (
          <QuickAccessItem key={index} icon={item.icon} label={item.label} href={item.href} />
        ))}
      </div>
    </section>
  );
};

export default QuickAccessSection;