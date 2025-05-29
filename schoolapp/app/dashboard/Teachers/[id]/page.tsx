'use client'; 

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; 
import Button from '@/app/ui/button'; 
import Image from 'next/image'; 

interface Teacher {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  phonenumber?: string | null;
  address?: string | null;
  hiredate?: string | null;
  qualification?: string | null;
  bio?: string | null;
  avatarurl?: string | null;
}

export default function TeacherDetailPage() {
  const router = useRouter();
  const params = useParams();
  const teacherId = params.id as string;

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/teachers/${teacherId}`);
        if (!res.ok) {
          throw new Error('Teacher not found.');
        }
        const data = await res.json();
        setTeacher(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error loading teacher details. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchTeacherDetails();
    }
  }, [teacherId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">Teacher Details</h1>
        <p>Loading teacher details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p>{error}</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">Teacher Details</h1>
        <p>No teacher data available.</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Teacher Details</h1>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {}
          <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500 shadow-md">
            {teacher.avatarurl ? (
              <Image
                src={teacher.avatarurl}
                alt={`Avatar of ${teacher.firstname} ${teacher.lastname}`}
                width={128}
                height={128}
                objectFit="cover"
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-green-100 flex items-center justify-center text-cyan-600 text-6xl font-bold">
                {teacher.firstname.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {}
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">{teacher.firstname} {teacher.lastname}</h2>
            <p className="text-xl font-bold text-cyan-900 mb-4">{teacher.subject}</p>
            <p className="text-gray-700 mb-1"><strong>Email:</strong> {teacher.email}</p>
            <p className="text-gray-700 mb-1"><strong>Phone:</strong> {teacher.phonenumber}</p>
            {teacher.address && <p className="text-gray-700 mb-1"><strong>Address:</strong> {teacher.address}</p>}
            {teacher.hiredate && <p className="text-gray-700 mb-1"><strong>Hire Date:</strong> {teacher.hiredate}</p>}
            {teacher.qualification && <p className="text-gray-700 mb-1"><strong>Qualification:</strong> {teacher.qualification}</p>}
          </div>
        </div>

        {}
        {teacher.bio && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Biography / Notes</h3>
            <p className="text-gray-700 leading-relaxed">{teacher.bio}</p>
          </div>
        )}
      </div>

      {}
      <div className="flex justify-between md:justify-end gap-4 mt-6">
        <Button variant="secondary" onClick={() => router.back()}>
          Go Back
        </Button>
        <Button variant="primary" onClick={() => router.push(`/dashboard/Teachers/${teacher.id}/edit`)}>
          Edit 
        </Button>
        <Button variant="danger" onClick={() => alert('Delete logic for teacher: ' + teacher.id)}>
          Delete 
        </Button>
      </div>
    </div>
  );
}