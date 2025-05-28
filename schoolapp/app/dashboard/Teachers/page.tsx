'use client'; 

import React, { useState, useEffect } from 'react';
import Input from '@/app/ui/Input'; 
import Button from '@/app/ui/button'; 
import TeacherCard from '@/app/ui/teachers/TeacherCard'; 
import { useRouter } from 'next/navigation'; 


interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  avatarUrl?: string;
}

const DUMMY_TEACHERS: Teacher[] = [
  { id: 't001', firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', subject: 'Mathematics', avatarUrl: 'https://via.placeholder.com/150/007BFF/FFFFFF?text=AS' },
  { id: 't002', firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', subject: 'Physics' }, // Sin avatar
  { id: 't003', firstName: 'Carol', lastName: 'Williams', email: 'carol.w@example.com', subject: 'Literature', avatarUrl: 'https://via.placeholder.com/150/FFC107/000000?text=CW' },
  { id: 't004', firstName: 'David', lastName: 'Brown', email: 'david.b@example.com', subject: 'Chemistry', avatarUrl: 'https://via.placeholder.com/150/28A745/FFFFFF?text=DB' },
  { id: 't005', firstName: 'Eve', lastName: 'Miller', email: 'eve.m@example.com', subject: 'History', avatarUrl: 'https://via.placeholder.com/150/DC3545/FFFFFF?text=EM' },
];

export default function TeachersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>(DUMMY_TEACHERS);

  
  useEffect(() => {

  }, []);

  
  const filteredTeachers = teachers.filter(teacher =>
    teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/Teachers/${id}`);
    console.log(`Navigating to teacher details with ID: ${id}`);
  };

  const handleEdit = (id: string) => {
    alert(`Logic to edit teacher with ID: ${id}`);
    router.push(`/dashboard/Teachers/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(`Are you sure you want to delete the teacher with ID: ${id}? This action is irreversible.`)) {
      setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.id !== id));
      alert(`Teacher with ID: ${id} deleted.`);
    }
  };

  const handleAddNewTeacher = () => {
    router.push('/dashboard/Teachers/Create');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher Management</h1>

      {}
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

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map(teacher => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onDelete={handleDelete}
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