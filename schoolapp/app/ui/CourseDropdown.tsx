import React, { useEffect, useState } from 'react';

interface Course {
    id: string;
    title: string;
}

interface CourseDropdownProps {
    value?: string;
    onChange?: (courseId: string) => void;
}

const CourseDropdown: React.FC<CourseDropdownProps> = ({ value, onChange }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch('/api/courses');
                if (!res.ok) throw new Error('Failed to fetch courses');
                const data = await res.json();
                setCourses(data);
            } catch (error) {
                console.error(error);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) {
        return <select disabled><option>loading courses...</option></select>;
    }

    return (
        <select
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
        >
            <option value="">Select a course</option>
            {courses.map(course => (
                <option key={course.id} value={course.id}>
                    {course.title}
                </option>
            ))}
        </select>
    );
};

export default CourseDropdown;
