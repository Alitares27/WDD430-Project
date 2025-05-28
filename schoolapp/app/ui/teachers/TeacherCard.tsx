import React from 'react';
import Image from 'next/image'; 
import Button from '@/app/ui/button'; 

interface TeacherCardProps {
  teacher: {
    id: string;        
    firstName: string; 
    lastName: string;  
    email: string;     
    subject: string;   
    avatarUrl?: string; 
  };
  
  onViewDetails?: (teacherId: string) => void;
  onEdit?: (teacherId: string) => void;
  onDelete?: (teacherId: string) => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="
      bg-white
      rounded-lg
      shadow-md
      p-6
      flex flex-col
      items-center
      text-center
      transition-transform
      transform
      hover:scale-105
      hover:shadow-lg
    ">
      {}
      <div className="
        relative
        w-24 h-24
        mb-4
        rounded-full
        overflow-hidden
        border-2 border-cyan-500 
      ">
        {teacher.avatarUrl ? (
          <Image
            src={teacher.avatarUrl}
            alt={`Avatar of ${teacher.firstName} ${teacher.lastName}`}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        ) : (
          <div className="
            w-full h-full
            bg-cyan-100
            flex items-center justify-center
            text-cyan-600
            text-5xl
            font-bold
          ">
            {teacher.firstName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {}
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{teacher.firstName} {teacher.lastName}</h3>
      <p className="text-cyan-500 text-sm font-semibold mb-1">{teacher.subject}</p>
      <p className="text-gray-500 text-sm mb-4">{teacher.email}</p>

      {}
      <div className="
        flex flex-wrap
        justify-center
        gap-2
        mt-auto
      ">
        {onViewDetails && (
          <Button
            onClick={() => onViewDetails(teacher.id)}
            variant="primary"
            size="sm"
          >
            View Details
          </Button>
        )}
        {onEdit && (
          <Button
            onClick={() => onEdit(teacher.id)}
            variant="secondary"
            size="sm"
          >
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            onClick={() => onDelete(teacher.id)}
            variant="danger"
            size="sm"
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;