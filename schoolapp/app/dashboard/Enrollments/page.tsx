'use client';
import React, { useState, useEffect } from 'react';
import Input from '../../ui/Input';
import Button from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Enrollment {
  enrollment_id: string;
  enrollment_date: string;
  completion_status: string;
  notes: string | null;
  student_id: string;
  student_first_name: string;
  student_last_name: string;
  student_email: string;
  course_id: string;
  course_title: string;
  course_code: string;
  course_description: string;
  course_credits: number;
  course_duration: string;
  course_difficulty_level: string;
  teacher_first_name: string;
  teacher_last_name: string;
  teacher_email: string;
  teacher_subject: string;
}

export default function EnrollmentsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchEnrollments = async () => {
      try {
        let url = '/api/Enrollments';

        if (session?.user?.role === 'student') {
          url += `?studentId=${session.user.id}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch Enrollments');
        const data = await res.json();
        setEnrollments(data);
      } catch (error) {
        console.error(error);
        setEnrollments([]);
      }
    };

    fetchEnrollments();
  }, [session, status]);

  const filteredEnrollments = enrollments.filter(enrollment =>
    enrollment.student_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.teacher_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.course_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.completion_status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewEnrollment = () => {
    router.push('/dashboard/Enrollments/Create');
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Enrollments Management</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Input
          id="search"
          type="text"
          placeholder="Search enrollments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        {session?.user?.role === 'admin' && (
          <Button onClick={handleAddNewEnrollment}>New Enrollment</Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
          <thead>
            <tr className="bg-cyan-50 border-b border-cyan-300">
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Teacher</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Enrollment Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEnrollments.map((enrollment, idx) => (
              <tr key={`${enrollment.enrollment_id ?? 'noid'}-${idx}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {enrollment.student_first_name} {enrollment.student_last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {enrollment.course_title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {enrollment.teacher_first_name} {enrollment.teacher_last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(enrollment.enrollment_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`font-semibold ${
                    enrollment.completion_status === 'Completed' ? 'text-green-600' :
                    enrollment.completion_status === 'In Progress' ? 'text-cyan-600' :
                    'text-cyan-600'
                  }`}>
                    {enrollment.completion_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
