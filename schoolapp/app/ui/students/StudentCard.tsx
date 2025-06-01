import React from 'react';
import Image from 'next/image';
import Button from '@/app/ui/button';

interface StudentCardProps {
    student: {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        grade: string;
        dateofbirth?: string | null;
        address?: string | null;
        phonenumber?: string | null;
        enrollmentdate?: string | null;
        parentscontact?: string | null;
        notes?: string | null;
        avatarurl?: string;
    };

    onViewDetails?: (studentId: string) => void;
    onEdit?: (studentId: string) => void;
    onDelete?: (studentId: string) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({
    student,
    onViewDetails,
    onEdit,
    onDelete,
}) => {
    const fullName = `${student.firstname} ${student.lastname}`;

    return (
        <div className="
            bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg
        ">
            <div className="
                relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-blue-500">
                {student.avatarurl ? (
                    <Image
                        src={student.avatarurl}
                        alt={`Avatar de ${fullName}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                ) : (
                    <div className="
                        w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 text-5xl font-bold">
                        {(student.firstname ? student.firstname.charAt(0).toUpperCase() : '')}
                    </div>
                )}
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-1">{fullName}</h3>
            <p className="text-cyan-800 text-sm font-medium">{student.grade}</p>
            <p className="text-gray-600 text-sm mt-1 py-2">{student.email}</p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-auto px-3">
                {onViewDetails && (
                    <Button
                        onClick={() => onViewDetails(student.id)}
                        variant="primary"
                        size="sm"
                    >
                        View Details
                    </Button>
                )}
                {onEdit && (
                    <Button
                        onClick={() => onEdit(student.id)}
                        variant="secondary"
                        size="sm"
                    >
                        Edit
                    </Button>
                )}
                {onDelete && (
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(student.id)}
                    >
                        Delete
                    </Button>
                )}
            </div>
        </div>
    );
};

export default StudentCard;