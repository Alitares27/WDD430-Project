import React from 'react';
import Image from 'next/image';
import Button from '@/app/ui/button';

interface StudentCardProps {
    student: {
        id: string;
        name: string;
        grade: string;
        email: string;
        avatarUrl?: string;
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
    return (

        <div className="
      bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg
    ">
            { }
            <div className="
        relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-blue-500">
                {student.avatarUrl ? (

                    <Image
                        src={student.avatarUrl}
                        alt={`Avatar de ${student.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                ) : (

                    <div className="
            w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 text-5xl font-bold">
                        {student.name.charAt(0).toUpperCase()} { }
                    </div>
                )}
            </div>

            { }
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{student.name}</h3>
            <p className="text-cyan-800 text-sm font-medium">{student.grade}</p>
            <p className="text-gray-500 text-sm mb-4">{student.email}</p>

            { }
            <div className="flex flex-wrap justify-center gap-2 mt-auto">
                { }
                {onViewDetails && (
                    <Button
                        onClick={() => onViewDetails(student.id)} 
                        variant="primary"
                        size="sm"
                    >
                        View Details
                    </Button>
                )}
                { }
                {onEdit && (
                    <Button
                        onClick={() => onEdit(student.id)}
                        variant="secondary"
                        size="sm"
                    >
                        Edit
                    </Button>
                )}
                { }
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