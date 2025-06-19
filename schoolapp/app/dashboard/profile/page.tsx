'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { Student } from '@/app/lib/definitions';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user || session.user.role !== 'student') {
      setLoading(false);
      return;
    }

    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/students?studentId=${session.user.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await res.json();
        setStudent(data);
      } catch {
        setError('Error loading profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [session]);

  if (status === 'loading' || loading) {
    return <p>Loading profile...</p>;
  }

  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (session.user.role !== 'student') {
    return <p>This page is only available for students.</p>;
  }

  if (!student) {
    return <p>No profile data found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <div className="bg-white shadow-md rounded p-6">
        <p><strong>Name:</strong> {student.firstname} {student.lastname}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Grade:</strong> {student.grade}</p>
        <p><strong>Date of Birth:</strong> {student.dateofbirth ?? 'N/A'}</p>
        <p><strong>Address:</strong> {student.address ?? 'N/A'}</p>
        <p><strong>Phone Number:</strong> {student.phonenumber ?? 'N/A'}</p>
        <p><strong>Enrollment Date:</strong> {student.enrollmentdate ?? 'N/A'}</p>
        <p><strong>Parents Contact:</strong> {student.parentscontact ?? 'N/A'}</p>
        <p><strong>Notes:</strong> {student.notes ?? 'N/A'}</p>
      </div>
    </div>
  );
}
