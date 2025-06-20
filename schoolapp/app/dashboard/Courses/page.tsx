'use client';
import React, { useState, useEffect } from 'react';
import Input from '../../ui/Input';
import Button from '@/app/ui/button';
import CourseCard from '@/app/ui/courses/courseCard';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);

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

  const isAdmin = session?.user?.role === 'admin';

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchCourses = async () => {
      try {
        const res = await fetch(
          isAdmin
            ? '/api/courses' 
            : `/api/courses?teacherId=${session.user.id}` 
        );
        if (!res.ok) throw new Error('Failed to fetch courses');
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, [session]); 

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.course_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/Courses/${id}`);
  };

  const handleEdit = (id: string) => {
    if (!isAdmin) return;
    router.push(`/dashboard/Courses/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    if (window.confirm(`Are you sure you want to delete this course?`)) {
      try {
        const res = await fetch(`/api/courses/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setCourses(prev => prev.filter(course => course.id !== id));
          alert('Course deleted successfully.');
          router.push('/dashboard/courses');
        } else {
          const errorData = await res.json();
          alert(`Failed to delete course: ${errorData.error}`);
        }
      } catch (error) {
        console.error(error);
        alert('Failed to delete course. Please try again later.');
      }
    }
  };

  const handleAddNewCourse = () => {
    if (!isAdmin) return;
    router.push('/dashboard/courses/create');
  };

  if (!session) return <p className="text-center mt-10">Loading session...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Courses Management</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Input
          id="search"
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        {isAdmin && (
          <Button onClick={handleAddNewCourse}>Create Course</Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onViewDetails={() => handleViewDetails(course.id)}
            onEdit={isAdmin ? () => handleEdit(course.id) : undefined}
            onDelete={isAdmin ? () => handleDelete(course.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
