'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button from '@/app/ui/button';
import Image from 'next/image';

interface Student {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  grade: string;
  dateofbirth?: string | null;
  address?: string | null;
  phonenumber?: string | null;
  avatarurl?: string | null;
  enrollmentdate?: string | null;
  parentscontact?: string | null;
  notes?: string | null;
}

export default function StudentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession(); // Eliminado el `status`
  const studentIdFromParams = params.id as string | undefined;

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = '';

        if (!session) {
          setError('You must be logged in to view this page.');
          setLoading(false);
          return;
        }

        if (session.user.role === 'student') {
          url = `/api/students?studentEmail=${encodeURIComponent(session.user.email!)}`;
        } else {
          if (!studentIdFromParams) {
            setError('Student ID is required.');
            setLoading(false);
            return;
          }
          url = `/api/students/${studentIdFromParams}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('Student not found.');
        }

        const data = await res.json();
        setStudent(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error('Error fetching student details:', err);
        setError('Error loading student details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [session, studentIdFromParams]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">Student Details</h1>
        <p>Loading student details...</p>
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

  if (!student) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">Student Details</h1>
        <p>No student data available.</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  const canEdit =
    session?.user.role === 'admin' ||
    session?.user.role === 'teacher' ||
    (session?.user.role === 'student' && session.user.email === student.email);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Student Details</h1>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500 shadow-md">
            {student.avatarurl ? (
              <Image
                src={student.avatarurl}
                alt={`Avatar of ${student.firstname} ${student.lastname}`}
                width={128}
                height={128}
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-cyan-100 flex items-center justify-center text-cyan-600 text-6xl font-bold">
                {student.firstname ? student.firstname.charAt(0).toUpperCase() : ''}
              </div>
            )}
          </div>

          <div className="flex-grow text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">{student.firstname} {student.lastname}</h2>
            <p className="text-xl text-cyan-600 mb-4">{student.grade}</p>
            <p className="text-gray-700 mb-1"><strong>Email:</strong> {student.email}</p>
            <p className="text-gray-700 mb-1"><strong>Phone:</strong> {student.phonenumber || 'N/A'}</p>
            <p className="text-gray-700 mb-1">
              <strong>Date of Birth:</strong>{' '}
              {student.dateofbirth ? new Date(student.dateofbirth).toISOString().split('T')[0] : 'N/A'}
            </p>
            <p className="text-gray-700 mb-1"><strong>Address:</strong> {student.address || 'N/A'}</p>
            {student.enrollmentdate && (
              <p className="text-gray-700 mb-1">
                <strong>Enrollment Date:</strong>{' '}
                {new Date(student.enrollmentdate).toISOString().split('T')[0]}
              </p>
            )}
            {student.parentscontact && <p className="text-gray-700 mb-1"><strong>Parents Contact:</strong> {student.parentscontact}</p>}
            {student.notes && <p className="text-gray-700 mb-1"><strong>Notes:</strong> {student.notes}</p>}
          </div>
        </div>

        {student.notes && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Notes</h3>
            <p className="text-gray-700 leading-relaxed">{student.notes}</p>
          </div>
        )}
      </div>

      {canEdit ? (
        <div className="flex justify-between md:justify-end gap-4 mt-6">
          <Button variant="secondary" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button variant="primary" onClick={() => router.push(`/dashboard/Students/${student.id}/edit`)}>
            Edit
          </Button>
          <Button
            variant="danger"
            className="bg-red-600 hover:bg-red-700"
            onClick={async () => {
              if (confirm(`Are you sure you want to delete ${student.firstname}?`)) {
                const res = await fetch(`/api/students/${student.id}`, { method: 'DELETE' });

                if (res.ok) {
                  alert('Student deleted successfully.');
                  router.push('/dashboard/Students');
                } else {
                  const errorData = await res.json();
                  alert(`Error: ${errorData.error}`);
                }
              }
            }}
          >
            Delete
          </Button>
        </div>
      ) : (
        <div className="flex justify-start mt-6">
          <Button variant="secondary" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
}
