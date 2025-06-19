'use client';

import React, { useState, useEffect } from 'react';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';
import TeacherCard from '@/app/ui/teachers/TeacherCard';
import { useRouter } from 'next/navigation';
import { Teacher } from '@/app/lib/definitions';
import { getSession } from 'next-auth/react';

export default function TeachersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndTeachers = async () => {
      setLoading(true);

      const session = await getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      console.log('Session:', session);

      setUserRole(session.user?.role ?? null);
      setUserId(session.user?.id ? session.user.id.toString() : null);
      setUserEmail(session.user?.email ?? null);

      try {
        const res = await fetch('/api/teachers');
        if (!res.ok) throw new Error('Failed to fetch teachers');
        const data = await res.json();

        console.log('Teachers fetched:', data);

        if (session.user?.role === 'teacher') {
          const ownTeacherById = data.find((t: Teacher) => t.id.toString() === session.user.id.toString());
          const ownTeacherByEmail = data.find((t: Teacher) => t.email.toLowerCase() === session.user.email?.toLowerCase());

          const ownTeacher = ownTeacherById || ownTeacherByEmail;

          console.log('Own teacher by id:', ownTeacherById);
          console.log('Own teacher by email:', ownTeacherByEmail);

          setTeachers(ownTeacher ? [ownTeacher] : []);
        } else {
          setTeachers(data);
        }
      } catch (error) {
        console.error(error);
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTeachers();
  }, [router]);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/Teachers/${id}`);
  };

  const handleEdit = (id: string) => {
    if (userRole === 'admin' || (userRole === 'teacher' && id.toString() === userId)) {
      router.push(`/dashboard/Teachers/${id}/edit`);
    }
  };

  const handleDelete = async (id: string) => {
    if (userRole !== 'admin') return;
    if (window.confirm(`Are you sure you want to delete the teacher?`)) {
      try {
        await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
        setTeachers(prev => prev.filter(teacher => teacher.id !== id));
      } catch {
        alert('Failed to delete teacher.');
      }
    }
  };

  const handleAddNewTeacher = () => {
    if (userRole === 'admin') {
      router.push('/dashboard/Teachers/Create');
    }
  };

  if (loading) {
    return <p className="text-center p-4">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher Management</h1>

      {userRole === 'admin' && (
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <Input
            id="search-teachers"
            type="text"
            placeholder="Search by name, subject, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:max-w-xs"
          />
          <Button onClick={handleAddNewTeacher} className="w-full md:w-auto">
            Add Teacher
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map(teacher => (
            <TeacherCard
              key={teacher.id}
              teacher={{
                ...teacher,
                firstName: teacher.firstname,
                lastName: teacher.lastname,
                phoneNumber: teacher.phonenumber,
                hireDate: teacher.hiredate,
                avatarUrl: teacher.avatarurl,
              }}
              onViewDetails={() => handleViewDetails(teacher.id)}
              onEdit={
                (userRole === 'admin' || (userRole === 'teacher' && teacher.id.toString() === userId))
                  ? () => handleEdit(teacher.id)
                  : undefined
              }
              onDelete={userRole === 'admin' ? () => handleDelete(teacher.id) : undefined}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 mt-8">
            No teachers found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
