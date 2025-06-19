import React from 'react';
import Image from 'next/image';
import Button from '@/app/ui/button';
import {
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  UserGroupIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import type { Student } from '@/app/lib/definitions';

interface StudentCardProps {
  student: Student;
  onViewDetails?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const fullName = `${student.firstname} ${student.lastname}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-cyan-500">
        {student.avatarurl ? (
          <Image
            src={student.avatarurl}
            alt={`Avatar de ${fullName}`}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-full"
          />
        ) : (
          <div className="w-full h-full bg-cyan-100 flex items-center justify-center text-cyan-600 text-5xl font-bold">
            {student.firstname ? student.firstname.charAt(0).toUpperCase() : ''}
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-1">{fullName}</h3>
      <p className="text-cyan-800 text-sm font-medium flex items-center gap-1">
        <AcademicCapIcon className="w-4 h-4" />
        {student.grade}
      </p>
      <p className="text-gray-600 text-sm mt-1 py-2 flex items-center gap-1">
        <EnvelopeIcon className="w-4 h-4" />
        {student.email}
      </p>

      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
        <CalendarIcon className="w-4 h-4" />
        <strong>DOB:</strong> {student.dateofbirth ? new Date(student.dateofbirth).toLocaleDateString() : 'N/A'}
      </p>

      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
        <MapPinIcon className="w-4 h-4" />
        <strong>Address:</strong> {student.address || 'N/A'}
      </p>

      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
        <PhoneIcon className="w-4 h-4" />
        <strong>Phone:</strong> {student.phonenumber || 'N/A'}
      </p>

      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
        <CalendarIcon className="w-4 h-4" />
        <strong>Enrolled:</strong> {student.enrollmentdate ? new Date(student.enrollmentdate).toLocaleDateString() : 'N/A'}
      </p>

      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
        <UserGroupIcon className="w-4 h-4" />
        <strong>Parent Contact:</strong> {student.parentscontact || 'N/A'}
      </p>

      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
        <PencilSquareIcon className="w-4 h-4" />
        <strong>Notes:</strong> {student.notes || 'N/A'}
      </p>

      <div className="flex flex-wrap justify-center gap-2 mt-auto px-3">
        {onViewDetails && (
          <Button onClick={onViewDetails} variant="primary" size="sm">
            View Details
          </Button>
        )}
        {onEdit && (
          <Button onClick={onEdit} variant="secondary" size="sm">
            Edit
          </Button>
        )}
        {onDelete && (
          <Button onClick={onDelete} variant="danger" size="sm">
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
