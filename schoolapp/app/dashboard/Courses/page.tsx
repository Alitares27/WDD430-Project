'use client';
import React, { useState, useEffect } from 'react';
import Input from '../../ui/Input';
import Button from '@/app/ui/button';
import CourseCard from '@/app/ui/courses/courseCard'; 
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  type Course = { 
    id: string;
    title: string;
    course_code: string;
    description: string;
    credits: number;
    duration: string;
    difficulty_level: string;
    teacher_email: string;
  };

  const [courses, setCourses] = useState<Course[]>([]); 

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
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/Courses/${id}`); 
  };

  const handleEdit = (id: string) => {
    alert(`Edit course with ID: ${id}`);
    router.push(`/dashboard/Courses/${id}/edit`); 
  };

 const handleDelete = async (id: string) => {
  if (window.confirm(`Are you sure you want to delete course?`)) {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setCourses(courses.filter(course => course.id !== id));
        alert(`Course deleted successfully.`);
        router.push('/dashboard/Courses');
      } else {
        let errorMessage = 'Unknown error';
        try {
          const text = await res.text();
          if (text) {
            const errorData = JSON.parse(text);
            errorMessage = errorData.error || errorMessage;
          }
        } catch (error) {
          console.error('Failed to parse error response:', error);
        }
        alert(`Failed to delete course: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete course. Please try again later.');
    }
  }
};

  const handleAddNewCourse = () => {
    router.push('/dashboard/Courses/Create'); 
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="mb-4 flex items-center gap-2">
        <Input
        id='search'
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleAddNewCourse}>Create Course</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map(course => (
          <CourseCard 
            key={course.id}
            course={course}
            onViewDetails={() => handleViewDetails(course.id)}
            onEdit={() => handleEdit(course.id)}
            onDelete={() => handleDelete(course.id)}
          />
        ))}
      </div>
    </div>
  );
}