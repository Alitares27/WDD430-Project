import React, { useEffect, useState } from 'react';

interface User {
    user_id: string;
    first_name: string;
    last_name: string;
}

interface StudentDropdownProps {
    value?: string;
    onChange?: (studentId: string) => void;
}

const StudentDropdown: React.FC<StudentDropdownProps> = ({ value, onChange }) => {
    const [user, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await fetch('/api/users');
                if (!res.ok) throw new Error('Failed to fetch students');
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    if (loading) {
        return <select disabled><option>loading students...</option></select>;
    }

    return (
        <select
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
        >
            <option value="">Select a student</option>
            {user.map(user => (
                <option key={user.user_id} value={user.user_id}>
                    {user.first_name} {user.last_name}
                </option>
            ))}
        </select>
    );
};

export default StudentDropdown;
