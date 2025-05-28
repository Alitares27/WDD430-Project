'use client';
import React, { useState, useEffect } from 'react';
import Input from '../../ui/Input';
import Button from '@/app/ui/button'; 
import StudentCard from '@/app/ui/students/StudentCard';
import { useRouter } from 'next/navigation'; 

export default function Page() {

  const DUMMY_STUDENTS = [
    { id: 's001', name: 'Juan Pérez', grade: '10mo Grado', email: 'juan.perez@example.com' },
    { id: 's002', name: 'Ana Gómez', grade: '9no Grado', email: 'ana.gomez@example.com' }, 
    { id: 's003', name: 'Carlos Díaz', grade: '10mo Grado', email: 'carlos.diaz@example.com' },
    { id: 's004', name: 'María López', grade: '8vo Grado', email: 'maria.lopez@example.com' },
    { id: 's005', name: 'Pedro Sánchez', grade: '11mo Grado', email: 'pedro.sanchez@example.com' },
    { id: 's006', name: 'Laura Fernández', grade: '9no Grado', email: 'laura.fernandez@example.com' },
    { id: 's007', name: 'Miguel Torres', grade: '12mo Grado', email: 'miguel.torres@example.com' },
    { id: 's008', name: 'Sofía Ramírez', grade: '10mo Grado', email: 'sofia.ramirez@example.com' },
    { id: 's009', name: 'Diego Morales', grade: '11mo Grado', email: 'diego.morales@example.com' },
    { id: 's010', name: 'Valentina Ruiz', grade: '8vo Grado', email: 'valentina.ruiz@example.com' },
    { id: 's011', name: 'Andrés Herrera', grade: '9no Grado', email: 'andres.herrera@example.com' },
    { id: 's012', name: 'Camila Castro', grade: '10mo Grado', email: 'camila.castro@example.com' },
    { id: 's013', name: 'Javier Jiménez', grade: '12mo Grado', email: 'javier.jimenez@example.com' },
    { id: 's014', name: 'Isabella Moreno', grade: '11mo Grado', email: 'isabella.moreno@example.com' },
    { id: 's015', name: 'Sebastián Vargas', grade: '8vo Grado', email: 'sebastian.vargas@example.com' },
    { id: 's016', name: 'Lucía Castillo', grade: '9no Grado', email: 'lucia.castillo@example.com' },
  ];

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState(DUMMY_STUDENTS);

  useEffect(() => {
    
  }, []); 

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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