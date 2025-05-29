'use client';
import React, { useState, useEffect } from 'react';
import Input from '../../ui/Input';
import Button from '@/app/ui/button'; 
import StudentCard from '@/app/ui/students/StudentCard';
import { useRouter } from 'next/navigation'; 

export default function Page() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  type Student = {
   id: string;
    firstName: string;
    lastName: string;
    email: string;
    grade: string;
    dateofbirth?: string | null;
    address?: string | null;
    phonenumber?: string | null;
    enrollmentdate?: string | null;
    parentscontact?: string | null;
    notes?: string | null;
    avatarurll?: string | null;
  };

  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/students');
        if (!res.ok) throw new Error('Failed to fetch students');
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error(error);
        setStudents([]);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/Students/${id}`);
  };

  const handleEdit = (id: string) => {
    alert(`Edit student with ID: ${id}`);
    router.push(`/dashboard/Students/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(`Are you sure you want to delete the student with ID: ${id}? This action is irreversible.`)) {
      setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
      alert(`Student with ID: ${id} deleted.`);
    }
  };

  const handleAddNewStudent = () => {
    router.push('/dashboard/Students/Create');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Management</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Input
          id="search-students"
          type="text"
          placeholder="Search by name, grade or email..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="w-full md:max-w-xs" 
        />
        <Button onClick={handleAddNewStudent} className="w-full md:w-auto">
          Add Student
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => (
            <StudentCard
              key={student.id} 
              student={student}
              onViewDetails={handleViewDetails} 
              onEdit={handleEdit}              
              onDelete={handleDelete}          
            />
          ))
        ) : (
            <p className="col-span-full text-center text-black-600 mt-8">
            No students matching your search were found.
            </p>
        )}
      </div>
    </div>
  );
}