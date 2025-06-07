import React from 'react';
import Button from '@/app/ui/button'; 


interface CourseCardProps {
    course: {
        id: string;
        title: string;
        course_code: string;
        description: string; 
        credits: number;     
        duration: string;   
        difficulty_level: string;      
    };

    onViewDetails?: (courseId: string) => void;
    onEdit?: (courseId: string) => void;
    onDelete?: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
    course,
    onViewDetails,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="
            bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg
        "> 
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{course.title}</h3>
            <p className="text-cyan-800 text-sm font-medium mb-2">{course.course_code}</p>

            <div className="flex flex-wrap justify-center gap-2 mt-auto px-3">
                {onViewDetails && (
                    <Button
                        onClick={() => onViewDetails(course.id)}
                        variant="primary"
                        size="sm"
                    >
                        View Details
                    </Button>
                )}
                {onEdit && (
                    <Button
                        onClick={() => onEdit(course.id)}
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
                        onClick={() => onDelete(course.id)}
                    >
                        Delete
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CourseCard;