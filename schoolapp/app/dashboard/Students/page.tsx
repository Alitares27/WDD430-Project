'use client';

import React, { useState, useEffect } from 'react';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/button';
import StudentCard from '@/app/ui/students/StudentCard';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type { Student } from '@/app/lib/definitions';

export default function StudentsPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!session) return;

      try {
        let url = '/api/students';

        if (session.user.role === 'teacher') {
          url += `?teacherId=${session.user.id}`;
        } else if (session.user.role === 'student') {
          url += `?studentEmail=${encodeURIComponent(session.user.email)}`;
        }

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setStudents(Array.isArray(data) ? data : [data]);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error('Error loading students', error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [session]);

  if (loading) return <p>Loading students...</p>;
  if (!session) return <p>You must be logged in to view this page.</p>;

  const filteredStudents = students.filter(student =>
    `${student.firstname} ${student.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (id: string) => router.push(`/dashboard/Students/${id}`);
  const handleEdit = (id: string) => router.push(`/dashboard/Students/${id}/edit`);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStudents(prev => prev.filter(s => s.id !== id));
        alert('Student deleted');
      } else {
        const data = await res.json();
        alert(`Error: ${data.error}`);
      }
    } catch {
      alert('Unexpected error occurred');
    }
  };

  const handleAddNewStudent = () => router.push('/dashboard/Students/Create');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Student Management</h1>

      {(session.user.role === 'admin' || session.user.role === 'teacher') && (
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <Input
            id="search-students"
            type="text"
            placeholder="Search by name, grade or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full md:max-w-xs"
          />
          {session.user.role === 'admin' && (
            <Button onClick={handleAddNewStudent} className="w-full md:w-auto">
              Add Student
            </Button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onViewDetails={() => handleViewDetails(student.id)}
              onEdit={() => handleEdit(student.id)}
              onDelete={() => handleDelete(student.id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 mt-8">
            No students matching your search were found.
          </p>
        )}
      </div>
    </div>
  );
}
