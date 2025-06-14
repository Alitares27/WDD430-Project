import React, { useEffect, useState } from 'react';

interface Teacher {
    id: string;
    firstname: string;
    lastname: string;
}

interface TeacherDropdownProps {
    value?: string;
    onChange?: (teacherId: string) => void;
}

const TeacherDropdown: React.FC<TeacherDropdownProps> = ({ value, onChange }) => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await fetch('/api/teachers');
                if (!res.ok) throw new Error('Failed to fetch teachers');
                const data = await res.json();
                setTeachers(data);
            } catch (error) {
                console.error(error);
                setTeachers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, []);

    if (loading) {
        return <select disabled><option>loading teachers...</option></select>;
    }

    return (
        <select
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
        >
            <option value="">Select a teacher</option>
            {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                    {teacher.firstname} {teacher.lastname}
                </option>
            ))}
        </select>
    );
};

export default TeacherDropdown;
