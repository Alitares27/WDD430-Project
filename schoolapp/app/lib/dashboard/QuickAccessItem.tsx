
import React from 'react';
import Link from 'next/link'; 

interface QuickAccessItemProps {
  icon: React.ElementType; 
  label: string;
  href: string; 
}

const QuickAccessItem: React.FC<QuickAccessItemProps> = ({ icon: Icon, label, href }) => {
  return (
    <Link href={href} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 w-32 h-32 justify-center text-center">
      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
        <Icon className="h-8 w-8 text-cyan-700" />
      </div>
      <p className="text-sm font-bold text-black-700">{label}</p>
    </Link>
  );
};

export default QuickAccessItem;