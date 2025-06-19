'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/app/ui/button';
import { useSession } from 'next-auth/react';

interface Course {
  id: string;
  title: string;
  course_code: string;
  description: string;
  credits: number;
  duration: string;
  difficulty_level: string;
  teacher_email: string;
}

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const { data: session, status } = useSession();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (!res.ok) {
          throw new Error('Course not found.');
        }
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError('Error loading course details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">Course Details</h1>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        <h1 className="text-3xl font-bold mb-4">Course Details</h1>
        <p>{error}</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">Course Details</h1>
        <p>Course not found.</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  
  const isAdmin = session?.user?.role === 'admin';

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-700 mb-2"><strong>Course Code:</strong> {course.course_code}</p>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {course.description}</p>
      <p className="text-gray-700 mb-2"><strong>Credits:</strong> {course.credits}</p>
      <p className="text-gray-700 mb-2"><strong>Duration:</strong> {course.duration}</p>
      <p className="text-gray-700 mb-2"><strong>Difficulty Level:</strong> {course.difficulty_level}</p>
      <p className="text-gray-700 mb-2"><strong>Teacher Email:</strong> {course.teacher_email}</p>

      <div className="flex justify-between md:justify-end gap-4 mt-6">
        <Button variant='secondary' onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>

        {isAdmin && (
          <>
            <Button
              variant="primary"
              onClick={() => router.push(`/dashboard/Courses/${course.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={async () => {
                if (confirm(`Are you sure you want to delete ${course.title}?`)) {
                  const res = await fetch(`/api/courses/${course.id}`, { method: 'DELETE' });

                  if (res.ok) {
                    alert('Course deleted successfully.');
                    router.push('/dashboard/Courses');
                  } else {
                    const errorData = await res.json();
                    alert(`Error: ${errorData.error}`);
                  }
                }
              }}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
